const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  getBlogCategories,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");
const rateLimit = require("../middleware/rateLimit.middleware");
const extra = require("../controllers/blog-extra.controller");
const publicPostLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 8, message: "Too many submissions. Please try again later." });

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.get("/", getBlogs);
router.get("/posts", getBlogs);
router.get("/posts/:slug", getBlogBySlug);
router.get("/categories", getBlogCategories);
router.get("/search", getBlogs);
router.post("/leads", publicPostLimiter, extra.createLead);
router.post("/comments", publicPostLimiter, extra.createComment);
router.post("/analytics", publicPostLimiter, extra.trackEvent);
router.get("/comments/:blogId", extra.listComments);
router.get("/slug/:slug", getBlogBySlug);

// ==========================================
// ADMIN MANAGEMENT ROUTES (Protected)
// ==========================================
router.get("/admin/all", verifyToken, checkRole("admin"), getAdminBlogs);
router.get("/admin/comments", verifyToken, checkRole("admin"), extra.adminComments);
router.get("/admin/categories", verifyToken, checkRole("admin"), extra.categories);
router.post("/admin/categories", verifyToken, checkRole("admin"), extra.saveCategory);
router.put("/admin/categories/:id", verifyToken, checkRole("admin"), extra.saveCategory);
router.delete("/admin/categories/:id", verifyToken, checkRole("admin"), extra.deleteCategory);
router.get("/admin/tags", verifyToken, checkRole("admin"), extra.tags);
router.post("/admin/tags", verifyToken, checkRole("admin"), extra.saveTag);
router.put("/admin/tags/:id", verifyToken, checkRole("admin"), extra.saveTag);
router.delete("/admin/tags/:id", verifyToken, checkRole("admin"), extra.deleteTag);
router.get("/admin/redirects", verifyToken, checkRole("admin"), extra.redirects);
router.post("/admin/redirects", verifyToken, checkRole("admin"), extra.saveRedirect);
router.delete("/admin/redirects/:id", verifyToken, checkRole("admin"), extra.deleteRedirect);
router.patch("/admin/comments/:id", verifyToken, checkRole("admin"), extra.moderateComment);
router.get("/admin/:id/revisions", verifyToken, checkRole("admin"), extra.listRevisions);
router.post("/admin/:id/revisions/:revisionId/rollback", verifyToken, checkRole("admin"), extra.rollbackRevision);
router.get("/admin/:id/analytics", verifyToken, checkRole("admin"), extra.analytics);
router.post("/", verifyToken, checkRole("admin"), createBlog);
router.put("/:id", verifyToken, checkRole("admin"), updateBlog);
router.delete("/:id", verifyToken, checkRole("admin"), deleteBlog);

// Single slug fallback (must be at the bottom so it doesn't collide with /categories or /admin)
router.get("/:slug", getBlogBySlug);

module.exports = router;
