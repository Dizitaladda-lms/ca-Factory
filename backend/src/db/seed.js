const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const envPaths = [
  path.join(__dirname, "..", ".env"),
  path.join(__dirname, "..", "..", ".env"),
  path.join(__dirname, "..", "..", "..", ".env"),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const pool = require("../config/db");

async function seedDatabase() {
  console.log("Seeding Dizital Adda LMS database with Relational Course ID Architecture...");

  if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is not set!");
    process.exit(1);
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const adminPassword = await bcrypt.hash("Admin@12345", 10);
    const teacherPassword = await bcrypt.hash("Teacher@12345", 10);
    const studentPassword = await bcrypt.hash("Student@12345", 10);

    // 1. Seed Admin User
    const adminRes = await client.query(
      `INSERT INTO users (name, full_name, email, password, role, phone, specialization)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
       RETURNING id, email, role`,
      [
        "System Admin",
        "System Admin",
        "admin@dizitaladda.com",
        adminPassword,
        "admin",
        "+919266500223",
        "LMS Administration",
      ]
    );
    console.log("Admin seeded:", adminRes.rows[0].email);

    // 2. Seed Teachers
    const teacherRes = await client.query(
      `INSERT INTO users (name, full_name, email, password, role, phone, specialization)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
       RETURNING id, email, role`,
      [
        "Dr. Gulshan Kumar",
        "Dr. Gulshan Kumar",
        "gulshan@dizitaladda.com",
        teacherPassword,
        "teacher",
        "+918810606010",
        "Digital Marketing & Search AI",
      ]
    );
    const teacherId = teacherRes.rows[0].id;
    console.log("Head Trainer seeded:", teacherRes.rows[0].email);

    // 3. Seed Courses with Unique course_id
    const coursesData = [
      {
        course_id: "dm-advanced",
        title: "Advanced Digital Marketing Course",
        description: "6-month Advanced Digital Marketing Course — 10 live brand campaigns, 54+ AI tools, Google & Meta certifications, and agency internship.",
        price: 18999,
        original_price: 35999,
        duration: "6 Months",
        level: "Advanced",
        category: "Digital Marketing",
        teacher: "Dr. Gulshan Kumar",
        thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
      },
      {
        course_id: "dm-expert",
        title: "Expert in Digital Marketing",
        description: "12-month master program with 70 comprehensive modules, 60+ AI tools, 10 live brand projects, paid agency internship, and 100% placement guarantee.",
        price: 34999,
        original_price: 69999,
        duration: "12 Months",
        level: "Expert",
        category: "Digital Marketing",
        teacher: "Dr. Gulshan Kumar",
        thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
      },
      {
        course_id: "dm-professionals",
        title: "Digital Marketing For Professionals",
        description: "4-month targeted upskilling track with 40 modules, 50+ AI tools, 10 live brand projects, and flexible evening/weekend batches.",
        price: 14999,
        original_price: 27999,
        duration: "4 Months",
        level: "Professional",
        category: "Digital Marketing",
        teacher: "Dr. Gulshan Kumar",
        thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
      },
      {
        course_id: "dm-beginners",
        title: "Digital Marketing For Beginners",
        description: "3-month foundational course with 30 modules, 40+ AI tools, basic SEO, social media marketing, and guided capstone.",
        price: 9999,
        original_price: 19999,
        duration: "3 Months",
        level: "Beginner",
        category: "Digital Marketing",
        teacher: "Dr. Gulshan Kumar",
        thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
      },
      {
        course_id: "ds-advanced",
        title: "Data Science & Data Analytics",
        description: "Complete hands-on data science track covering Python, SQL, Power BI, predictive modeling, machine learning, and business intelligence.",
        price: 55000,
        original_price: 75000,
        duration: "6 Months",
        level: "Advanced",
        category: "Data Science",
        teacher: "Dr. Gulshan Kumar",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      },
      {
        course_id: "cyber-advanced",
        title: "Cyber Security & Ethical Hacking",
        description: "Comprehensive network security, penetration testing, CEH certification prep, incident response, and cloud security labs.",
        price: 50000,
        original_price: 70000,
        duration: "6 Months",
        level: "Advanced",
        category: "Cyber Security",
        teacher: "Dr. Gulshan Kumar",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
      },
      {
        course_id: "ai-expert",
        title: "Diploma in Generative AI & Prompt Engineering",
        description: "12-Month / 288-hour comprehensive diploma program covering AI Foundations, Python & Data Science, Machine Learning, Deep Learning, NLP, Transformers, Generative AI, LangChain, Vector Databases, RAG, Low-Code AI Agents, Major Capstone Projects, and Career Placement.",
        price: 48000,
        original_price: 135000,
        duration: "12 Months",
        level: "Expert",
        category: "Artificial Intelligence",
        teacher: "Dr. Gulshan Kumar",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
      },
    ];

    const seededCoursesMap = {};

    for (const c of coursesData) {
      const cRes = await client.query(
        `INSERT INTO courses (course_id, title, description, price, original_price, duration, level, category, teacher, teacher_id, thumbnail, is_published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true)
         ON CONFLICT (course_id) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           price = EXCLUDED.price,
           original_price = EXCLUDED.original_price,
           duration = EXCLUDED.duration,
           thumbnail = EXCLUDED.thumbnail
         RETURNING id, course_id, title`,
        [
          c.course_id,
          c.title,
          c.description,
          c.price,
          c.original_price,
          c.duration,
          c.level,
          c.category,
          c.teacher,
          teacherId,
          c.thumbnail,
        ]
      );
      seededCoursesMap[c.course_id] = cRes.rows[0];
      console.log(`Course [${c.course_id}] seeded: ID #${cRes.rows[0].id} - ${c.title}`);
    }

    const advancedCourse = seededCoursesMap["dm-advanced"];

    // 4. Seed Sections & Lectures for "dm-advanced"
    const sectionRes = await client.query(
      `INSERT INTO sections (course_id, title, order_num)
       VALUES ($1, $2, $3)
       RETURNING id, title`,
      [advancedCourse.id, "Module 1: Foundation of Digital Marketing & Search AI", 1]
    );
    const sectionId = sectionRes.rows[0].id;

    await client.query(
      `INSERT INTO lectures (course_id, section_id, title, description, video_url, pdf_url, duration, order_num, is_free_preview)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        advancedCourse.id,
        sectionId,
        "1.1 Digital Marketing Landscape & AI Overviews",
        "Introduction to Search Engines, AI Overviews, Consumer Personas, and Full-Funnel Architecture.",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        "24m",
        1,
        true,
      ]
    );

    await client.query(
      `INSERT INTO lectures (course_id, section_id, title, description, video_url, pdf_url, duration, order_num, is_free_preview)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        advancedCourse.id,
        sectionId,
        "1.2 Technical SEO & Core Web Vitals Optimization",
        "Robots.txt, XML sitemaps, structured data schema, crawl budget, and mobile-first speed optimization.",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        "32m",
        2,
        false,
      ]
    );

    // 5. Seed Student User
    const studentUserRes = await client.query(
      `INSERT INTO users (name, full_name, email, password, role, phone)
       VALUES ($1, $2, $3, $4, 'student', $5)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
       RETURNING id, email, role`,
      [
        "Aman Sharma",
        "Aman Sharma",
        "student@dizitaladda.com",
        studentPassword,
        "+919876543212",
      ]
    );
    const studentUserId = studentUserRes.rows[0].id;

    // 6. Link Student Profile with Foreign Keys to courses (course_id & course_code)
    const studentProfileRes = await client.query(
      `INSERT INTO students (user_id, student_id, name, email, password, phone, course_id, course_code, course, teacher, teacher_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'Active')
       ON CONFLICT (student_id) DO UPDATE SET
         course_id = EXCLUDED.course_id,
         course_code = EXCLUDED.course_code,
         course = EXCLUDED.course
       RETURNING id, student_id, course_id, course_code`,
      [
        studentUserId,
        "STU-1001",
        "Aman Sharma",
        "student@dizitaladda.com",
        studentPassword,
        "+919876543212",
        advancedCourse.id,
        advancedCourse.course_id,
        advancedCourse.title,
        "Dr. Gulshan Kumar",
        teacherId,
      ]
    );
    const studentProfileId = studentProfileRes.rows[0].id;
    console.log(`Student Profile seeded: [STU-1001] linked to Course ID #${advancedCourse.id} (${advancedCourse.course_id})`);

    // 7. Seed Active Enrollment (Interlinked with user_id, student_id, and course_id)
    await client.query(
      `INSERT INTO enrollments (user_id, student_id, course_id, status)
       VALUES ($1, $2, $3, 'Active')
       ON CONFLICT (user_id, course_id) DO UPDATE SET status = 'Active'`,
      [studentUserId, studentProfileId, advancedCourse.id]
    );
    console.log(`Active Enrollment created: User #${studentUserId} -> Course #${advancedCourse.id}`);

    await client.query("COMMIT");
    console.log("Database seeded successfully with Relational Course ID Architecture! 🎉");
    process.exit(0);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seeding Failed! ❌", error);
    process.exit(1);
  } finally {
    client.release();
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
