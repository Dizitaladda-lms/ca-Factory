const prisma = require("../src/config/prisma");

const reviews = [
  {
    studentName: "Rohan Verma",
    rankOrAttempt: "AIR 3 CA Final (Nov 2025)",
    trainerName: "Dr. Gulshan Kumar",
    subject: "CA & CS Mentorship",
    comment: "Dr. Gulshan Kumar sir's mentorship was the turning point in my CA journey. His personal strategy sessions and structured answer templates gave me the confidence to secure AIR 3.",
  },
  {
    studentName: "Shreya Joshi",
    rankOrAttempt: "CS Executive All Subjects Cleared (June 2026)",
    trainerName: "Dr. Gulshan Kumar",
    subject: "Company Law",
    comment: "Gulshan Sir doesn't just teach the syllabus, he teaches how to think like a corporate advisor. Truly inspiring guidance at CS Factory!",
  },
  {
    studentName: "Aditya Malhotra",
    rankOrAttempt: "CA Inter AIR 9 (May 2026)",
    trainerName: "CA Gaurav Agarwal",
    subject: "Advanced Accounting",
    comment: "The way Sir breaks down journal entries with real company balance sheets made accounting my strongest paper. I scored 84 marks.",
  },
  {
    studentName: "Pooja Singhania",
    rankOrAttempt: "CA Foundation 320/400 (Jan 2026)",
    trainerName: "CA Gaurav Agarwal",
    subject: "Accounting",
    comment: "Sir's DPPs and weekly test evaluations pointed out exactly where I was losing formatting marks. He replies to doubts personally.",
  },
  {
    studentName: "Rohan Deshmukh",
    rankOrAttempt: "CA Inter First Attempt Cleared",
    trainerName: "CA Neha Mehta",
    subject: "Corporate Law",
    comment: "Law was my biggest nightmare until I joined Neha Ma'am's batch. Her section revision charts and case study solving technique helped me score 71 in Corporate Law.",
  },
  {
    studentName: "Sneha Nair",
    rankOrAttempt: "CA Foundation Jan 2026",
    trainerName: "CA Neha Mehta",
    subject: "Business Law",
    comment: "Her answer-writing templates taught us how examiners step-mark law papers. The Sunday mock tests prepared me for the exact ICAI exam pressure.",
  },
  {
    studentName: "Kunal Mehra",
    rankOrAttempt: "CA Final AIR 14",
    trainerName: "CA Sandeep Sharma",
    subject: "Direct Tax",
    comment: "His summary sheets and case-law analysis condensed a huge syllabus into clear concepts. I scored 78 in Direct Tax.",
  },
  {
    studentName: "Ananya Roy",
    rankOrAttempt: "CS Executive All-India Rank 18",
    trainerName: "CS Ritu Chopra",
    subject: "Company Law",
    comment: "Ritu Ma'am's company law classes are incredible. She taught us how to draft notices, board reports, and resolutions practically.",
  },
];

async function seedHomepageReviews() {
  for (const [index, review] of reviews.entries()) {
    const existing = await prisma.studentReview.findFirst({
      where: { studentName: review.studentName, comment: review.comment },
      select: { id: true },
    });
    if (!existing) {
      await prisma.studentReview.create({ data: { ...review, rating: 5, displayOrder: index } });
    }
  }
  console.log(`Homepage review seed complete (${reviews.length} student reviews available).`);
}

seedHomepageReviews()
  .catch((error) => {
    console.error("Failed to seed homepage student reviews:", error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
