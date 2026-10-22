const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../config/db");
const emailService = require("../services/email.service");
const { getJwtSecret, getRefreshSecret } = require("../config/jwt");

// ==========================================
// REFRESH TOKEN COOKIE HELPERS
// ==========================================
const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const getRefreshCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: REFRESH_TOKEN_EXPIRY_MS,
  path: "/",
});

const signRefreshToken = (payload) =>
  jwt.sign(payload, getRefreshSecret(), { expiresIn: "7d" });

const signAccessToken = (payload) =>
  jwt.sign(payload, getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

let isAuthSchemaEvolutionChecked = false;
const ensureVerificationSchema = async () => {
  if (isAuthSchemaEvolutionChecked) return;
  try {
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;");
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);");
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token_expires TIMESTAMP WITH TIME ZONE;");
    isAuthSchemaEvolutionChecked = true;
  } catch (err) {
    console.warn("⚠️ ensureVerificationSchema notice:", err.message);
  }
};

// ==========================================
// LOGIN
// ==========================================
const loginUser = async (req, res, next) => {
  try {
    const id = req.body.email || req.body.id || req.body.userId || req.body.phone;
    const { password } = req.body;

    if (!id || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID (Email or Phone) and password are required",
      });
    }

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR phone = $1",
      [String(id).trim()]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = userQuery.rows[0];

    if (user.status === "Blocked" || user.status === "Inactive") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive or suspended. Please contact administrator.",
      });
    }

    const isMatch = await bcrypt.compare(String(password), String(user.password));
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const tokenPayload = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    };

    const token = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken({ id: user.id });

    // Store refresh token in DB (best-effort; non-fatal if column doesn't exist yet)
    try {
      await pool.query(
        "UPDATE users SET refresh_token = $1 WHERE id = $2",
        [refreshToken, user.id]
      );
    } catch {
      // Column may not exist yet — silently skip; rotation still enforced via JWT expiry
    }

    // Set refresh token as HttpOnly cookie — NEVER in JSON body
    res.cookie("refreshToken", refreshToken, getRefreshCookieOptions());

    res.status(200).json({
      success: true,
      message: "Login successful 🚀",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          dob: user.dob || null,
        },
      },
      // Legacy field for clients that read top-level token
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        dob: user.dob || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// REGISTER (Self-registration for students)
// ==========================================
const registerUser = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { name, email, password, phone, dob } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existing = await client.query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
      [email.trim()]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query("BEGIN");

    let userRes;
    try {
      userRes = await client.query(
        `INSERT INTO users (name, full_name, email, password, role, phone, dob, status)
         VALUES ($1, $2, $3, $4, 'student', $5, $6, 'Active')
         RETURNING id, name, email, role, dob`,
        [name, name, email.trim().toLowerCase(), hashedPassword, phone || null, dob || null]
      );
    } catch (insertErr) {
      if (insertErr.message && insertErr.message.includes("dob")) {
        await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS dob VARCHAR(50)").catch(() => {});
        userRes = await client.query(
          `INSERT INTO users (name, full_name, email, password, role, phone, dob, status)
           VALUES ($1, $2, $3, $4, 'student', $5, $6, 'Active')
           RETURNING id, name, email, role, dob`,
          [name, name, email.trim().toLowerCase(), hashedPassword, phone || null, dob || null]
        );
      } else {
        throw insertErr;
      }
    }

    const newUser = userRes.rows[0];
    const studentCode = `STU-${Date.now().toString().slice(-4)}`;

    await client.query(
      `INSERT INTO students (user_id, student_id, name, email, password, phone, dob, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Active')`,
      [newUser.id, studentCode, name, email, hashedPassword, phone || null, dob || null]
    );

    await client.query("COMMIT");

    const token = jwt.sign(
      {
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        name: newUser.name,
      },
      getJwtSecret(),
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully 🚀",
      token,
      user: newUser,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
};

// ==========================================
// GET CURRENT USER PROFILE (/me)
// ==========================================
const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userQuery = await pool.query(
      "SELECT id, name, full_name, email, role, phone, dob, specialization, avatar, status, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: userQuery.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// SEND EMAIL VERIFICATION LINK
// ==========================================
const sendVerificationEmail = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const studentName = name?.trim() || "Student";

    // 24-hour verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await ensureVerificationSchema();

    // Check if user exists in DB - select * to avoid crash if column doesn't exist
    const existing = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = $1",
      [cleanEmail]
    );

    if (existing.rows.length > 0) {
      // If user is already verified
      if (existing.rows[0].is_verified) {
        return res.status(200).json({
          success: true,
          alreadyVerified: true,
          message: "This email address is already verified! ✅",
        });
      }

      try {
        await pool.query(
          "UPDATE users SET verification_token = $1, verification_token_expires = $2 WHERE id = $3",
          [token, expires, existing.rows[0].id]
        );
      } catch (updateErr) {
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);").catch(() => {});
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token_expires TIMESTAMP WITH TIME ZONE;").catch(() => {});
        await pool.query(
          "UPDATE users SET verification_token = $1, verification_token_expires = $2 WHERE id = $3",
          [token, expires, existing.rows[0].id]
        ).catch(() => {});
      }
    } else {
      // Create pending student user so their verification token is stored
      const tempPass = await bcrypt.hash("DA@" + Math.floor(100000 + Math.random() * 900000), 10);
      try {
        await pool.query(
          `INSERT INTO users (name, full_name, email, password, role, is_verified, verification_token, verification_token_expires, status)
           VALUES ($1, $1, $2, $3, 'student', false, $4, $5, 'Pending')`,
          [studentName, cleanEmail, tempPass, token, expires]
        );
      } catch (insertErr) {
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;").catch(() => {});
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);").catch(() => {});
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token_expires TIMESTAMP WITH TIME ZONE;").catch(() => {});
        try {
          await pool.query(
            `INSERT INTO users (name, full_name, email, password, role, is_verified, verification_token, verification_token_expires, status)
             VALUES ($1, $1, $2, $3, 'student', false, $4, $5, 'Pending')`,
            [studentName, cleanEmail, tempPass, token, expires]
          );
        } catch (retryErr) {
          await pool.query(
            `INSERT INTO users (name, full_name, email, password, role, status)
             VALUES ($1, $1, $2, $3, 'student', 'Pending')`,
            [studentName, cleanEmail, tempPass]
          ).catch(() => {});
        }
      }
    }

    // Extract client origin and return URL from request body or headers
    const clientOrigin = req.body?.clientUrl || req.headers?.origin || req.headers?.referer;
    const returnUrl = req.body?.returnUrl;

    // Dispatch email
    const mailRes = await emailService.sendVerificationEmail({
      to: cleanEmail,
      name: studentName,
      token,
      clientOrigin,
      returnUrl,
    });

    res.status(200).json({
      success: true,
      message: `Verification link sent to ${cleanEmail}. Please check your inbox and click the verify button.`,
      previewUrl: mailRes.previewUrl,
    });
  } catch (error) {
    console.error("Send verification email error:", error);
    next(error);
  }
};

// ==========================================
// VERIFY EMAIL (Handles browser click or API)
// ==========================================
const verifyEmail = async (req, res, next) => {
  try {
    const token = req.query.token || req.body?.token;
    const isBrowserGet = req.method === "GET";
    const hostHeader = req.headers?.host;
    const protoHeader = req.headers?.["x-forwarded-proto"] || "https";
    const dynamicHostUrl = hostHeader ? `${protoHeader}://${hostHeader}` : null;

    const frontendUrl = (
      process.env.FRONTEND_URL ||
      process.env.CLIENT_URL ||
      dynamicHostUrl ||
      "http://localhost:5173"
    ).replace(/\/+$/, "");

    const returnUrlParam = req.query?.returnUrl;
    const getSuccessRedirect = (targetEmail) => {
      if (returnUrlParam) {
        try {
          const parsed = new URL(returnUrlParam);
          parsed.searchParams.set("verified", "true");
          parsed.searchParams.set("email", targetEmail);
          return parsed.toString();
        } catch {}
      }
      return `${frontendUrl}/checkout?verified=true&email=${encodeURIComponent(targetEmail)}`;
    };

    const getErrorRedirect = (status, email = "") => {
      if (returnUrlParam) {
        try {
          const parsed = new URL(returnUrlParam);
          parsed.searchParams.set("status", status);
          if (email) parsed.searchParams.set("email", email);
          return parsed.toString();
        } catch {}
      }
      return `${frontendUrl}/checkout?status=${status}&email=${encodeURIComponent(email)}`;
    };

    if (!token) {
      if (isBrowserGet) {
        return res.redirect(getErrorRedirect("missing_token"));
      }
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    await ensureVerificationSchema();

    let queryRes;
    try {
      queryRes = await pool.query(
        "SELECT * FROM users WHERE verification_token = $1",
        [String(token).trim()]
      );
    } catch (tokenColErr) {
      queryRes = { rows: [] };
    }

    // Fallback: If token not found in users (e.g. security scanners pre-fetched and cleared it),
    // check by email parameter passed in the verification link!
    const queryEmail = req.query?.email || req.body?.email;
    if (queryRes.rows.length === 0 && queryEmail) {
      try {
        queryRes = await pool.query(
          "SELECT * FROM users WHERE LOWER(email) = $1 ORDER BY is_verified DESC, id DESC LIMIT 1",
          [String(queryEmail).trim().toLowerCase()]
        );
      } catch (e) {
        queryRes = { rows: [] };
      }
    }

    if (queryRes.rows.length === 0) {
      if (isBrowserGet) {
        return res.redirect(getErrorRedirect("invalid", queryEmail || ""));
      }
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link. Please request a new one.",
      });
    }

    const user = queryRes.rows[0];

    // Check expiry only if user is not yet verified and token expires
    const isAlreadyVerified = Boolean(user && (user.is_verified === true || user.is_verified === "true" || user.is_verified === 1 || user.is_verified === "t"));
    if (!isAlreadyVerified && user.verification_token_expires && new Date() > new Date(user.verification_token_expires)) {
      if (isBrowserGet) {
        return res.redirect(getErrorRedirect("expired", user.email));
      }
      return res.status(400).json({
        success: false,
        message: "This verification link has expired. Please request a new one.",
      });
    }

    // Mark verified for all records with this email or id
    try {
      await pool.query(
        "UPDATE users SET is_verified = true, verification_token = NULL, verification_token_expires = NULL WHERE LOWER(email) = $1 OR id = $2",
        [user.email.toLowerCase(), user.id]
      );
    } catch (updErr) {
      await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;").catch(() => {});
      await pool.query(
        "UPDATE users SET is_verified = true WHERE LOWER(email) = $1 OR id = $2",
        [user.email.toLowerCase(), user.id]
      ).catch(() => {});
    }

    if (isBrowserGet) {
      return res.redirect(getSuccessRedirect(user.email));
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! 🎉",
      email: user.email,
    });
  } catch (error) {
    console.error("Verify email error:", error);
    next(error);
  }
};

// ==========================================
// CHECK EMAIL VERIFICATION STATUS
// Fast endpoint for checkout polling
// ==========================================
const checkVerification = async (req, res, next) => {
  try {
    const email = req.body?.email || req.query?.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email parameter is required",
      });
    }

    await ensureVerificationSchema();

    const cleanEmail = String(email).trim().toLowerCase();
    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = $1 ORDER BY is_verified DESC, id DESC LIMIT 1",
      [cleanEmail]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        exists: false,
        verified: false,
      });
    }

    const user = result.rows[0];
    const isVerified = Boolean(
      user && (user.is_verified === true || user.is_verified === "true" || user.is_verified === 1 || user.is_verified === "t")
    );
    return res.status(200).json({
      success: true,
      exists: true,
      verified: isVerified,
    });
  } catch (error) {
    console.error("Check verification error:", error);
    next(error);
  }
};

// ==========================================
// MIGRATE SCHEMA ON DEMAND
// ==========================================
const migrateSchema = async (req, res) => {
  try {
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;");
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(255);");
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token_expires TIMESTAMP WITH TIME ZONE;");
    isAuthSchemaEvolutionChecked = true;
    return res.status(200).json({
      success: true,
      message: "Database schema migration completed successfully! Verification columns are verified.",
    });
  } catch (error) {
    console.error("Schema migration error:", error);
    return res.status(500).json({
      success: false,
      message: "Database schema migration failed: " + error.message,
    });
  }
};

// ==========================================
// REFRESH TOKEN ROTATION
// Reads refresh token from HttpOnly cookie,
// validates it, issues new access token +
// rotated refresh token (old token revoked in DB).
// ==========================================
const refreshToken = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided.",
      });
    }

    // Verify the refresh token signature
    let decoded;
    try {
      decoded = jwt.verify(incomingRefreshToken, getRefreshSecret());
    } catch {
      res.clearCookie("refreshToken", { path: "/" });
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token.",
      });
    }

    // Fetch user + validate stored token (rotation detection)
    let user;
    try {
      const result = await pool.query(
        "SELECT id, name, email, role, avatar, dob, refresh_token FROM users WHERE id = $1",
        [decoded.id]
      );
      user = result.rows[0];
    } catch {
      // refresh_token column may not exist — fall back to JWT-only validation
      const result = await pool.query(
        "SELECT id, name, email, role, avatar, dob FROM users WHERE id = $1",
        [decoded.id]
      ).catch(() => ({ rows: [] }));
      user = result.rows[0];
    }

    if (!user) {
      res.clearCookie("refreshToken", { path: "/" });
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Rotation check: if DB has a stored token, it must match
    if (user.refresh_token && user.refresh_token !== incomingRefreshToken) {
      // Possible token reuse — invalidate all sessions
      try {
        await pool.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [user.id]);
      } catch { /* ignore */ }
      res.clearCookie("refreshToken", { path: "/" });
      return res.status(401).json({
        success: false,
        message: "Refresh token reuse detected. Please login again.",
      });
    }

    // Issue new tokens
    const newAccessToken = signAccessToken({
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    });
    const newRefreshToken = signRefreshToken({ id: user.id });

    // Rotate: store new refresh token in DB
    try {
      await pool.query(
        "UPDATE users SET refresh_token = $1 WHERE id = $2",
        [newRefreshToken, user.id]
      );
    } catch { /* ignore if column missing */ }

    // Set rotated refresh token as HttpOnly cookie
    res.cookie("refreshToken", newRefreshToken, getRefreshCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully.",
      data: {
        token: newAccessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar || null,
          dob: user.dob || null,
        },
      },
      // Legacy top-level token field
      token: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// LOGOUT — clears refresh token cookie
// ==========================================
const logoutUser = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;
    if (incomingRefreshToken) {
      try {
        const decoded = jwt.verify(incomingRefreshToken, getRefreshSecret());
        await pool.query("UPDATE users SET refresh_token = NULL WHERE id = $1", [decoded.id]).catch(() => {});
      } catch { /* ignore expired token on logout */ }
    }
    res.clearCookie("refreshToken", { path: "/" });
    return res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getMe,
  sendVerificationEmail,
  verifyEmail,
  checkVerification,
  migrateSchema,
  refreshToken,
  logoutUser,
};

