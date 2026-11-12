import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaGraduationCap,
  FaUniversity,
  FaCheckCircle,
  FaStar,
  FaWhatsapp,
  FaPhoneAlt,
  FaChevronRight,
  FaUndo,
  FaTimes,
  FaSearch,
  FaRegLightbulb,
} from "react-icons/fa";
import CourseCard from "../components/course/CourseCard";
import Footer from "../components/Footer";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const UG_COURSES = [
  "B.Tech (CSE / IT)",
  "B.Tech (ECE / EE / Mech)",
  "BCA (Computer Applications)",
  "BBA (Business Administration)",
  "B.Com (Honours / General)",
  "B.Sc (Computer Science / IT)",
  "B.Sc (Physics / Chem / Math)",
  "BA (Economics / Pol Science)",
];

const PG_COURSES = [
  "MBA (Finance / Marketing / HR)",
  "MCA (Master of Computer App)",
  "M.Tech (Computer Science)",
  "M.Com (Master of Commerce)",
  "M.Sc (Data Science & AI)",
  "MA (Economics / Public Admin)",
];

export default function Academic() {
  const navigate = useNavigate();

  // Step 1: Level (school, ug, pg)
  // Step 2: Board (CBSE, ICSE, STATE) or Degree (B.Tech, BCA, etc.)
  // Step 3: Class / Semester
  // Step 4: Subject Courses Grid
  const [step, setStep] = useState(1);
  const [educationType, setEducationType] = useState("school");
  const [board, setBoard] = useState("CBSE");
  const [selectedState, setSelectedState] = useState("");
  const [selectedClass, setSelectedClass] = useState("12");
  const [stream, setStream] = useState("Science");
  const [selectedCourse, setSelectedCourse] = useState("B.Tech (CSE / IT)");
  const [selectedSemester, setSelectedSemester] = useState("1");

  // Counselor Modal
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [counselorForm, setCounselorForm] = useState({ name: "", phone: "", level: "School (CBSE)" });

  // Generate dynamic academic courses for Step 4
  const getSubjectCourses = () => {
    if (educationType === "school") {
      let subjects = [];
      if (selectedClass === "11" || selectedClass === "12") {
        if (stream === "Science") {
          subjects = [
            {
              title: `Class ${selectedClass} Physics (${board})`,
              desc: "NCERT line-by-line concept clarity, derivation notebooks, and previous 10 years board paper solutions.",
              teacher: "Er. Ramesh Verma (M.Tech)",
              price: 3499,
              originalPrice: 7999,
            },
            {
              title: `Class ${selectedClass} Chemistry (${board})`,
              desc: "Organic reaction mechanism charts, inorganic memory tips, and board practicals demonstration.",
              teacher: "Dr. Sunita Rao (Ph.D Chemistry)",
              price: 3499,
              originalPrice: 7999,
            },
            {
              title: `Class ${selectedClass} Mathematics (${board})`,
              desc: "Complete step-by-step NCERT + Exemplar solutions, formula flashcards, and CBSE sample papers.",
              teacher: "Prof. S.K. Gupta (M.Sc Math)",
              price: 3499,
              originalPrice: 7999,
            },
            {
              title: `Class ${selectedClass} Biology (${board})`,
              desc: "Colored NCERT diagram breakdowns, high-weightage genetic notes, and assertion-reason mastery.",
              teacher: "Dr. Aarti Sharma (MBBS)",
              price: 3499,
              originalPrice: 7999,
            },
          ];
        } else if (stream === "Commerce") {
          subjects = [
            {
              title: `Class ${selectedClass} Accountancy (${board})`,
              desc: "Partnership, Company Accounts, Cash Flow Statements with step-by-step balance sheet tallying.",
              teacher: "CA Priya Malik",
              price: 3499,
              originalPrice: 7999,
            },
            {
              title: `Class ${selectedClass} Economics (${board})`,
              desc: "Micro & Macro Economics, National Income calculation methods, and Indian Economic Development.",
              teacher: "Prof. Ananya Sen (SRCC Alum)",
              price: 2999,
              originalPrice: 6999,
            },
            {
              title: `Class ${selectedClass} Business Studies (${board})`,
              desc: "Case studies decoding, presentation techniques, and 100% board-scoring answer templates.",
              teacher: "Dr. Rajesh Kapoor",
              price: 2999,
              originalPrice: 6999,
            },
          ];
        } else {
          subjects = [
            {
              title: `Class ${selectedClass} History & Pol Science (${board})`,
              desc: "Timeline maps, constitutional articles, and 8-mark structured answer writing formats.",
              teacher: "Prof. Meenakshi Sundaram",
              price: 2999,
              originalPrice: 6999,
            },
            {
              title: `Class ${selectedClass} Geography & Economics (${board})`,
              desc: "Physical & human geography, cartography, and case-study analysis for board exams.",
              teacher: "Dr. Harish Chandra",
              price: 2999,
              originalPrice: 6999,
            },
          ];
        }
      } else {
        subjects = [
          {
            title: `Class ${selectedClass} Science Complete Foundation (${board})`,
            desc: "Physics, Chemistry, and Biology concept videos with lab experiment simulations.",
            teacher: "Senior School Faculty",
            price: 2999,
            originalPrice: 6999,
          },
          {
            title: `Class ${selectedClass} Mathematics Mastery (${board})`,
            desc: "NCERT textbook exercises, mental maths shortcuts, and Olympiad foundation.",
            teacher: "Prof. S.K. Gupta",
            price: 2999,
            originalPrice: 6999,
          },
          {
            title: `Class ${selectedClass} Social Science & English (${board})`,
            desc: "Complete History, Civics, Geography, and Grammar with chapter-wise summary notes.",
            teacher: "Kavita Nambiar",
            price: 2499,
            originalPrice: 5999,
          },
        ];
      }

      return subjects.map((s, i) => ({
        id: `school-${selectedClass}-${i + 1}`,
        title: s.title,
        category: `${board} Academic`,
        duration: "Full Year 2026-27",
        level: `Class ${selectedClass}`,
        mode: "Live Classes + Recorded",
        price: s.price,
        originalPrice: s.originalPrice,
        instructor: s.teacher,
        instructorRole: "Board Evaluation Specialist",
        description: s.desc,
        highlights: [
          "Complete NCERT Line-by-Line Syllabus with Solved Exemplar",
          "Weekly Chapterwise Tests & Board Sample Papers",
          "24/7 AI Doubt Mentor for Homework & Exam Prep",
        ],
      }));
    }

    // UG or PG
    const degreeName = selectedCourse.split(" ")[0];
    const semSubjects = [
      {
        title: `${degreeName} Core Theory & Semester Solvers (Sem ${selectedSemester})`,
        desc: "University syllabus aligned lectures, previous 10 years question papers, and semester exam notes.",
        teacher: "Prof. R.K. Mehta (Ph.D)",
        price: 3999,
        originalPrice: 8999,
      },
      {
        title: `${degreeName} Practical Lab & Coding Assignments (Sem ${selectedSemester})`,
        desc: "Hands-on implementation, project codebases, and viva preparation questions.",
        teacher: "Er. Alok Sharma",
        price: 3499,
        originalPrice: 7999,
      },
      {
        title: `${degreeName} Major Term Project & Presentation Guidance`,
        desc: "Complete project documentation, architecture diagrams, and GitHub repository hosting.",
        teacher: "Industry Project Mentor",
        price: 3999,
        originalPrice: 8999,
      },
    ];

    return semSubjects.map((s, i) => ({
      id: `college-${degreeName}-${selectedSemester}-${i + 1}`,
      title: s.title,
      category: `${educationType.toUpperCase()} Degree Academic`,
      duration: `Semester ${selectedSemester} Track`,
      level: selectedCourse,
      mode: "Semester Intensive",
      price: s.price,
      originalPrice: s.originalPrice,
      instructor: s.teacher,
      instructorRole: "University Professor",
      description: s.desc,
      highlights: [
        "University-specific syllabus coverage with PYQ solutions",
        "Practical lab files, assignment solutions & viva guidance",
        "24/7 AI Doubt Mentor to explain derivations and code",
      ],
    }));
  };

  const handleCounselorSubmit = (e) => {
    e.preventDefault();
    if (!counselorForm.name || !counselorForm.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    setCounselorSubmitted(true);
    setTimeout(() => {
      setCounselorSubmitted(false);
      setShowCounselorModal(false);
      setCounselorForm({ name: "", phone: "", level: "School (CBSE)" });
    }, 2500);
  };

  return (
    <div className="bg-[#080E1A] min-h-screen text-slate-100 font-sans selection:bg-[#D4A017] selection:text-slate-950">
      {/* =========================================================================
          HERO SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#080E1A] border-b border-slate-800/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Academic & University Portal</span>
            </div>

            {/* 4 Step Tracker */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 text-xs">
              <button
                onClick={() => setStep(1)}
                className={`px-3 py-1 rounded-full transition font-bold ${
                  step === 1 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                1. Level
              </button>
              <span className="text-slate-600">→</span>
              <button
                onClick={() => setStep(2)}
                className={`px-3 py-1 rounded-full transition font-bold ${
                  step === 2 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                2. Board/Degree
              </button>
              <span className="text-slate-600">→</span>
              <button
                onClick={() => setStep(3)}
                className={`px-3 py-1 rounded-full transition font-bold ${
                  step === 3 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                3. Class/Sem
              </button>
              <span className="text-slate-600">→</span>
              <button
                onClick={() => setStep(4)}
                className={`px-3 py-1 rounded-full transition font-bold ${
                  step === 4 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                4. Courses
              </button>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto mt-10">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              CBSE, ICSE, State Boards & University Academic System
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Excel in Board & College Exams with <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Top Subject Masters & Solvers
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              NCERT line-by-line decoding for Class 9th to 12th, university semester theory lectures, solved assignments, lab vivas, and 24/7 instant AI Doubt resolution.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowCounselorModal(true)}
                className="bg-gradient-to-r from-[#D4A017] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-7 py-3.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <FaPhoneAlt className="text-xs" />
                Book Free Academic Counseling
              </button>

              <a
                href="https://wa.me/918810606010?text=Hi%2C+I+need+help+with+School+or+College+Academic+Courses"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center gap-2 border border-emerald-400/30"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp Academic Desk
              </a>

              {step > 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-3.5 rounded-xl text-sm transition border border-slate-700 flex items-center gap-2"
                >
                  <FaUndo className="text-xs" />
                  Reset View
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">99.2%</div>
                <div className="text-xs text-slate-400 mt-1">Board Pass Percentage</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">5,000+</div>
                <div className="text-xs text-slate-400 mt-1">Solved NCERT Video Lessons</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">100+</div>
                <div className="text-xs text-slate-400 mt-1">University Syllabi Covered</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">24/7</div>
                <div className="text-xs text-slate-400 mt-1">AI Homework Helper</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN INTERACTIVE CONTAINER
      ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* =====================================================================
            STEP 1: SELECT EDUCATION LEVEL
        ===================================================================== */}
        {step === 1 && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step 1 of 4</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Choose Your Academic Education Level
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Select whether you are preparing for School Boards (Class 9-12), Undergraduate college courses, or Postgraduate programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  id: "school",
                  title: "Schooling (Class 9 - 12)",
                  subtitle: "CBSE, ICSE & State Boards",
                  icon: FaBookOpen,
                  desc: "NCERT line-by-line concept clarity, Science, Maths, Commerce & Humanities board batches.",
                  badge: "Board Exam Toppers",
                  color: "from-blue-600 to-indigo-800",
                },
                {
                  id: "ug",
                  title: "Undergraduate (UG)",
                  subtitle: "B.Tech, BCA, BBA, B.Com, B.Sc",
                  icon: FaGraduationCap,
                  desc: "Semester theory, coding labs, previous year question papers, and major project guidance.",
                  badge: "Semester CGPA Booster",
                  color: "from-amber-600 to-yellow-800",
                },
                {
                  id: "pg",
                  title: "Postgraduate (PG)",
                  subtitle: "MBA, MCA, M.Tech, M.Com, M.Sc",
                  icon: FaUniversity,
                  desc: "Advanced specializations, corporate case studies, research methodologies, and placement prep.",
                  badge: "Master Degree Success",
                  color: "from-purple-600 to-indigo-950",
                },
              ].map((lvl) => {
                const IconComp = lvl.icon;
                return (
                  <div
                    key={lvl.id}
                    onClick={() => {
                      setEducationType(lvl.id);
                      setStep(2);
                    }}
                    className="group bg-[#0F172A] hover:bg-[#131E35] border border-slate-800 hover:border-amber-400/60 rounded-3xl p-7 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lvl.color} flex items-center justify-center text-white text-2xl shadow-md`}>
                          <IconComp />
                        </div>
                        <span className="text-[11px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full">
                          {lvl.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition">
                        {lvl.title}
                      </h3>
                      <div className="text-xs text-amber-400 font-bold mt-1">{lvl.subtitle}</div>
                      <p className="text-xs text-slate-300 mt-3 leading-relaxed">{lvl.desc}</p>
                    </div>

                    <button className="mt-6 w-full bg-slate-800 group-hover:bg-[#D4A017] text-slate-300 group-hover:text-slate-950 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2">
                      <span>Select Track</span>
                      <FaChevronRight className="text-[10px]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 2: SELECT BOARD / DEGREE
        ===================================================================== */}
        {step === 2 && (
          <div>
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-2xl transition"
                >
                  <FaUndo className="text-sm" />
                </button>
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase">
                    Level: {educationType.toUpperCase()}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {educationType === "school" ? "Select Your Education Board" : "Select Your Degree Program"}
                  </h2>
                </div>
              </div>
            </div>

            {educationType === "school" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { id: "CBSE", name: "CBSE Board", desc: "Central Board of Secondary Education (NCERT Based)" },
                  { id: "ICSE", name: "ICSE / ISC Board", desc: "Council for the Indian School Certificate Examinations" },
                  { id: "STATE", name: "State Board", desc: "State-specific board curriculum (UP, Bihar, Maharashtra, etc.)" },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBoard(b.id);
                      setStep(3);
                    }}
                    className="bg-[#0F172A] hover:bg-[#131E35] border border-slate-800 hover:border-amber-400/60 rounded-3xl p-8 text-left transition hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold text-white">{b.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{b.desc}</p>
                    <div className="mt-4 text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <span>Choose {b.name} →</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {(educationType === "ug" ? UG_COURSES : PG_COURSES).map((deg) => (
                  <button
                    key={deg}
                    onClick={() => {
                      setSelectedCourse(deg);
                      setStep(3);
                    }}
                    className="bg-[#0F172A] hover:bg-[#131E35] border border-slate-800 hover:border-amber-400/60 rounded-2xl p-5 text-left transition hover:-translate-y-1"
                  >
                    <div className="text-sm font-bold text-white">{deg}</div>
                    <div className="text-[11px] text-amber-400 mt-2 font-semibold">View Semesters →</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            STEP 3: SELECT CLASS / SEMESTER
        ===================================================================== */}
        {step === 3 && (
          <div>
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-2xl transition"
                >
                  <FaUndo className="text-sm" />
                </button>
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase">
                    {educationType === "school" ? `${board} Board` : selectedCourse}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {educationType === "school" ? "Select Your Class & Stream" : "Select Your Semester"}
                  </h2>
                </div>
              </div>
            </div>

            {educationType === "school" ? (
              <div className="space-y-8 max-w-4xl mx-auto">
                {board === "STATE" && !selectedState && (
                  <div>
                    <h3 className="text-base font-bold text-white mb-4">Choose State Board:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {INDIAN_STATES.map((st) => (
                        <button
                          key={st}
                          onClick={() => setSelectedState(st)}
                          className="bg-[#0F172A] hover:bg-slate-800 p-3 rounded-xl border border-slate-800 text-xs font-bold text-slate-200"
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-white mb-4">Choose Class:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["9", "10", "11", "12"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedClass(c)}
                        className={`p-5 rounded-2xl font-black text-lg transition border ${
                          selectedClass === c
                            ? "bg-[#D4A017] text-slate-950 border-amber-400 shadow-md"
                            : "bg-[#0F172A] text-white border-slate-800 hover:bg-slate-800"
                        }`}
                      >
                        Class {c}th
                      </button>
                    ))}
                  </div>
                </div>

                {(selectedClass === "11" || selectedClass === "12") && (
                  <div>
                    <h3 className="text-base font-bold text-white mb-4">Choose Stream:</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {["Science", "Commerce", "Humanities"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStream(s)}
                          className={`p-4 rounded-2xl font-bold text-sm transition border ${
                            stream === s
                              ? "bg-[#D4A017] text-slate-950 border-amber-400 shadow-md"
                              : "bg-[#0F172A] text-white border-slate-800 hover:bg-slate-800"
                          }`}
                        >
                          {s} Stream
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep(4)}
                  className="w-full bg-gradient-to-r from-[#D4A017] to-amber-500 text-slate-950 font-black py-4 rounded-2xl text-sm transition shadow-lg"
                >
                  View Class {selectedClass}th Courses →
                </button>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                <h3 className="text-base font-bold text-white mb-4">Choose Semester:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
                    <button
                      key={sem}
                      onClick={() => {
                        setSelectedSemester(sem);
                        setStep(4);
                      }}
                      className="bg-[#0F172A] hover:bg-[#131E35] border border-slate-800 hover:border-amber-400/60 rounded-2xl p-6 text-center transition hover:-translate-y-1"
                    >
                      <div className="text-2xl font-black text-amber-400">Sem {sem}</div>
                      <div className="text-xs text-slate-400 mt-1">View Subjects →</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            STEP 4: SUBJECT COURSES GRID USING COURSECARD
        ===================================================================== */}
        {step === 4 && (
          <div>
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-2xl transition"
                >
                  <FaUndo className="text-sm" />
                </button>
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase">
                    {educationType === "school"
                      ? `${board} Board • Class ${selectedClass}th (${stream})`
                      : `${selectedCourse} • Semester ${selectedSemester}`}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Available Subject Batches
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                Change Level / Board
              </button>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getSubjectCourses().map((course) => (
                <div key={course.id} className="relative flex flex-col justify-between">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            {/* Bottom Support Callout */}
            <div className="mt-12 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-lg">
                  <FaRegLightbulb />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">Need a customized all-subject combination package?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bundle all your subjects together and save up to 40% with personalized teacher doubt sessions.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCounselorModal(true)}
                className="bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs whitespace-nowrap"
              >
                Request Bundle Scholarship
              </button>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          COUNSELOR MODAL
      ========================================================================= */}
      {showCounselorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowCounselorModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              <FaTimes />
            </button>

            {counselorSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-white">Request Received!</h4>
                <p className="text-xs text-slate-300">
                  Our academic counselor will call you within 15 minutes to guide you on syllabus and discount bundles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCounselorSubmit} className="space-y-4">
                <div className="text-xs font-bold text-amber-400 uppercase">Academic Support Desk</div>
                <h4 className="text-xl font-black text-white">Speak to an Academic Advisor</h4>
                <p className="text-xs text-slate-400">
                  Get personalized guidance on board exams, semester papers, or bundle scholarships.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Sharma"
                      value={counselorForm.name}
                      onChange={(e) => setCounselorForm({ ...counselorForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Phone Number / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 92665 00223"
                      value={counselorForm.phone}
                      onChange={(e) => setCounselorForm({ ...counselorForm, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Education Level</label>
                    <select
                      value={counselorForm.level}
                      onChange={(e) => setCounselorForm({ ...counselorForm, level: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="School (CBSE)">School (CBSE Board)</option>
                      <option value="School (ICSE)">School (ICSE Board)</option>
                      <option value="School (State)">School (State Board)</option>
                      <option value="UG Degree">Undergraduate Degree (B.Tech, BCA, BBA, B.Com)</option>
                      <option value="PG Degree">Postgraduate Degree (MBA, MCA, M.Tech)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs transition"
                  >
                    Request Free Academic Call
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
