const prisma = require("../config/prisma");
const cacheService = require("../services/cache.service");

const serializeCourse = (course) => {
  const {
    courseId, originalPrice, teacherId, isPublished, totalLectures, totalStudents,
    createdAt, updatedAt, metadata, _count, ...rest
  } = course;
  return {
    ...(metadata && typeof metadata === "object" ? metadata : {}),
    ...rest,
    course_id: courseId,
    original_price: originalPrice,
    teacher_id: teacherId,
    is_published: isPublished,
    total_lectures: _count ? _count.lectures : Number(totalLectures || 0),
    total_students: _count ? _count.enrollments : Number(totalStudents || 0),
    created_at: createdAt,
    updated_at: updatedAt,
  };
};

const serializeLecture = (lecture) => {
  const { sectionId, videoUrl, pdfUrl, orderNum, isFreePreview, createdAt, ...rest } = lecture;
  return {
    ...rest,
    section_id: sectionId,
    video_url: videoUrl,
    pdf_url: pdfUrl,
    order_num: orderNum,
    is_free_preview: isFreePreview,
    created_at: createdAt,
  };
};

// ==========================================
// 1. GET ALL COURSES (Public with Redis/Memory Caching)
// ==========================================
const getCourses = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const cacheKey = `courses:list:${category || "all"}:${search || ""}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache", "HIT");
      res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
      return res.status(200).json(cached);
    }

    const where = { isPublished: true };
    if (category && category !== "All") where.category = category;
    if (search?.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { id: "desc" },
      include: { _count: { select: { lectures: true, enrollments: true } } },
    });

    const payload = {
      success: true,
      courses: courses.map(serializeCourse),
    };

    // Cache in Redis/Memory for 3 minutes (180s)
    await cacheService.set(cacheKey, payload, 180);

    res.setHeader("X-Cache", "MISS");
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 2. GET SINGLE COURSE WITH CURRICULUM
// ==========================================
const getSingleCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `course:single:${id}`;

    const cached = await cacheService.get(cacheKey);
    if (cached) {
      res.setHeader("X-Cache", "HIT");
      res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
      return res.status(200).json(cached);
    }

    const numericId = Number(id);
    const course = await prisma.course.findFirst({
      where: {
        OR: [
          ...(Number.isInteger(numericId) ? [{ id: numericId }] : []),
          { courseId: id },
        ],
      },
      include: {
        sections: {
          orderBy: [{ orderNum: "asc" }, { id: "asc" }],
          include: { lectures: { orderBy: [{ orderNum: "asc" }, { id: "asc" }] } },
        },
        lectures: { orderBy: [{ orderNum: "asc" }, { id: "asc" }] },
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const sectionsWithLectures = course.sections.map((section) => {
      const { courseId, orderNum, createdAt, lectures, ...rest } = section;
      return {
        ...rest,
        course_id: courseId,
        order_num: orderNum,
        created_at: createdAt,
        lectures: lectures.map(serializeLecture),
      };
    });
    const serializedLectures = course.lectures.map(serializeLecture);

    const payload = {
      success: true,
      course: {
        ...serializeCourse(course),
        sections: sectionsWithLectures,
        lectures: serializedLectures,
      },
    };

    // Cache for 5 minutes (300s)
    await cacheService.set(cacheKey, payload, 300);

    res.setHeader("X-Cache", "MISS");
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. ADD COURSE (Teacher or Admin)
// ==========================================
const addCourse = async (req, res, next) => {
  try {
    const {
      course_id,
      courseId,
      title,
      description,
      duration,
      level,
      category,
      price,
      originalPrice,
      teacher,
      thumbnail,
    } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title and price are required",
      });
    }

    const teacherName = teacher || req.user?.name || "Dizital Adda Instructor";
    const teacherId = req.user?.role === "teacher" ? req.user.id : null;

    const slug = String(title).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
    const created = await prisma.course.create({
      data: {
        courseId: String(course_id || courseId || `${slug}-${Date.now()}`).slice(0, 100),
        title: String(title).trim(),
        description: description || "",
        duration: duration || "4 Weeks",
        level: level || "Beginner",
        category: category || "General",
        price: Number(price),
        originalPrice: Number(originalPrice ?? price),
        teacher: teacherName,
        teacherId: teacherId ? Number(teacherId) : null,
        thumbnail: thumbnail || "",
        isPublished: true,
      },
    });

    // Invalidate course caches on new course creation
    await cacheService.delPattern("courses:*");
    await cacheService.delPattern("course:*");

    res.status(201).json({
      success: true,
      message: "Course Added Successfully 🚀",
      course: serializeCourse(created),
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 4. GET MY TEACHER COURSES
// ==========================================
const getTeacherCourses = async (req, res, next) => {
  try {
    const teacherId = req.user.id;
    const teacherName = req.user.name;

    const result = await prisma.course.findMany({
      where: { OR: [{ teacherId: Number(teacherId) }, { teacher: { contains: teacherName, mode: "insensitive" } }] },
      orderBy: { id: "desc" },
    });

    res.json({
      success: true,
      courses: result.map(serializeCourse),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getSingleCourse,
  addCourse,
  getTeacherCourses,
  serializeCourse,
};
