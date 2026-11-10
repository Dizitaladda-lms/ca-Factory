import React from "react";
import { useNavigate } from "react-router-dom";
import { getCourseDescriptionUrl } from "../../utils/courseNavigation";

// Helper to extract 2-letter uppercase initials
const getInitials = (name) => {
  if (!name) return "RS";
  const parts = String(name).trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper to format currency numbers to ₹XX,XXX
const formatCurrency = (val) => {
  if (!val) return "";
  if (typeof val === "string" && val.startsWith("₹")) return val;
  const num = Number(val);
  if (isNaN(num)) return String(val);
  return `₹${num.toLocaleString("en-IN")}`;
};

// Helper to determine dynamic 3 high-impact bullet points matching the course description
const getCourseHighlights = (course, descriptionText) => {
  if (Array.isArray(course?.highlights) && course.highlights.length >= 3) {
    return course.highlights.slice(0, 3);
  }
  if (Array.isArray(course?.features) && course.features.length >= 3) {
    return course.features.slice(0, 3);
  }

  const text = `${course?.title || ""} ${descriptionText || ""} ${course?.category || ""} ${course?.field || ""}`.toLowerCase();

  if (
    text.includes("ai") ||
    text.includes("prompt") ||
    text.includes("genai") ||
    text.includes("intelligence") ||
    text.includes("gpt") ||
    text.includes("llm")
  ) {
    return [
      "Master LLMs, Prompt Engineering frameworks (CoT, ReAct)",
      "Build real apps with LangChain & Multi-Agent systems",
      "Capstone project + placement support included",
    ];
  }

  if (
    text.includes("marketing") ||
    text.includes("seo") ||
    text.includes("ads") ||
    text.includes("growth") ||
    text.includes("digital")
  ) {
    return [
      "Master Google Ads, Meta Ads & AI Performance Marketing",
      "Run live brand campaigns with real client budgets",
      "Agency internship + placement assistance included",
    ];
  }

  if (
    text.includes("stack") ||
    text.includes("web") ||
    text.includes("react") ||
    text.includes("code") ||
    text.includes("software") ||
    text.includes("development") ||
    text.includes("developer")
  ) {
    return [
      "Master React, Node.js, Next.js & scalable cloud databases",
      "Build 5+ production-grade portfolio apps from scratch",
      "Capstone project + live technical interview prep",
    ];
  }

  if (
    text.includes("science") ||
    text.includes("machine") ||
    text.includes("python") ||
    text.includes("deep learning")
  ) {
    return [
      "Master Python, Pandas, Predictive ML & Deep Learning",
      "Hands-on case studies with real enterprise datasets",
      "Portfolio capstone + recognized industry certification",
    ];
  }

  if (
    text.includes("analytics") ||
    text.includes("power bi") ||
    text.includes("excel") ||
    text.includes("tableau") ||
    text.includes("sql")
  ) {
    return [
      "Master Advanced Excel, SQL queries & ETL data modeling",
      "Build interactive executive dashboards in Power BI & Tableau",
      "Real-world business case studies + placement assistance",
    ];
  }

  if (
    text.includes("cyber") ||
    text.includes("security") ||
    text.includes("ethical") ||
    text.includes("hacking")
  ) {
    return [
      "Master Network Security, Kali Linux, Burp Suite & Metasploit",
      "Hands-on Web App Penetration Testing (OWASP Top 10) & CTFs",
      "Bug bounty methodologies + corporate security internship",
    ];
  }

  if (
    text.includes("cloud") ||
    text.includes("devops") ||
    text.includes("aws") ||
    text.includes("docker") ||
    text.includes("kubernetes")
  ) {
    return [
      "Master AWS Cloud architecture, Linux & Docker containers",
      "Automate CI/CD with GitHub Actions, Kubernetes & Terraform",
      "Production deployment projects + cloud interview prep",
    ];
  }

  if (
    text.includes("jee") ||
    text.includes("engineering entrance")
  ) {
    return [
      "800+ Hours live Kota coaching for Physics, Chemistry & Maths",
      "15,000+ solved previous year questions with video solutions",
      "All-India Computer Based Test Series with AIR rank prediction",
    ];
  }

  if (
    text.includes("neet") ||
    text.includes("medical")
  ) {
    return [
      "100% NCERT Line-by-Line audio-visual decoding for Biology",
      "Physics & Chemistry numerical shortcut formula masterclass",
      "OMR-based full mock test series with AIIMS rankers",
    ];
  }

  if (
    text.includes("upsc") ||
    text.includes("civil services") ||
    text.includes("ias") ||
    text.includes("ssc") ||
    text.includes("bank")
  ) {
    return [
      "Complete syllabus coverage from scratch with daily live classes",
      "Vedic speed maths & high-level reasoning puzzle drills",
      "Full-length CBT mock tests with real-time cutoff simulator",
    ];
  }

  if (
    text.includes("board") ||
    text.includes("cbse") ||
    text.includes("class") ||
    text.includes("academic")
  ) {
    return [
      "Complete NCERT Line-by-Line Syllabus with Solved Exemplar",
      "Weekly Chapterwise Tests & Board Sample Papers",
      "24/7 AI Doubt Mentor for Homework & Exam Prep",
    ];
  }

  return [
    "Comprehensive curriculum designed by top industry faculty",
    "Hands-on practical projects & real-world assignments",
    "Verified certificate + 24/7 AI Doubt solving support",
  ];
};

// Helper to determine dynamic subtitle tailored to course description
const getCourseSubtitle = (course, descriptionText) => {
  if (course?.subtitle) {
    return course.subtitle;
  }

  const text = `${course?.title || ""} ${descriptionText || ""} ${course?.category || ""}`.toLowerCase();

  if (
    text.includes("ai") ||
    text.includes("prompt") ||
    text.includes("genai") ||
    text.includes("gpt") ||
    text.includes("llm")
  ) {
    return (
      <>
        Go from <b>prompt basics to production-grade AI systems</b> — a
        project-driven program built with working AI engineers.
      </>
    );
  }

  if (
    text.includes("marketing") ||
    text.includes("seo") ||
    text.includes("ads") ||
    text.includes("growth") ||
    text.includes("digital")
  ) {
    return (
      <>
        Master <b>performance marketing, SEO & Meta ads</b> with live client
        budgets, AI automation and agency internship.
      </>
    );
  }

  if (
    text.includes("stack") ||
    text.includes("web") ||
    text.includes("react") ||
    text.includes("code") ||
    text.includes("software")
  ) {
    return (
      <>
        Go from <b>core coding to production-grade architectures</b> — build
        scalable full-stack apps with modern frameworks.
      </>
    );
  }

  if (
    text.includes("science") ||
    text.includes("machine") ||
    text.includes("python")
  ) {
    return (
      <>
        Master <b>predictive modeling, Python & modern AI workflows</b> —
        hands-on case studies with real enterprise datasets.
      </>
    );
  }

  if (
    text.includes("analytics") ||
    text.includes("power bi") ||
    text.includes("excel") ||
    text.includes("bi")
  ) {
    return (
      <>
        Transform <b>raw business data into executive insights</b> — master
        Advanced Excel, SQL, Tableau & Power BI dashboards.
      </>
    );
  }

  if (
    text.includes("cyber") ||
    text.includes("security") ||
    text.includes("ethical") ||
    text.includes("hacking")
  ) {
    return (
      <>
        Learn <b>penetration testing, network defense & bug bounty</b> —
        real-world CTF labs with certified security researchers.
      </>
    );
  }

  if (
    text.includes("cloud") ||
    text.includes("devops") ||
    text.includes("aws")
  ) {
    return (
      <>
        Automate <b>resilient cloud infrastructure with AWS & Docker</b> —
        continuous integration & Kubernetes cluster deployments.
      </>
    );
  }

  if (descriptionText && descriptionText.length > 20) {
    return (
      <>
        <b>{descriptionText.slice(0, 50)}</b>
        {descriptionText.length > 50 ? descriptionText.slice(50, 130) + "..." : ""}
      </>
    );
  }

  return (
    <>
      Go from <b>foundational concepts to production-grade implementation</b> —
      a project-driven program built with working industry specialists.
    </>
  );
};

export default function CourseCard({
  course,
  field: propField,
  duration: propDuration,
  title: propTitle,
  rating: propRating,
  learners: propLearners,
  seatsLeft: propSeatsLeft,
  subtitle: propSubtitle,
  highlights: propHighlights,
  meta: propMeta,
  instructorInitials: propInitials,
  instructorName: propInstructorName,
  instructorBlurb: propInstructorBlurb,
  oldPrice: propOldPrice,
  price: propPrice,
  savePct: propSavePct,
  onExplore: propOnExplore,
}) {
  const navigate = useNavigate();

  // If a course object is passed, extract & calculate values dynamically
  const courseId = course?.course_id || course?.id;
  const descriptionText = course?.description || "";

  // 1. Field / Category
  const field =
    propField ||
    course?.category ||
    course?.field ||
    "Professional Track";

  // 2. Duration
  const duration =
    propDuration ||
    course?.duration ||
    "6 Months";

  // 3. Title
  const title =
    propTitle ||
    course?.title ||
    "Advanced Certification Program";

  // 4. Rating & Learners
  const rating =
    propRating ||
    (course?.rating ? String(Number(course.rating).toFixed(1)) : "4.8");

  const learners =
    propLearners ||
    course?.learners ||
    course?.students ||
    course?.total_students ||
    (courseId ? `${(1500 + ((Number(courseId) || 1) * 280)).toLocaleString("en-IN")}` : "2,340");

  // 5. Seats Left Urgency
  const seatsLeft =
    propSeatsLeft !== undefined
      ? propSeatsLeft
      : course?.seatsLeft !== undefined
      ? course.seatsLeft
      : 7 + ((Number(courseId) || 1) % 9);

  // 6. Subtitle (Tailored to description)
  const subtitle =
    propSubtitle ||
    getCourseSubtitle(course, descriptionText);

  // 7. Highlights (3 Checkmarked bullets tailored to description)
  const highlights =
    propHighlights ||
    getCourseHighlights(course, descriptionText);

  // 8. Meta Pills
  const meta =
    propMeta ||
    course?.meta || [
      duration,
      course?.level || "Advanced",
      course?.mode || "Live + Self-paced",
    ];

  // 9. Instructor Info
  const instructorName =
    propInstructorName ||
    course?.instructor ||
    course?.teacher ||
    "Rhea Sharma";

  const instructorInitials =
    propInitials ||
    course?.instructorInitials ||
    getInitials(instructorName);

  const instructorBlurb =
    propInstructorBlurb ||
    course?.instructorBlurb ||
    course?.teacher_role ||
    course?.instructorRole ||
    course?.specialization ||
    "ex-Google AI, 8+ yrs in ML";

  // 10. Pricing & Discount Calculations
  const rawPrice =
    course?.price !== undefined
      ? course.price
      : propPrice !== undefined
      ? propPrice
      : 34999;

  const rawOldPrice =
    course?.originalPrice !== undefined
      ? course.originalPrice
      : course?.original_price !== undefined
      ? course.original_price
      : propOldPrice !== undefined
      ? propOldPrice
      : typeof rawPrice === "number"
      ? Math.round(rawPrice * 1.65)
      : 60000;

  const price = propPrice || formatCurrency(rawPrice) || "₹34,999";
  const oldPrice = propOldPrice || formatCurrency(rawOldPrice) || "₹60,000";

  let computedSavePct = "Save 42%";
  if (typeof rawPrice === "number" && typeof rawOldPrice === "number" && rawOldPrice > rawPrice) {
    const pct = Math.round(((rawOldPrice - rawPrice) / rawOldPrice) * 100);
    computedSavePct = `Save ${Math.max(10, Math.min(85, pct))}%`;
  }
  const savePct = propSavePct || course?.savePct || computedSavePct;

  // Handle Exploration navigation
  const handleExplore = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (propOnExplore) {
      propOnExplore();
    } else {
      const targetUrl = getCourseDescriptionUrl(
        course || {
          id: courseId,
          course_id: courseId,
          title,
          category: field,
          duration,
        }
      );
      navigate(targetUrl);
    }
  };

  return (
    <div className="cc-card">
      <style>{`
        .cc-card{
          font-family:'Fredoka', 'Segoe UI', sans-serif;
          width:100%;
          max-width:380px;
          border-radius:22px;
          overflow:hidden;
          background:#fff;
          box-shadow:0 30px 60px -30px rgba(20,24,58,0.45);
          border:1px solid #e7e8ef;
          color:#111322;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          transition:transform 0.3s ease, box-shadow 0.3s ease;
          margin:0 auto;
        }
        .cc-card:hover{
          transform:translateY(-6px);
          box-shadow:0 36px 70px -25px rgba(20,24,58,0.55);
        }
        .cc-head{
          position:relative;
          padding:22px 22px 34px;
          background:
            radial-gradient(120% 160% at 100% -10%, rgba(139,92,246,0.35), transparent 55%),
            linear-gradient(160deg, #0d1024 0%, #14183a 100%);
          overflow:hidden;
        }
        .cc-head::after{
          content:'';
          position:absolute;
          right:-40px;top:-40px;
          width:160px;height:160px;
          border-radius:50%;
          background:radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%);
        }
        .cc-top-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;position:relative;z-index:1;}
        .cc-field-tag{
          font-size:11.5px;font-weight:600;color:#3d2e78;
          background:#ede4ff;
          padding:6px 12px;border-radius:100px;
          display:inline-flex;align-items:center;gap:6px;
        }
        .cc-field-tag::before{content:'✦';font-size:10px;color:#8b5cf6;}
        .cc-duration-tag{
          font-size:11.5px;font-weight:700;color:#1a1a1a;
          background:#f5b400;
          padding:6px 12px;border-radius:100px;
        }
        .cc-title{
          font-family:'Fredoka', 'Segoe UI', sans-serif;
          font-size:23px;font-weight:700;line-height:1.32;
          color:#fff;margin:0 0 10px;letter-spacing:-0.01em;
          position:relative;z-index:1;
          cursor:pointer;
          transition:color 0.2s ease;
        }
        .cc-title:hover{
          color:#f5b400;
        }
        .cc-rating-row{display:flex;align-items:center;gap:8px;position:relative;z-index:1;}
        .cc-stars{color:#f5b400;font-size:13px;letter-spacing:1px;}
        .cc-rating-text{font-size:12px;color:#b9bce0;}
        .cc-rating-text b{color:#fff;}
        .cc-badge-strip{
          background:#fff4d6;color:#8a5a00;font-size:12px;font-weight:600;
          padding:9px 22px;display:flex;align-items:center;gap:7px;
        }
        .cc-badge-strip .cc-dot{
          width:6px;height:6px;border-radius:50%;background:#e0570a;
          box-shadow:0 0 0 3px rgba(224,87,10,0.18);flex-shrink:0;
          animation:cc-pulse 1.8s infinite;
        }
        @keyframes cc-pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(224, 87, 10, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 5px rgba(224, 87, 10, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(224, 87, 10, 0); }
        }
        .cc-body{padding:20px 22px 22px;display:flex;flex-direction:column;justify-content:space-between;flex-grow:1;}
        .cc-subtitle{font-size:14px;line-height:1.6;color:#4b4e5e;margin:0 0 16px;}
        .cc-highlights{display:flex;flex-direction:column;gap:9px;margin-bottom:18px;}
        .cc-highlight{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:#3a3d4d;line-height:1.4;}
        .cc-highlight svg{width:16px;height:16px;flex-shrink:0;margin-top:1px;stroke:#0f9d58;}
        .cc-meta{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;}
        .cc-pill{
          font-size:11.5px;font-weight:500;color:#3a3d4d;
          border:1px solid #e3e4ec;background:#f8f8fb;
          border-radius:100px;padding:6px 12px;
        }
        .cc-instructor-row{
          display:flex;align-items:center;gap:10px;padding:12px 14px;
          background:#f8f8fb;border-radius:12px;margin-bottom:20px;
        }
        .cc-avatar{
          width:32px;height:32px;border-radius:50%;
          background:linear-gradient(135deg,#8b5cf6,#5b3fd1);
          display:flex;align-items:center;justify-content:center;
          color:#fff;font-size:13px;font-weight:700;flex-shrink:0;
        }
        .cc-instructor-text{font-size:12px;color:#5c5f70;line-height:1.4;}
        .cc-instructor-text b{color:#111322;font-weight:600;}
        .cc-hr{border:none;border-top:1px solid #eceef3;margin:0 0 18px;}
        .cc-foot{display:flex;justify-content:space-between;align-items:flex-end;}
        .cc-old{font-size:12px;color:#a0a2b0;text-decoration:line-through;margin-bottom:2px;}
        .cc-now{font-family:'Fredoka', 'Segoe UI', sans-serif;font-size:26px;font-weight:700;color:#111322;}
        .cc-save{
          display:inline-block;font-size:11px;font-weight:700;color:#0f9d58;
          background:#e6f7ee;padding:2px 8px;border-radius:6px;
          margin-left:8px;vertical-align:middle;
        }
        .cc-cta{
          font-family:'Fredoka', 'Segoe UI', sans-serif;font-size:13.5px;font-weight:700;color:#fff;
          background:linear-gradient(135deg,#8b5cf6,#5b3fd1);
          border:none;border-radius:12px;padding:13px 22px;cursor:pointer;
          box-shadow:0 10px 24px -8px rgba(91,63,209,0.55);
          display:flex;align-items:center;gap:6px;
          transition:transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cc-cta:hover{
          transform:translateY(-1px);
          box-shadow:0 14px 28px -6px rgba(91,63,209,0.7);
        }
      `}</style>

      <div className="cc-head">
        <div className="cc-top-row">
          <span className="cc-field-tag">{field}</span>
          <span className="cc-duration-tag">{duration}</span>
        </div>
        <h3 className="cc-title" onClick={handleExplore}>
          {title}
        </h3>
        <div className="cc-rating-row">
          <span className="cc-stars">★★★★★</span>
          <span className="cc-rating-text">
            <b>{rating}</b> ({learners} learners)
          </span>
        </div>
      </div>

      {seatsLeft != null && (
        <div className="cc-badge-strip">
          <span className="cc-dot" />
          Only {seatsLeft} seats left in this cohort · Bestseller in {field}
        </div>
      )}

      <div className="cc-body">
        <div>
          <p className="cc-subtitle">{subtitle}</p>

          <div className="cc-highlights">
            {highlights.map((h, i) => (
              <div className="cc-highlight" key={i}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="cc-meta">
            {meta.map((m, i) => (
              <span className="cc-pill" key={i}>
                {m}
              </span>
            ))}
          </div>

          <div className="cc-instructor-row">
            <div className="cc-avatar">{instructorInitials}</div>
            <div className="cc-instructor-text">
              Taught by <b>{instructorName}</b> — {instructorBlurb}
            </div>
          </div>
        </div>

        <div>
          <hr className="cc-hr" />

          <div className="cc-foot">
            <button
              className="cc-cta"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleExplore}
            >
              Explore Program
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}