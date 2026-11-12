const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// Auto-discover environment variables from any standard location
const envPaths = [
  path.join(__dirname, ".env"),
  path.join(__dirname, "..", ".env"),
  path.join(__dirname, "..", "..", ".env"),
];
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
  }
}

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// Database initialization
require("./config/db");
require("./services/blog-scheduler.service");

// Middlewares
const rateLimit = require("./middleware/rateLimit.middleware");
const errorHandler = require("./middleware/error.middleware");

// Routes
const activityRoutes = require("./routes/activity.routes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const adminRoutes = require("./routes/admin.routes");
const aiRoutes = require("./routes/ai.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
const blogSeoRoutes = require("./routes/blog-seo.routes");
const certificateRoutes = require("./routes/certificate.routes");
const courseRoutes = require("./routes/course.routes");
const homepageRoutes = require("./routes/homepage.routes");
const doubtRoutes = require("./routes/doubt.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const lectureRoutes = require("./routes/lecture.routes");
const paymentRoutes = require("./routes/payment.routes");
const progressRoutes = require("./routes/progress.routes");
const quizRoutes = require("./routes/quiz.routes");
const sectionRoutes = require("./routes/section.routes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Validate every app.use() argument at startup and normalize CommonJS/ESM
// default exports so deployment failures identify the exact handler.
const useHandler = (name, ...args) => {
  const handlerStart = typeof args[0] === "string" ? 1 : 0;
  for (let index = handlerStart; index < args.length; index += 1) {
    const candidate = args[index];
    const handler = typeof candidate === "function" ? candidate : candidate?.default;
    if (typeof handler !== "function") {
      const received = candidate === null ? "null" : typeof candidate;
      console.error(`[startup] Invalid Express handler "${name}" at position ${index - handlerStart + 1}: expected function, received ${received}.`);
      throw new TypeError(`Invalid Express handler "${name}".`);
    }
    args[index] = handler;
  }
  return app.use(...args);
};

// Production Security Headers
useHandler("helmet middleware",
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        frameSrc: ["'self'", "https://www.youtube-nocookie.com", "https://player.vimeo.com"],
        mediaSrc: ["'self'", "https:"],
      },
    },
  })
);

// CORS configuration
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5174",
  "https://tsg-ecru.vercel.app",
  "https://tsg-lms-lac.vercel.app",
  "https://tsg-qlb1.onrender.com",
  "https://www.nidads.com",
  "https://nidads.com",
  "https://www.nigape.com",
  "https://nigape.com",
  "https://dizitaladda.com",
  "https://www.dizitaladda.com",
];

const envAllowed = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim())
  : [];

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envAllowed]));

useHandler("CORS middleware",
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (mobile apps, server-to-server)
      if (!origin) return callback(null, true);
      // Allow explicitly whitelisted origins
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Allow all Vercel deployment previews (*.vercel.app) for this project
      if (origin.endsWith(".vercel.app")) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parsers
useHandler("JSON body parser", express.json({ limit: process.env.JSON_BODY_LIMIT || "5mb" }));
useHandler("URL-encoded body parser", express.urlencoded({ extended: true, limit: "5mb" }));
useHandler("cookie parser", cookieParser());

// Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  message: "Too many requests from this IP, please try again after a minute.",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "Too many login/register attempts. Please try again after 15 minutes.",
});

useHandler("global API rate limiter", "/api", globalLimiter);
useHandler("authentication rate limiter", "/api/auth/login", authLimiter);

// Frontend SPA dist path
const frontendDist = path.join(__dirname, "..", "..", "frontend", "dist");

// Root & Health check
app.get("/", (req, res) => {
  if (fs.existsSync(path.join(frontendDist, "index.html"))) {
    return res.sendFile(path.join(frontendDist, "index.html"));
  }
  res.json({
    success: true,
    message: "Dizital Adda LMS Production API is operational 🚀",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    database: {
      configured: require("./config/db").hasConfiguredDatabase(),
      connected: require("./config/db").isPostgres(),
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mounted Routes
useHandler("activity routes", "/api/activity", activityRoutes);
useHandler("admin analytics routes", "/api/admin/analytics", adminDashboardRoutes);
useHandler("admin routes", "/api/admin", adminRoutes);
useHandler("AI routes", "/api/ai", aiRoutes);
useHandler("assignment routes", "/api/assignments", assignmentRoutes);
useHandler("authentication routes", "/api/auth", authRoutes);
useHandler("blog routes", "/api/blogs", blogRoutes);
useHandler("legacy blog routes", "/api/blog", blogRoutes);
// Crawlers receive post-specific HTML metadata and a no-JS article rendering.
useHandler("blog SEO routes", blogSeoRoutes);
useHandler("certificate routes", "/api/certificates", certificateRoutes);
useHandler("course routes", "/api/courses", courseRoutes);
useHandler("homepage routes", "/api/homepage", homepageRoutes);
useHandler("doubt routes", "/api/doubts", doubtRoutes);
useHandler("enrollment routes", "/api/enrollments", enrollmentRoutes);
useHandler("lecture routes", "/api/lectures", lectureRoutes);
useHandler("payment routes", "/api/payment", paymentRoutes);
useHandler("legacy payment routes", "/api/payments", paymentRoutes);
useHandler("progress routes", "/api/progress", progressRoutes);
useHandler("quiz routes", "/api/quizzes", quizRoutes);
useHandler("section routes", "/api/sections", sectionRoutes);
useHandler("student routes", "/api/students", studentRoutes);
useHandler("teacher routes", "/api/teachers", teacherRoutes);
useHandler("user routes", "/api/user", userRoutes);

// Serve compiled frontend SPA dynamically
useHandler("static frontend middleware", express.static(frontendDist, {
  maxAge: "1y",
  immutable: true,
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
  },
}));
useHandler("frontend SPA fallback", (req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    const indexPath = path.join(frontendDist, "index.html");
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
  }
  next();
});

// 404 Route Handler for unmatched API routes
useHandler("API 404 handler", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handler
useHandler("central error handler", errorHandler);

module.exports = app;
