import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaShieldAlt,
  FaBookOpen,
  FaTrain,
  FaLandmark,
  FaBalanceScale,
  FaAward,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaUsers,
  FaWhatsapp,
  FaPhoneAlt,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaUndo,
  FaTimes,
  FaUserTie,
  FaRegLightbulb,
  FaBuilding,
} from "react-icons/fa";
import CourseCard from "../components/course/CourseCard";
import Footer from "../components/Footer";

// ==========================================
// BATCH TIER DEFINITIONS
// ==========================================
const BATCH_TIERS = [
  {
    id: "all",
    label: "All Batches",
    desc: "Comprehensive foundation, target ranker & speed batches",
  },
  {
    id: "foundation-1yr",
    label: "1-2 Year Foundation (Zero to Officer)",
    desc: "Complete conceptual syllabus coverage from scratch with daily answer writing.",
  },
  {
    id: "target-batch",
    label: "Mission Ranker Batch",
    desc: "Intensive 6-8 month batch with high-speed problem solving and previous year questions.",
  },
  {
    id: "crash-test",
    label: "90-Day Fastrack & Test Series",
    desc: "Rapid revision, current affairs compendiums, and full-length CBT mock drills.",
  },
];

// ==========================================
// COMPETITION EXAM DOMAINS & BATCHES
// ==========================================
const COMPETITION_DOMAINS = [
  {
    id: "upsc",
    title: "UPSC Civil Services (IAS / IPS / IFS)",
    shortName: "UPSC CSE",
    category: "Civil Services",
    icon: FaLandmark,
    badge: "Officer Mentorship",
    color: "from-amber-600 to-yellow-800",
    leadDesc:
      "Premier Civil Services examination program guided by retired civil servants and top GS educators. Full Prelims (GS + CSAT), Mains (GS I-IV, Essay) and one-on-one DAF interview personality guidance.",
    eligibility: "Any Graduate (Age: 21 - 32 years)",
    popularBatch: "UPSC IAS Foundation 2026-27",
    batches: [
      {
        id: "upsc-foundation",
        tierId: "foundation-1yr",
        title: "UPSC IAS Comprehensive Prelims + Mains (GS Foundation)",
        subtitle: "Complete GS Papers I, II, III, IV + CSAT + Daily Mains Answer Writing + Mentorship",
        category: "Civil Services",
        duration: "18 Months",
        level: "Graduates / Final Year",
        mode: "Live Interactive + Recorded",
        price: 29999,
        originalPrice: 69999,
        instructor: "Dr. K.V. Subramanian (Ex-IAS Mentor) & Team",
        instructorRole: "20+ Yrs Training UPSC Rankers",
        highlights: [
          "900+ Hours Live Sessions covering NCERTs & standard reference texts",
          "Daily Mains Answer Writing with individual faculty evaluation",
          "Comprehensive Prelims Test Series (60 Mocks) + CSAT Masterclass",
        ],
        description:
          "Zero-to-officer foundation batch covering History, Geography, Polity & Governance, Economy, Environment, Science & Tech, Ethics, Integrity & Aptitude, and Monthly Current Affairs.",
        curriculum: [
          {
            subject: "GS Paper I (History, Heritage & Geography)",
            topics: [
              "Ancient, Medieval & Modern Indian History (Freedom Struggle)",
              "Indian Art, Culture, Architecture & Literature",
              "World History & Post-Independence Consolidation",
              "Physical, Social & Economic Geography of India and World",
              "Indian Society: Diversity, Globalization, Women & Urbanization",
            ],
          },
          {
            subject: "GS Paper II (Polity, Constitution & Governance)",
            topics: [
              "Indian Constitution: Historical Underpinnings, Features & Amendments",
              "Functions and Responsibilities of the Union and the States",
              "Parliament and State Legislatures: Structure, Functioning & Powers",
              "Statutory, Regulatory and various Quasi-judicial bodies",
              "Government Policies, Welfare Schemes & International Relations",
            ],
          },
          {
            subject: "GS Paper III (Economy, Environment & Security)",
            topics: [
              "Indian Economy and issues relating to Planning, Growth & Employment",
              "Inclusive Growth, Budgeting & Major Crop Patterns/Irrigation",
              "Science & Technology Developments & Everyday Applications",
              "Environmental Conservation, Climate Change & Disaster Management",
              "Internal Security Challenges: Cyber Security, Border Areas & Terrorism",
            ],
          },
          {
            subject: "GS Paper IV (Ethics, Integrity & Aptitude)",
            topics: [
              "Ethics and Human Interface: Essence, Determinants & Consequences",
              "Human Values: Lessons from Leaders, Reformers and Administrators",
              "Attitude, Emotional Intelligence & Foundational Values for Civil Service",
              "Probity in Governance, Citizen's Charters & Right to Information",
              "Real-world Ethical Dilemmas & Case Studies Analysis",
            ],
          },
          {
            subject: "CSAT (Paper II Qualifying)",
            topics: [
              "Comprehension & Interpersonal Skills",
              "Logical Reasoning and Analytical Ability",
              "Decision Making and Problem Solving",
              "Basic Numeracy & Data Interpretation (Class X Level)",
            ],
          },
        ],
      },
      {
        id: "upsc-prelims-booster",
        tierId: "crash-test",
        title: "UPSC Prelims 120-Day Target Crash Course & All India Mocks",
        subtitle: "High-Yield Topics • Static + Current Affairs Revision • 50 GS & CSAT Mocks",
        category: "Civil Services",
        duration: "4 Months",
        level: "UPSC Aspirants",
        mode: "Daily Live Drills",
        price: 9999,
        originalPrice: 24999,
        instructor: "Senior UPSC Civil Service Faculty Panel",
        instructorRole: "Specialized Prelims Mentors",
        highlights: [
          "Coverage of 1,000+ most probable topics across static & current events",
          "Option elimination techniques and negative marking reduction drills",
          "50 Full-length GS & CSAT Simulated Mock Tests with national percentile ranking",
        ],
        description:
          "Intensive crash course to sail through the most unpredictable stage of the exam. Focuses on high-scoring areas, environment conventions, mapping, and budget/economic survey.",
        curriculum: [
          {
            subject: "Prelims Sprint Modules",
            topics: [
              "Polity Articles, Landmark Supreme Court Judgments & Amendments",
              "Modern History Chronology & Freedom Movements",
              "National Parks, Ramsar Sites, Wildlife Sanctuaries & Rivers Mapping",
              "Union Budget, Economic Survey & Government Schemes",
              "Science & Technology: Space, Defense, Biotech, AI, Semiconductor",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ssc",
    title: "SSC CGL / CHSL / CPO",
    shortName: "SSC Exams",
    category: "Staff Selection Commission",
    icon: FaBuilding,
    badge: "10,000+ Selections",
    color: "from-blue-600 to-indigo-900",
    leadDesc:
      "Complete preparation for SSC Combined Graduate Level (CGL), CHSL (10+2), CPO and MTS. Specialized training in Speed Mathematics, Advanced Grammar, Reasoning, and Tier 2 Computer Knowledge.",
    eligibility: "Graduates / 12th Pass (Age: 18 - 30 years)",
    popularBatch: "SSC CGL Mission Inspector Batch 2026",
    batches: [
      {
        id: "ssc-cgl-target",
        tierId: "foundation-1yr",
        title: "SSC CGL Complete Tier 1 + Tier 2 All-in-One Master Batch",
        subtitle: "Quant Speed Tricks + English + Reasoning + GS + Computer & Typing Test",
        category: "Staff Selection Commission",
        duration: "12 Months",
        level: "Graduates / Final Year",
        mode: "Live Interactive + Recorded",
        price: 8999,
        originalPrice: 19999,
        instructor: "Rakesh Sir & SSC Topper Faculty",
        instructorRole: "Renowned Maths & English SSC Coaches",
        highlights: [
          "Arithmetic + Advanced Maths with zero-pen calculation tricks",
          "Complete coverage of Tier 1 & Tier 2 latest exam pattern",
          "120+ Computer Based Mock Tests with instant ranking",
        ],
        description:
          "Aim for top central government posts (ASO in CSS, Income Tax Inspector, GST Inspector, Excise, CBI Sub-Inspector) with complete concept clarity and speed mastery.",
        curriculum: [
          {
            subject: "Quantitative Aptitude (Arithmetic & Advance)",
            topics: [
              "Percentage, Profit & Loss, Discount & Partnership",
              "Simple & Compound Interest, Ratio & Proportion",
              "Time & Work, Pipes & Cisterns, Speed, Time & Distance",
              "Algebra: Identities, Linear & Quadratic Equations",
              "Geometry: Lines, Angles, Triangles, Circles, Quadrilaterals",
              "Mensuration 2D & 3D, Trigonometry & Height and Distances",
              "Coordinate Geometry & Data Interpretation",
            ],
          },
          {
            subject: "English Language & Comprehension",
            topics: [
              "Grammar Rules: Noun, Pronoun, Verb, Adverb, Preposition, Tenses",
              "Voice (Active/Passive) & Direct/Indirect Speech",
              "Vocabulary: Synonyms, Antonyms, One-Word Substitution, Idioms",
              "Cloze Test, Sentence Rearrangement (Para Jumbles) & Comprehension",
            ],
          },
          {
            subject: "General Intelligence & Reasoning",
            topics: [
              "Analogy, Classification & Series (Number & Alphabet)",
              "Coding-Decoding, Blood Relations & Direction Sense",
              "Syllogisms, Venn Diagrams & Mathematical Operations",
              "Non-Verbal Reasoning: Paper Folding, Mirror Images, Embedded Figures",
            ],
          },
          {
            subject: "General Awareness & Computer Proficiency",
            topics: [
              "History, Polity, Geography, Economics & General Science",
              "Yearly Current Affairs & Static GK Compendium",
              "Computer Fundamentals, MS Office, Internet, Security & Networking",
            ],
          },
        ],
      },
      {
        id: "ssc-chsl-fastrack",
        tierId: "target-batch",
        title: "SSC CHSL & MTS 6-Month Target Rank Batch",
        subtitle: "Tier 1 & Tier 2 Combined • High-Yield Math Formulas • 80 Mock Tests",
        category: "Staff Selection Commission",
        duration: "6 Months",
        level: "10+2 / Graduates",
        mode: "Daily Live Sessions",
        price: 5499,
        originalPrice: 12999,
        instructor: "Dizital Adda SSC Expert Faculty",
        instructorRole: "SSC CHSL Top Mentors",
        highlights: [
          "Special focus on clerical cadre, LDC, JSA and DEO selections",
          "Daily topic-wise tests with 30-second shortcut techniques",
          "English vocabulary flashcards and grammar formula sheets",
        ],
        description:
          "High-efficiency program targeting Central Government 10+2 clerical posts with guaranteed speed building.",
        curriculum: [
          {
            subject: "CHSL Complete Syllabus",
            topics: [
              "Quant: Arithmetic Essentials & Speed Math Workouts",
              "English: High-Frequency 1000 Words & Spotting Errors",
              "Reasoning: Logic Puzzles & Matrix Solving",
              "GS: Quick Static GK Handbook & Science Basics",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "banking",
    title: "Banking & Insurance (IBPS / SBI / RBI)",
    shortName: "Bank PO & Clerk",
    category: "Banking & Insurance",
    icon: FaUniversity,
    badge: "Highest Selection Ratio",
    color: "from-emerald-700 to-teal-900",
    leadDesc:
      "Crack SBI PO, IBPS PO, SBI Clerk, IBPS Clerk, RRB and RBI Grade B. Complete focus on high-level reasoning puzzles, data interpretation caselets, banking and financial awareness, and interview preparation.",
    eligibility: "Any Graduate (Age: 20 - 30 years)",
    popularBatch: "Bank PO & Clerk Complete Super 60",
    batches: [
      {
        id: "bank-po-all",
        tierId: "foundation-1yr",
        title: "Complete Banking & Insurance All-in-One Super Foundation",
        subtitle: "SBI PO/Clerk + IBPS PO/Clerk + RRB + RBI Assistant • Prelims to Interview",
        category: "Banking & Insurance",
        duration: "12 Months",
        level: "Graduates / Final Year",
        mode: "Live Interactive + Speed Labs",
        price: 8999,
        originalPrice: 21999,
        instructor: "Anurag Mishra (Ex-SBI PO) & Team",
        instructorRole: "12+ Yrs Bank Training Exp",
        highlights: [
          "Daily 2 hours speed calculation and Vedic maths drills",
          "High-level puzzle solving techniques for SBI/IBPS Mains",
          "Banking Awareness, RBI Monetary Policies & Financial Budget modules",
        ],
        description:
          "Comprehensive preparation for all national bank exams in a single batch. Covers Prelims speed, Mains depth, Descriptive English writing, and Panel Mock Interviews.",
        curriculum: [
          {
            subject: "Reasoning Ability & High-Level Puzzles",
            topics: [
              "Seating Arrangement (Linear, Circular, Square, Floor, Box)",
              "Multi-Variable Puzzles & Uncertain Number of Persons",
              "Syllogisms (Only a Few, Reverse Syllogism)",
              "Inequalities, Coding-Decoding (New Pattern) & Input-Output",
              "Critical Reasoning: Course of Action, Cause & Effect, Assumptions",
            ],
          },
          {
            subject: "Quantitative Aptitude & Data Interpretation (DI)",
            topics: [
              "Vedic Maths, Approximations & Quadratic Equations",
              "Number Series (Missing & Wrong Term)",
              "Data Interpretation: Bar, Pie, Radar, Caselet & Missing DI",
              "Data Sufficiency & Arithmetic Applications",
            ],
          },
          {
            subject: "English Language & Descriptive Writing",
            topics: [
              "Reading Comprehension (Financial, Economic & Editorial passages)",
              "Sentence Connectors, Starters & Error Detection",
              "Descriptive Essay Writing & Formal Letter Writing for Bank Mains",
            ],
          },
          {
            subject: "Banking, Financial & Economic Awareness",
            topics: [
              "RBI: History, Functions, Monetary Policy & Instruments",
              "Banking Terms: Repo Rate, Reverse Repo, CRR, SLR, NPA, Basel Norms",
              "Financial Markets, Payment Systems (UPI, NEFT, RTGS) & Budget",
              "Last 6 Months Current Banking & Economic Affairs",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "railways",
    title: "Railways (RRB NTPC / Group D / ALP)",
    shortName: "RRB Railways",
    category: "Railway Recruitment Board",
    icon: FaTrain,
    badge: "1 Lakh+ Vacancy Target",
    color: "from-red-600 to-amber-900",
    leadDesc:
      "Targeted preparation for Indian Railways RRB NTPC (Graduate & Under Graduate), Group D, Assistant Loco Pilot (ALP), and RRB Junior Engineer. Complete coverage of General Science, Arithmetic, and Technical trade basics.",
    eligibility: "10th / 12th / ITI / Diploma / Degree",
    popularBatch: "RRB NTPC & Group D Vijay Batch",
    batches: [
      {
        id: "rrb-ntpc-master",
        tierId: "foundation-1yr",
        title: "RRB NTPC & Group D Comprehensive CBT 1 & CBT 2 Batch",
        subtitle: "General Science + Mathematics + General Intelligence + 100 CBT Mocks",
        category: "Railway Recruitment Board",
        duration: "8 Months",
        level: "10th / 12th / Degree",
        mode: "Live Interactive + Recorded",
        price: 5999,
        originalPrice: 14999,
        instructor: "Er. Sunil Kumar & Railway Educators",
        instructorRole: "Ex-Railway Training Specialist",
        highlights: [
          "Physics, Chemistry & Biology with NCERT experimental diagrams",
          "Railway specific previous 20-year question bank with explanations",
          "Special focus on speed and negative marking avoidance",
        ],
        description:
          "Target Station Master, Goods Guard, Senior Clerk, Junior Accounts Assistant, Commercial Apprentice, and Group D posts with exhaustive CBT 1 & 2 preparation.",
        curriculum: [
          {
            subject: "Mathematics for Railways",
            topics: [
              "Number System, Decimals, Fractions, LCM & HCF",
              "Ratio & Proportion, Percentages, Mensuration, Time & Work",
              "Time & Distance, Simple and Compound Interest, Profit & Loss",
              "Elementary Algebra, Geometry & Trigonometry, Elementary Statistics",
            ],
          },
          {
            subject: "General Intelligence & Reasoning",
            topics: [
              "Analogies, Completion of Number and Alphabetical Series",
              "Coding and Decoding, Mathematical Operations, Similarities",
              "Relationships, Analytical Reasoning, Syllogism, Jumbling",
              "Venn Diagrams, Puzzle, Data Sufficiency, Statement- Conclusion",
            ],
          },
          {
            subject: "General Science & Awareness",
            topics: [
              "Class 10th CBSE General Science (Physics, Chemistry, Life Sciences)",
              "Current Events of National and International Importance",
              "Games and Sports, Art and Culture of India, Indian Literature",
              "Indian History, Freedom Struggle, Indian Economy, Monuments and Places",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "state-pcs",
    title: "State PCS (BPSC / UPPCS / RAS / MPPSC)",
    shortName: "State Civil Services",
    category: "State Public Service Commission",
    icon: FaBalanceScale,
    badge: "SDM & DSP Mission",
    color: "from-purple-700 to-indigo-950",
    leadDesc:
      "State-specific civil service preparation for Bihar Public Service Commission (BPSC), Uttar Pradesh PSC (UPPCS), Rajasthan (RAS), and MPPSC. Specialized modules for State History, Geography, Budget, Economy, and Prelims+Mains answer writing.",
    eligibility: "Any Graduate (Age: 21 - 40 years)",
    popularBatch: "BPSC & UPPCS Combined Officer Batch",
    batches: [
      {
        id: "state-pcs-comprehensive",
        tierId: "foundation-1yr",
        title: "State PCS (UPPCS & BPSC) Comprehensive Prelims + Mains",
        subtitle: "General Studies + State Special GK & Current Affairs + Essay & Hindi",
        category: "State Public Service Commission",
        duration: "14 Months",
        level: "Graduates / Aspirants",
        mode: "Live Interactive + State Special Notes",
        price: 18999,
        originalPrice: 45999,
        instructor: "Senior State PCS Mentors Panel",
        instructorRole: "Ex-State Civil Service Educators",
        highlights: [
          "State-specific history, art, culture, geography, and economy in high detail",
          "Dedicated Hindi paper preparation and Essay writing mastery",
          "Previous 15 years solved papers with step-by-step model answers",
        ],
        description:
          "Designed to crack Deputy Collector (SDM), Deputy SP (DSP), Block Development Officer (BDO), and Commercial Tax Officer in prestigious state services.",
        curriculum: [
          {
            subject: "State Special Knowledge & Heritage",
            topics: [
              "History of the State & Freedom Movement Contribution",
              "Physical, Social & Agricultural Geography of the State",
              "State Economy, Industrial Policy, Mineral Wealth & Budget",
              "Folk Music, Art, Architecture, Festivals & Tourism",
            ],
          },
          {
            subject: "General Studies Papers (Prelims + Mains)",
            topics: [
              "Indian History & National Movement",
              "Indian and World Geography - Physical, Social, Economic",
              "Indian Polity & Governance - Constitution, Political System",
              "General Science, Environmental Ecology & Climate Issues",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "defence-police",
    title: "Defence & Police Services (CDS / AFCAT / SI / Constable)",
    shortName: "Defence & Police",
    category: "Uniformed Services",
    icon: FaShieldAlt,
    badge: "Uniform of Pride",
    color: "from-slate-700 to-zinc-900",
    leadDesc:
      "Coaching for Combined Defence Services (CDS), Air Force Common Admission Test (AFCAT), Central Armed Police Forces (CAPF AC), Delhi Police SI, and UP Police Sub-Inspector. Written syllabus, mental aptitude, and physical fitness guidelines.",
    eligibility: "12th Pass / Graduates",
    popularBatch: "Police Sub-Inspector & CDS Master Batch",
    batches: [
      {
        id: "police-si-master",
        tierId: "foundation-1yr",
        title: "Police Sub-Inspector & Constable All-State Master Course",
        subtitle: "Hindi / English + General Studies + Numerical & Mental Ability + Law Basics",
        category: "Uniformed Services",
        duration: "8 Months",
        level: "12th / Graduates",
        mode: "Live Interactive + Physical Prep Guide",
        price: 6999,
        originalPrice: 16999,
        instructor: "Ex-Police Officers & Competitive Mentors",
        instructorRole: "Specialized Police Force Trainers",
        highlights: [
          "Basic IPC, CrPC & Constitution provisions required for SI examinations",
          "Daily speed reasoning & mental alertness drills",
          "50 Full-length mock tests aligned with state police exam patterns",
        ],
        description:
          "Prepare for prestigious Two-Star Sub-Inspector posts across Delhi, Uttar Pradesh, Bihar, Haryana, and Rajasthan police departments.",
        curriculum: [
          {
            subject: "General Hindi / English",
            topics: [
              "Hindi Vyakaran: Sandhi, Samas, Tatsam-Tadbhav, Paryayvachi, Vilom",
              "Vakya Shodhan, Ras, Chhand, Alankar & Comprehension",
            ],
          },
          {
            subject: "Law & Constitution Basics",
            topics: [
              "Indian Constitution & Fundamental Rights/Duties",
              "Basic Knowledge of Indian Penal Code & Human Rights",
              "Traffic Rules, National Security & Women/Child Protection Acts",
            ],
          },
          {
            subject: "Numerical & Mental Ability",
            topics: [
              "Arithmetic Shortcut Tricks & Percentage/Ratio Applications",
              "Logical Diagrams, Coding-Decoding & Direction Sense",
              "Mental Aptitude: Public Interest, Law & Order, Crime Control",
            ],
          },
        ],
      },
    ],
  },
];

// Flat list of all competition courses for card rendering
const ALL_COMPETITION_COURSES = COMPETITION_DOMAINS.flatMap((dom) =>
  dom.batches.map((batch) => ({
    ...batch,
    domainId: dom.id,
    domainName: dom.shortName,
  }))
);

// ==========================================
// MAIN COMPETITION PORTAL COMPONENT
// ==========================================
export default function Competition() {
  const navigate = useNavigate();

  // Multi-step state: 1: Domains, 2: CourseCard batches, 3: Deep Dive
  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState(COMPETITION_DOMAINS[0]);
  const [selectedBatchTier, setSelectedBatchTier] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Step 3 Deep Dive Tab State
  const [activeTab, setActiveTab] = useState("curriculum"); // curriculum | mocktests | aiDoubt | faculty | fees
  const [curriculumSearch, setCurriculumSearch] = useState("");
  const [expandedSubjectIdx, setExpandedSubjectIdx] = useState(0);

  // Counselor Modal
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [counselorForm, setCounselorForm] = useState({ name: "", phone: "", exam: "UPSC" });

  const displayedCourses = ALL_COMPETITION_COURSES.filter((c) => {
    const matchDomain = selectedDomain ? c.domainId === selectedDomain.id : true;
    const matchTier = selectedBatchTier === "all" ? true : c.tierId === selectedBatchTier;
    const matchSearch =
      searchQuery.trim() === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDomain && matchTier && matchSearch;
  });

  const handleSelectDomain = (domain) => {
    setSelectedDomain(domain);
    setSelectedBatchTier("all");
    setStep(2);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setActiveTab("curriculum");
    setExpandedSubjectIdx(0);
    setCurriculumSearch("");
    setStep(3);
    window.scrollTo({ top: 350, behavior: "smooth" });
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
      setCounselorForm({ name: "", phone: "", exam: "UPSC" });
    }, 2500);
  };

  return (
    <div className="bg-[#080E1A] min-h-screen text-slate-100 font-sans selection:bg-[#D4A017] selection:text-slate-950">
      {/* =========================================================================
          HERO SECTION (Classical Navy + Gold Accents + Live Stats)
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#080E1A] border-b border-slate-800/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Glows */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb & Step Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Government Competition Portal</span>
            </div>

            {/* Step Tracker */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 text-xs">
              <button
                onClick={() => setStep(1)}
                className={`px-3 py-1 rounded-full transition font-bold flex items-center gap-1.5 ${
                  step === 1 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>1</span>
                <span>Select Govt Exam</span>
              </button>
              <span className="text-slate-600">→</span>
              <button
                onClick={() => setStep(2)}
                className={`px-3 py-1 rounded-full transition font-bold flex items-center gap-1.5 ${
                  step === 2 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>2</span>
                <span>Select Target Batch</span>
              </button>
              <span className="text-slate-600">→</span>
              <button
                disabled={!selectedCourse}
                onClick={() => selectedCourse && setStep(3)}
                className={`px-3 py-1 rounded-full transition font-bold flex items-center gap-1.5 ${
                  step === 3
                    ? "bg-[#D4A017] text-slate-950 shadow-md"
                    : selectedCourse
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 cursor-not-allowed"
                }`}
              >
                <span>3</span>
                <span>Syllabus & Test Series</span>
              </button>
            </div>
          </div>

          {/* Hero Main */}
          <div className="text-center max-w-4xl mx-auto mt-10">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              National Government Examination Ecosystem
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Achieve Your Dream Government Job with <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Bureaucrats & Elite Educators
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive courses for UPSC Civil Services, SSC CGL/CHSL, Banking PO/Clerk, Railways RRB, State PCS & Defence. Daily live classes, speed maths, monthly current affairs & 24/7 AI Doubt Mentor.
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowCounselorModal(true)}
                className="bg-gradient-to-r from-[#D4A017] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-7 py-3.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <FaPhoneAlt className="text-xs" />
                Book Free Govt Job Counseling
              </button>

              <a
                href="https://wa.me/918810606010?text=Hi%2C+I+want+guidance+for+Government+Competitive+Exams"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center gap-2 border border-emerald-400/30"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp Mentor
              </a>

              {step > 1 && (
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedCourse(null);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-3.5 rounded-xl text-sm transition border border-slate-700 flex items-center gap-2"
                >
                  <FaUndo className="text-xs" />
                  Reset View
                </button>
              )}
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">65,000+</div>
                <div className="text-xs text-slate-400 mt-1">Active Aspirants</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">12,400+</div>
                <div className="text-xs text-slate-400 mt-1">Final Selections</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">500+</div>
                <div className="text-xs text-slate-400 mt-1">Computer Based Mocks</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">24/7</div>
                <div className="text-xs text-slate-400 mt-1">AI Doubt Resolution</div>
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
            STEP 1: SELECT EXAM DOMAIN
        ===================================================================== */}
        {step === 1 && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Select Your Target Government Examination
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Choose your desired service commission to view dedicated foundation batches, live problem drills, current affairs notes, and all-India test series.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPETITION_DOMAINS.map((domain) => {
                const IconComponent = domain.icon;
                return (
                  <div
                    key={domain.id}
                    onClick={() => handleSelectDomain(domain)}
                    className="group bg-[#0F172A] hover:bg-[#131E35] border border-slate-800 hover:border-amber-400/60 rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center text-white text-xl shadow-md`}>
                          <IconComponent />
                        </div>
                        <span className="text-[11px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full">
                          {domain.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition">
                        {domain.title}
                      </h3>
                      <div className="text-xs text-slate-400 mt-1 font-semibold">{domain.category}</div>

                      <p className="text-xs text-slate-300 mt-4 line-clamp-3 leading-relaxed">
                        {domain.leadDesc}
                      </p>

                      {/* Info Pills */}
                      <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Eligibility:</span>
                          <span className="font-bold text-slate-200">{domain.eligibility}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Active Batches:</span>
                          <span className="font-bold text-amber-400">{domain.batches.length} Programs Available</span>
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full bg-slate-800 group-hover:bg-[#D4A017] text-slate-300 group-hover:text-slate-950 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2">
                      <span>Explore {domain.shortName} Batches</span>
                      <FaChevronRight className="text-[10px]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 2: SELECT PROGRAM BATCH / COURSE CARDS GRID
        ===================================================================== */}
        {step === 2 && (
          <div>
            {/* Active Header */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-2xl transition"
                  title="Back to all exams"
                >
                  <FaUndo className="text-sm" />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <span>Active Commission</span>
                    <span>•</span>
                    <span>{selectedDomain.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {selectedDomain.title} Batches
                  </h2>
                </div>
              </div>

              {/* Commission Switcher */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 font-bold">Switch Exam:</label>
                <select
                  value={selectedDomain.id}
                  onChange={(e) => {
                    const found = COMPETITION_DOMAINS.find((d) => d.id === e.target.value);
                    if (found) setSelectedDomain(found);
                  }}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold py-2 px-3 rounded-xl focus:outline-none focus:border-amber-400"
                >
                  {COMPETITION_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                {BATCH_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedBatchTier(tier.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      selectedBatchTier === tier.id
                        ? "bg-[#D4A017] text-slate-950 shadow-md"
                        : "bg-[#0F172A] text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  placeholder="Search exam batch or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F172A] border border-slate-800 text-slate-200 placeholder:text-slate-500 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Course Cards Grid */}
            {displayedCourses.length === 0 ? (
              <div className="text-center py-16 bg-[#0F172A] rounded-3xl border border-slate-800">
                <div className="text-4xl text-slate-600 mb-3">🔍</div>
                <h3 className="text-lg font-bold text-white">No Batches Found</h3>
                <p className="text-xs text-slate-400 mt-1">Try switching the batch filter or clearing search.</p>
                <button
                  onClick={() => {
                    setSelectedBatchTier("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedCourses.map((course) => (
                  <div key={course.id} className="relative flex flex-col justify-between">
                    <CourseCard course={course} />
                    <button
                      onClick={() => handleSelectCourse(course)}
                      className="mt-2.5 w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2.5 rounded-2xl text-xs border border-slate-800 hover:border-amber-400/40 transition flex items-center justify-center gap-1.5"
                    >
                      <FaBookOpen className="text-xs" />
                      <span>View Detailed Syllabus & Topics →</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            STEP 3: COMPLETE PROGRAM DEEP DIVE (Curriculum, AI Mentor, Faculty, Fees)
        ===================================================================== */}
        {step === 3 && selectedCourse && (
          <div className="space-y-8">
            {/* Top Selected Course Banner */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <button
                  onClick={() => setStep(2)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  <FaUndo className="text-xs" />
                  Back to Batches
                </button>
                <span className="text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full">
                  Exam Detailed Prospectus
                </span>
              </div>

              <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {selectedCourse.category} • {selectedCourse.duration}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                <div className="bg-[#131E35] border border-slate-700/80 p-5 rounded-2xl text-center lg:min-w-[240px] shrink-0">
                  <div className="text-xs text-slate-400 line-through">
                    ₹{selectedCourse.originalPrice?.toLocaleString("en-IN")}
                  </div>
                  <div className="text-3xl font-black text-amber-400 mt-0.5">
                    ₹{selectedCourse.price?.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold mt-1">
                    EMI starts at ₹{Math.round(selectedCourse.price / 6).toLocaleString("en-IN")}/mo
                  </div>
                  <button
                    onClick={() => setShowCounselorModal(true)}
                    className="mt-4 w-full bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition"
                  >
                    Enroll / Request Callback
                  </button>
                </div>
              </div>
            </div>

            {/* Deep-Dive Navigation Tabs */}
            <div className="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-bold">
              {[
                { id: "curriculum", label: "Subject-Wise Detailed Syllabus" },
                { id: "mocktests", label: "CBT Mock Tests & PYQs" },
                { id: "aiDoubt", label: "24/7 AI Doubt Mentor & Player" },
                { id: "faculty", label: "Officer Mentors & Educators" },
                { id: "fees", label: "Fee Structure & Installments" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-5 rounded-t-2xl whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? "bg-[#0F172A] text-amber-400 border-t-2 border-amber-400 border-x border-slate-800"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: CURRICULUM */}
            {activeTab === "curriculum" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Full Subject-Wise Syllabus Breakdown</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Targeted preparation matching the official examination notifications and question weightages.
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search subject or chapter..."
                    value={curriculumSearch}
                    onChange={(e) => setCurriculumSearch(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-slate-200 text-xs px-4 py-2 rounded-xl focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-4">
                  {selectedCourse.curriculum?.map((subj, idx) => {
                    const filteredTopics = subj.topics.filter((t) =>
                      curriculumSearch.trim() === "" ? true : t.toLowerCase().includes(curriculumSearch.toLowerCase())
                    );
                    const isExpanded = expandedSubjectIdx === idx;

                    return (
                      <div
                        key={subj.subject}
                        className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/60"
                      >
                        <button
                          onClick={() => setExpandedSubjectIdx(isExpanded ? null : idx)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between hover:bg-slate-800/40 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 font-black text-xs flex items-center justify-center">
                              0{idx + 1}
                            </span>
                            <div>
                              <div className="font-bold text-white text-sm sm:text-base">{subj.subject}</div>
                              <div className="text-[11px] text-slate-400">
                                {filteredTopics.length} In-Depth Learning Modules
                              </div>
                            </div>
                          </div>
                          {isExpanded ? (
                            <FaChevronUp className="text-slate-400 text-xs" />
                          ) : (
                            <FaChevronDown className="text-slate-400 text-xs" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-5 border-t border-slate-800 bg-slate-950/40 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {filteredTopics.map((topic, tIdx) => (
                              <div
                                key={tIdx}
                                className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80"
                              >
                                <FaCheckCircle className="text-emerald-400 text-xs shrink-0" />
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: MOCK TESTS */}
            {activeTab === "mocktests" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Computer Based Mock Tests & Speed Labs</h3>
                <p className="text-xs text-slate-400">
                  Built on exact government CBT interfaces with negative marks calculations and detailed peer comparisons.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-amber-400 font-black text-2xl">100+ Tests</div>
                    <div className="text-sm font-bold text-white mt-1">Tier 1 & Tier 2 Mocks</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Timed sectional and full-length papers with exact timer and question palette.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-blue-400 font-black text-2xl">20,000+ PYQs</div>
                    <div className="text-sm font-bold text-white mt-1">Detailed Video Explanations</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Topic-wise previous year questions solved with 30-second shortcut techniques.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-emerald-400 font-black text-2xl">AIR Simulator</div>
                    <div className="text-sm font-bold text-white mt-1">Real-time Cutoff Predictor</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Compares your raw score with normalized trends to tell whether you clear the category cutoffs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: AI DOUBT MENTOR */}
            {activeTab === "aiDoubt" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-lg">
                    <FaRegLightbulb />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">24/7 AI Doubt Mentor & High-Security Player</h3>
                    <p className="text-xs text-slate-400">
                      Instantly solve reasoning paradoxes, math steps, or current affairs queries 24 hours a day.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="text-sm font-bold text-amber-300">🤖 AI Exam Mentor</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Ask any question from Indian Polity articles, complex Venn diagrams, or difficult arithmetic shortcuts. Our AI Mentor gives step-by-step reasoning in both English and Hindi.
                    </p>
                    <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                      "Ask: Explain the difference between Money Bill and Financial Bill under Article 110 & 117."
                    </div>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="text-sm font-bold text-blue-300">🛡️ DRM Protected HD Player</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Anti-piracy screen-recording black-out, individual dynamic watermark, and speed toggle (0.75x to 2x) for high-efficiency revision without lags.
                    </p>
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-2">
                      <FaCheckCircle /> Protected by Dizital Adda Proprietary Secure Video Engine
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FACULTY */}
            {activeTab === "faculty" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Mentorship by Top Bureaucrats & Star Educators</h3>
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0">
                    {selectedCourse.instructor?.slice(0, 2).toUpperCase() || "TS"}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{selectedCourse.instructor}</h4>
                    <p className="text-xs text-amber-400 font-bold mt-0.5">{selectedCourse.instructorRole}</p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Taught over 50,000 aspirants with unmatched shortcut tricks, daily motivation, and personal guidance on DAF interview preparation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FEES */}
            {activeTab === "fees" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Fee Structure & Flexible Payment Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="text-xs text-slate-400 font-bold uppercase">One-Time Complete Course Fee</div>
                    <div className="text-3xl font-black text-amber-400">
                      ₹{selectedCourse.price?.toLocaleString("en-IN")}
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> Full Live + Recorded Syllabus till Exam Date
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> Complete PDF Handbooks & Monthly Current Affairs
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> Full CBT Mock Tests with detailed analysis
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowCounselorModal(true)}
                      className="w-full bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs transition"
                    >
                      Enroll Now (Instant Access)
                    </button>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="text-xs text-slate-400 font-bold uppercase">Zero-Cost Monthly EMI</div>
                    <div className="text-3xl font-black text-blue-400">
                      ₹{Math.round(selectedCourse.price / 6).toLocaleString("en-IN")} / month
                    </div>
                    <p className="text-xs text-slate-300">
                      Split the cost in 6 easy monthly payments. No hidden charges, no credit card required.
                    </p>
                    <a
                      href={`https://wa.me/918810606010?text=Hi%2C+I+want+to+apply+for+EMI+in+${encodeURIComponent(
                        selectedCourse.title
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-center w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl text-xs transition border border-slate-700"
                    >
                      Apply for 0% EMI on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            FAQ ACCORDION SECTION
        ===================================================================== */}
        <section className="mt-20 pt-12 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-black text-white">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-400 mt-1">Frequently asked queries regarding government competitive exam prep.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Are the classes conducted in Hindi, English, or Bilingual?",
                a: "All lectures are delivered in friendly bilingual Hinglish (spoken explanation in easy Hindi & English, while study notes, PPTs, and mock tests are provided in both English & Hindi).",
              },
              {
                q: "Can working professionals prepare with these batches?",
                a: "Absolutely! All live sessions are held in morning and evening slots. Plus, full recordings are available 24/7 with adjustable playback speed for flexible study anytime.",
              },
              {
                q: "How often are Current Affairs updated?",
                a: "We conduct daily 45-minute live current affairs discussions, and publish monthly curated PDF compendiums and weekly MCQ quizzes covering The Hindu, Indian Express, and PIB.",
              },
              {
                q: "Is interview preparation included in the course?",
                a: "Yes! Candidates qualifying written stages get free one-on-one DAF analysis, personality development sessions, and simulated mock interviews by ex-officers.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 sm:p-5">
                <div className="font-bold text-white text-sm">{faq.q}</div>
                <div className="text-xs text-slate-300 mt-2 leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            BOTTOM CALL-TO-ACTION BANNER
        ===================================================================== */}
        <section className="mt-16 bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-indigo-600/20 border border-amber-400/30 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-black text-white">Need Guidance on Choosing the Right Govt Exam?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2">
            Speak directly with our senior mentors. We will analyze your degree, age, and strength areas to map out the highest-probability exam strategy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowCounselorModal(true)}
              className="bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition shadow-lg"
            >
              Request Free Career Guidance Call
            </button>
            <a
              href="https://wa.me/918810606010?text=Hi%2C+please+guide+me+on+selecting+the+right+government+competitive+exam"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition border border-emerald-400/30 flex items-center gap-1.5"
            >
              <FaWhatsapp /> Chat on WhatsApp Now
            </a>
          </div>
        </section>
      </main>

      {/* =========================================================================
          COUNSELOR MODAL POPUP
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
                <h4 className="text-xl font-bold text-white">Callback Request Received!</h4>
                <p className="text-xs text-slate-300">
                  Our senior government exam advisor will call you within 15 minutes to guide you on syllabus and preparation strategy.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCounselorSubmit} className="space-y-4">
                <div className="text-xs font-bold text-amber-400 uppercase">Government Job Advisory</div>
                <h4 className="text-xl font-black text-white">Speak to a Senior Exam Advisor</h4>
                <p className="text-xs text-slate-400">
                  Enter your details to receive an instant callback and customized exam roadmap.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singh"
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
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Examination</label>
                    <select
                      value={counselorForm.exam}
                      onChange={(e) => setCounselorForm({ ...counselorForm, exam: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="UPSC">UPSC Civil Services (IAS/IPS)</option>
                      <option value="SSC">SSC CGL / CHSL / CPO</option>
                      <option value="Banking">Banking (SBI / IBPS PO & Clerk)</option>
                      <option value="Railways">Railways (RRB NTPC / Group D)</option>
                      <option value="StatePCS">State PCS (BPSC / UPPCS / RAS)</option>
                      <option value="Defence">Defence & Police (CDS / SI / Constable)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs transition"
                  >
                    Request Free Call Now
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
