import { createRequire } from "node:module";
import dotenv from "dotenv";
import { CA_BATCHES_DATA } from "../../frontend/src/data/caBatchesData.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });
const require = createRequire(import.meta.url);
const prisma = require("../src/config/prisma");

const isCompanySecretary = (course) => {
  const text = `${course.id || ""} ${course.level || ""} ${course.levelLabel || ""}`.toLowerCase();
  return text.includes("cs-") || text.includes("cseet") || text.includes("executive") || text.includes("professional");
};

async function transferCourses() {
  let transferred = 0;
  for (const course of CA_BATCHES_DATA) {
    if (!course.id || !course.title) continue;
    const examLabel = isCompanySecretary(course) ? "CS" : "CA";
    const levelLabel = course.levelLabel || course.level || "Course";
    const category = /^(CA|CS)\b/i.test(levelLabel) ? levelLabel : `${examLabel} ${levelLabel}`;
    const metadata = JSON.parse(JSON.stringify(course));
    const price = Number(course.price) || 0;
    const row = {
      courseId: String(course.id),
      title: course.title,
      description: course.description || course.shortDescription || "",
      price,
      originalPrice: Number(course.originalPrice ?? price),
      duration: course.duration || "",
      level: levelLabel,
      category,
      teacher: course.faculty || course.teacher || "",
      thumbnail: course.thumbnail || course.image || "",
      isPublished: course.isPublished !== false,
      rating: course.rating === undefined ? undefined : Number(course.rating),
      metadata,
    };
    await prisma.course.upsert({
      where: { courseId: row.courseId },
      create: row,
      update: row,
    });
    transferred += 1;
  }
  console.log(`Transferred ${transferred} CA/CS batches to Supabase through Prisma.`);
}

transferCourses()
  .catch((error) => {
    console.error("Course transfer failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
