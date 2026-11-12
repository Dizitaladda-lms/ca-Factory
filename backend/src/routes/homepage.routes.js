const express = require("express");
const prisma = require("../config/prisma");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkRole } = require("../middleware/role.middleware");

const router = express.Router();
const adminOnly = [verifyToken, checkRole("admin")];

router.get("/reviews", async (_req, res, next) => {
  try {
    const [welcomeVideo, videos, reviews] = await Promise.all([
      prisma.homepageMedia.findUnique({ where: { key: "mentor_welcome" } }),
      prisma.trainerReviewVideo.findMany({ where: { isPublished: true }, orderBy: [{ displayOrder: "asc" }, { id: "asc" }] }),
      prisma.studentReview.findMany({ where: { isPublished: true }, orderBy: [{ displayOrder: "asc" }, { id: "asc" }], take: 12 }),
    ]);
    res.json({ success: true, welcomeVideo: welcomeVideo?.isPublished ? welcomeVideo : null, videos, reviews });
  } catch (error) {
    next(error);
  }
});

router.put("/welcome-video", ...adminOnly, async (req, res, next) => {
  try {
    const { title = "A message from your mentor", videoUrl, isPublished = true } = req.body;
    if (!String(videoUrl || "").trim()) {
      return res.status(400).json({ success: false, message: "Welcome video URL is required." });
    }
    const welcomeVideo = await prisma.homepageMedia.upsert({
      where: { key: "mentor_welcome" },
      create: { key: "mentor_welcome", title, videoUrl: String(videoUrl).trim(), isPublished: Boolean(isPublished) },
      update: { title, videoUrl: String(videoUrl).trim(), isPublished: Boolean(isPublished) },
    });
    res.json({ success: true, welcomeVideo });
  } catch (error) {
    next(error);
  }
});

router.post("/videos", ...adminOnly, async (req, res, next) => {
  try {
    const { trainerName, videoUrl, title = null, displayOrder = 0, isPublished = true } = req.body;
    if (!String(trainerName || "").trim() || !String(videoUrl || "").trim()) {
      return res.status(400).json({ success: false, message: "Trainer name and video URL are required." });
    }
    const video = await prisma.trainerReviewVideo.create({
      data: { trainerName: String(trainerName).trim(), videoUrl: String(videoUrl).trim(), title, displayOrder: Number(displayOrder) || 0, isPublished: Boolean(isPublished) },
    });
    res.status(201).json({ success: true, video });
  } catch (error) {
    next(error);
  }
});

router.put("/videos/:id", ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ success: false, message: "Invalid video ID." });
    const { trainerName, videoUrl, title, displayOrder, isPublished } = req.body;
    const video = await prisma.trainerReviewVideo.update({
      where: { id },
      data: {
        ...(trainerName !== undefined && { trainerName: String(trainerName).trim() }),
        ...(videoUrl !== undefined && { videoUrl: String(videoUrl).trim() }),
        ...(title !== undefined && { title }),
        ...(displayOrder !== undefined && { displayOrder: Number(displayOrder) || 0 }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    });
    res.json({ success: true, video });
  } catch (error) {
    next(error);
  }
});

router.delete("/videos/:id", ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ success: false, message: "Invalid video ID." });
    await prisma.trainerReviewVideo.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/reviews", ...adminOnly, async (req, res, next) => {
  try {
    const { studentName, videoUrl, rating = 5, rankOrAttempt = null, avatar = null, trainerName = null, subject = null, displayOrder = 0, isPublished = true } = req.body;
    const numericRating = Number(rating);
    if (!String(studentName || "").trim() || !String(videoUrl || "").trim() || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ success: false, message: "Student name, review video URL, and a 1–5 rating are required." });
    }
    const review = await prisma.studentReview.create({
      data: { studentName: String(studentName).trim(), videoUrl: String(videoUrl).trim(), rating: numericRating, rankOrAttempt, avatar, trainerName, subject, displayOrder: Number(displayOrder) || 0, isPublished: Boolean(isPublished) },
    });
    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
});

router.put("/reviews/:id", ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ success: false, message: "Invalid review ID." });
    const { studentName, videoUrl, rating, rankOrAttempt, avatar, trainerName, subject, displayOrder, isPublished } = req.body;
    const numericRating = rating === undefined ? undefined : Number(rating);
    if (numericRating !== undefined && (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5)) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
    }
    const review = await prisma.studentReview.update({
      where: { id },
      data: {
        ...(studentName !== undefined && { studentName: String(studentName).trim() }),
        ...(videoUrl !== undefined && { videoUrl: String(videoUrl).trim() }),
        ...(numericRating !== undefined && { rating: numericRating }),
        ...(rankOrAttempt !== undefined && { rankOrAttempt }),
        ...(avatar !== undefined && { avatar }),
        ...(trainerName !== undefined && { trainerName }),
        ...(subject !== undefined && { subject }),
        ...(displayOrder !== undefined && { displayOrder: Number(displayOrder) || 0 }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
    });
    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
});

router.delete("/reviews/:id", ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ success: false, message: "Invalid review ID." });
    await prisma.studentReview.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
