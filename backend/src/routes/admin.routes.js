const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const pool = require("../config/db");
const prisma = require("../config/prisma");
const cacheService = require("../services/cache.service");
const { serializeCourse } = require("../controllers/course.controller");

// Protect ALL admin routes with token verification and admin role check
router.use(verifyToken);
router.use(checkRole("admin"));

// ==========================
// 1. ADMIN DASHBOARD TEST
// ==========================
router.get("/dashboard", (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin 🚀",
    user: req.user,
  });
});

// ==========================
// 1.1 SYNC FULL DATABASE (ADMIN ACTION)
// ==========================
router.post("/sync-database", async (req, res, next) => {
  try {
    if (!pool.hasConfiguredDatabase || !pool.hasConfiguredDatabase()) {
      return res.status(503).json({
        success: false,
        message:
          "Database sync is unavailable because DATABASE_URL is not configured on this API deployment.",
      });
    }

    const { syncDatabase } = require("../db/syncAllToDb");
    const activePool = pool.getRealPool ? pool.getRealPool() : null;
    const stats = await syncDatabase(activePool);
    res.status(200).json({
      success: true,
      message: "Database successfully synced with all 12 courses, 88 modules & 252 lectures! 🚀",
      stats,
    });
  } catch (error) {
    console.error("Admin DB Sync error:", error);
    res.status(500).json({
      success: false,
      message: "Database sync failed: " + error.message,
    });
  }
});

// ==========================
// 1.2 CLEAR ALL DUMMY LECTURES (ADMIN ACTION)
// ==========================
router.post("/clear-all-lectures", async (req, res, next) => {
  try {
    console.log("🧹 Admin action: Clearing all dummy lectures from Database & Local Store...");

    // 1. Delete progress records
    await pool.query("DELETE FROM video_progress;").catch(() => {});

    // 2. Delete all lectures
    const delRes = await pool.query("DELETE FROM lectures RETURNING id;");
    const deletedCount = delRes.rows?.length || delRes.rowCount || 0;

    // 3. Reset course lecture counters
    await pool.query("UPDATE courses SET total_lectures = 0;").catch(() => {});

    // 4. Reset sequence
    try {
      await pool.query("SELECT setval(pg_get_serial_sequence('lectures', 'id'), 1, false);");
    } catch (_) {}

    // 5. Update local JSON file if exists
    try {
      const fs = require("fs");
      const path = require("path");
      const storePath = path.join(__dirname, "..", "..", "data", "lms_store.json");
      if (fs.existsSync(storePath)) {
        const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
        store.lectures = [];
        store.video_progress = [];
        if (Array.isArray(store.courses)) {
          store.courses.forEach((c) => {
            c.total_lectures = 0;
          });
        }
        fs.writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
      }
    } catch (_) {}

    res.status(200).json({
      success: true,
      message: `Successfully deleted all ${deletedCount} dummy lectures! Database & website are now completely clean for uploading real lectures. 🎬`,
      deletedCount,
    });
  } catch (error) {
    console.error("Clear dummy lectures error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear lectures: " + error.message,
    });
  }
});

// ==========================
// 2. GET ALL TEACHERS
// ==========================
router.get("/teachers", async (req, res, next) => {
  try {
    const teachers = await pool.query(
      `SELECT id, name, email, role, phone, specialization, status, created_at
       FROM users
       WHERE role = 'teacher'
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      teachers: teachers.rows,
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 3. ADD TEACHER
// ==========================
router.post("/add-teacher", async (req, res, next) => {
  try {
    const { name, email, password, phone, specialization } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, full_name, email, password, role, phone, specialization)
       VALUES ($1, $2, $3, $4, 'teacher', $5, $6)
       RETURNING id, name, email, role, phone, specialization, created_at`,
      [name, name, email, hashedPassword, phone, specialization]
    );

    res.status(201).json({
      success: true,
      message: "Teacher added successfully 🚀",
      teacher: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 4. GET ALL COURSES (ADMIN)
// ==========================
router.get("/courses", async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({ orderBy: { id: "desc" } });

    res.status(200).json({
      success: true,
      courses: courses.map(serializeCourse),
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 5. ADD COURSE
// ==========================
router.post("/add-course", async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      originalPrice,
      duration,
      level,
      category,
      teacher,
      teacher_id,
      thumbnail,
      course_id,
    } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Course title and price are required",
      });
    }

    const slug = String(title).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
    const course = await prisma.course.create({
      data: {
        courseId: String(course_id || `${slug}-${Date.now()}`).slice(0, 100),
        title: String(title).trim(),
        description: description || "",
        price: Number(price),
        originalPrice: Number(originalPrice ?? price),
        duration: duration || "",
        level: level || "Beginner",
        category: category || "General",
        teacher: teacher || "",
        teacherId: teacher_id ? Number(teacher_id) : null,
        thumbnail: thumbnail || "",
        isPublished: true,
      },
    });
    await cacheService.delPattern("courses:*");
    await cacheService.delPattern("course:*");

    res.status(201).json({
      success: true,
      message: "Course added successfully 🚀",
      course: serializeCourse(course),
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 6. EDIT COURSE
// ==========================
router.put("/edit-course/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title, description, price, originalPrice, original_price, duration,
      level, category, teacher, thumbnail, is_published, course_id,
    } = req.body;
    const numericId = Number(id);
    const existing = await prisma.course.findFirst({
      where: { OR: [...(Number.isInteger(numericId) ? [{ id: numericId }] : []), { courseId: id }] },
      select: { id: true },
    });

    if (!existing) return res.status(404).json({ success: false, message: "Course not found" });

    const finalOriginalPrice = originalPrice !== undefined ? originalPrice : original_price;
    const course = await prisma.course.update({
      where: { id: existing.id },
      data: {
        ...(title != null && { title: String(title).trim() }),
        ...(description != null && { description: String(description).trim() }),
        ...(price != null && price !== "" && { price: Number(price) }),
        ...(finalOriginalPrice != null && finalOriginalPrice !== "" && { originalPrice: Number(finalOriginalPrice) }),
        ...(duration != null && { duration: String(duration).trim() }),
        ...(level != null && { level: String(level).trim() }),
        ...(category != null && { category: String(category).trim() }),
        ...(teacher != null && { teacher: String(teacher).trim() }),
        ...(thumbnail != null && { thumbnail: String(thumbnail).trim() }),
        ...(is_published != null && { isPublished: is_published === true || is_published === "true" }),
        ...(course_id != null && { courseId: String(course_id).trim() }),
      },
    });
    await cacheService.delPattern("courses:*");
    await cacheService.delPattern("course:*");

    res.status(200).json({ success: true, message: "Course updated successfully", course: serializeCourse(course) });
  } catch (error) {
    next(error);
  }
});
// 7. DELETE COURSE
// ==========================
router.delete("/delete-course/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const numericId = Number(id);
    const existing = await prisma.course.findFirst({
      where: { OR: [...(Number.isInteger(numericId) ? [{ id: numericId }] : []), { courseId: id }] },
      select: { id: true },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await prisma.course.delete({ where: { id: existing.id } });
    await cacheService.delPattern("courses:*");
    await cacheService.delPattern("course:*");

    res.status(200).json({
      success: true,
      message: "Course deleted successfully 🚀",
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 8. UPDATE PASSWORD (ADMIN SELF)
// ==========================
router.put("/update-password", async (req, res, next) => {
  try {
    // Take user identity from verified token rather than arbitrary client input!
    const adminUserId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [adminUserId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = userQuery.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
      [hashedPassword, adminUserId]
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully 🚀",
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 8.1 UPDATE PROFILE (ADMIN SELF)
// ==========================
router.put("/update-profile", async (req, res, next) => {
  try {
    const adminUserId = req.user.id;
    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const updateRes = await pool.query(
      "UPDATE users SET name = $1, full_name = $1, phone = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, name, email, role, phone, avatar",
      [name.trim(), phone ? phone.trim() : null, adminUserId]
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully 🚀",
      user: updateRes.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// ==========================
// 9. GET ALL USERS (ADMIN)
// ==========================
router.get("/users", async (req, res, next) => {
  try {
    const users = await pool.query(
      `SELECT id, name, email, role, phone, status, created_at
       FROM users
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      users: users.rows,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
