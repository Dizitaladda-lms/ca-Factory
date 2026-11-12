import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRocket,
  FaHeartbeat,
  FaCalculator,
  FaBook,
  FaShieldAlt,
  FaGraduationCap,
  FaBalanceScale,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaAward,
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
  FaBookOpen,
  FaFire,
  FaRegLightbulb,
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
    desc: "View all foundation, target & crash batches",
  },
  {
    id: "foundation-2yr",
    label: "2-Year Foundation (Class 11 & 12)",
    desc: "Complete conceptual mastery from class 11 to 12 with board + entrance integration.",
  },
  {
    id: "target-1yr",
    label: "1-Year Target / Dropper Batch",
    desc: "Intensive 1-year mission batch with daily 6-hour live classes and 100+ full mock tests.",
  },
  {
    id: "crash-3m",
    label: "Fastrack Crash Course (3-4 Months)",
    desc: "High-yield revision, formula sheets, previous 15-year questions & test series.",
  },
];

// ==========================================
// ENTRANCE EXAM DOMAINS & COURSE DATA
// ==========================================
const ENTRANCE_DOMAINS = [
  {
    id: "jee",
    title: "JEE (Main & Advanced)",
    shortName: "JEE Main & Adv",
    category: "Engineering Entrance",
    icon: FaRocket,
    badge: "Top Rankers Choice",
    color: "from-blue-600 to-indigo-800",
    bgLight: "bg-blue-50/70 border-blue-200",
    leadDesc:
      "Premier engineering entrance preparation designed by top IITian faculty. Complete coverage of Physics, Chemistry & Mathematics with 15,000+ solved PYQs and All-India Test Series.",
    eligibility: "Class 11, Class 12 & 12th Passed (PCM)",
    popularBatch: "Target 2027 JEE Main & Advanced Super 50",
    batches: [
      {
        id: "jee-foundation",
        tierId: "foundation-2yr",
        title: "JEE Main & Advanced 2-Year Comprehensive Foundation",
        subtitle: "Class 11 + 12 + JEE Complete Syllabus • 800+ Live Hours • Kota Study Material",
        category: "Engineering Entrance",
        duration: "24 Months",
        level: "Class 11 + 12 (2 Yrs)",
        mode: "Live Interactive + Lab Tests",
        price: 24999,
        originalPrice: 59999,
        instructor: "Er. Alok Sharma (IIT Delhi) & Team",
        instructorRole: "14+ Yrs Teaching Exp, Produced AIR 24, 68",
        highlights: [
          "800+ Hours Live Interactive Lectures with Kota Faculty",
          "Daily Practice Problems (DPPs) with video solutions",
          "50+ Full Syllabus JEE Main & Advanced Mock Tests",
        ],
        description:
          "Zero-to-advanced 2-year preparation for aspirants moving to Class 11. Synchronized with CBSE/ICSE board curriculum alongside rigorous JEE Advanced problem solving.",
        curriculum: [
          {
            subject: "Physics",
            topics: [
              "Units, Dimensions & Errors",
              "Kinematics & Newton's Laws of Motion",
              "Work, Power, Energy & Circular Motion",
              "Center of Mass, Momentum & Rigid Body Dynamics (Rotation)",
              "Gravitation, Fluid Mechanics & Surface Tension",
              "Thermodynamics, Kinetic Theory of Gases & Waves",
              "Electrostatics, Current Electricity & Magnetism",
              "Electromagnetic Induction & Alternating Current",
              "Ray Optics, Wave Optics & Modern Physics",
            ],
          },
          {
            subject: "Chemistry",
            topics: [
              "Mole Concept & Atomic Structure",
              "Periodic Table & Chemical Bonding",
              "Chemical Thermodynamics & Equilibrium",
              "Redox Reactions & Electrochemistry",
              "Chemical Kinetics & Surface Chemistry",
              "Organic Chemistry Principles & Hydrocarbons",
              "Haloalkanes, Alcohols, Phenols & Carbonyl Compounds",
              "Coordination Compounds & p-Block, d-Block Elements",
            ],
          },
          {
            subject: "Mathematics",
            topics: [
              "Sets, Relations & Functions",
              "Quadratic Equations & Complex Numbers",
              "Sequences, Series & Binomial Theorem",
              "Permutations, Combinations & Probability",
              "Differential Calculus: Limits, Continuity & Derivatives",
              "Integral Calculus: Definite & Indefinite Integrals, Differential Equations",
              "Coordinate Geometry: Straight Lines, Circles, Conics",
              "Vectors & 3D Geometry",
            ],
          },
        ],
      },
      {
        id: "jee-target",
        tierId: "target-1yr",
        title: "JEE Main & Advanced Target Dropper Batch",
        subtitle: "1-Year Mission Rank Batch • 600+ Hours Live • 120 Mock Tests with AI Rank Predictor",
        category: "Engineering Entrance",
        duration: "12 Months",
        level: "Dropper / Class 12 Pass",
        mode: "Live Interactive + Recorded",
        price: 16999,
        originalPrice: 42999,
        instructor: "Prof. Manish Verma (IIT Roorkee)",
        instructorRole: "Ex-Kota Senior Academic Head",
        highlights: [
          "High-impact 1-year syllabus coverage with daily 5-hr live sessions",
          "Weekly All-India Computer Based Test (CBT) Series",
          "Dedicated 1-on-1 mentor for rank acceleration and doubt solving",
        ],
        description:
          "Targeted intensive batch for 12th passed students. Eliminates knowledge gaps, speeds up calculation methods, and trains speed and accuracy under actual exam conditions.",
        curriculum: [
          {
            subject: "Physics Speed Drills",
            topics: [
              "Mechanics Rapid Mastery & Trick Formulas",
              "Electrodynamics Problem Solving Sprints",
              "Optics & Modern Physics High-Weightage Chapters",
              "Advanced Multi-Concept Integration Problems",
            ],
          },
          {
            subject: "Chemistry Reaction Maps",
            topics: [
              "Organic Mechanisms & Name Reactions Sheet",
              "Inorganic NCERT Line-by-Line Memory Maps",
              "Physical Chemistry Numerical Accuracy Workouts",
            ],
          },
          {
            subject: "Mathematics Shortcut Techniques",
            topics: [
              "Calculus Speed Formulas & Graph Analysis",
              "Coordinate Geometry Option Elimination Strategies",
              "Vector & 3D Spatial Geometry Masterclass",
            ],
          },
        ],
      },
      {
        id: "jee-crash",
        tierId: "crash-3m",
        title: "JEE Main 90-Day Rank Booster Crash Course",
        subtitle: "High Yield Chapters • 15 Years PYQ Breakdown • 25 CBT Mock Tests",
        category: "Engineering Entrance",
        duration: "3 Months",
        level: "Class 12 / Aspirants",
        mode: "Daily Live Sessions",
        price: 7999,
        originalPrice: 19999,
        instructor: "Top Faculty Team (IIT Alumni)",
        instructorRole: "Specialized Entrance Test Coaches",
        highlights: [
          "Top 60 high-weightage chapters contributing 75%+ marks",
          "Daily 3-hour live problem solving with formula sheets",
          "25 Full-length JEE Main CBT Mock Tests on real exam UI",
        ],
        description:
          "Sprint through the entire syllabus in 90 days. Ideal for last-minute revision, mock test practice, and boosting percentile to 99+ percentile.",
        curriculum: [
          {
            subject: "Physics Crash Modules",
            topics: ["Modern Physics & Semiconductors", "Current Electricity & Magnetism", "Thermodynamics & Heat", "Mechanics Top Formulas"],
          },
          {
            subject: "Chemistry Crash Modules",
            topics: ["NCERT Inorganic Direct Questions", "Organic Functional Group Conversions", "Chemical Bonding & Periodic Trends"],
          },
          {
            subject: "Mathematics Crash Modules",
            topics: ["Matrices, Determinants & Vector 3D", "Differential Equations & Definite Integration", "Coordinate Geometry Quick Solvers"],
          },
        ],
      },
    ],
  },
  {
    id: "neet",
    title: "NEET (UG) Medical",
    shortName: "NEET Medical",
    category: "Medical Entrance",
    icon: FaHeartbeat,
    badge: "650+ Score Guarantee Support",
    color: "from-emerald-600 to-teal-800",
    bgLight: "bg-emerald-50/70 border-emerald-200",
    leadDesc:
      "Comprehensive medical entrance coaching focusing on NCERT line-by-line mastery in Biology, conceptual clarity in Physics, and reaction mechanisms in Chemistry. Taught by AIIMS doctors & top medical faculties.",
    eligibility: "Class 11, Class 12 & 12th Passed (PCB)",
    popularBatch: "NEET AIIMS Rankers Batch 2026-27",
    batches: [
      {
        id: "neet-foundation",
        tierId: "foundation-2yr",
        title: "NEET UG 2-Year Comprehensive Mission Batch",
        subtitle: "NCERT Complete Breakdown • 360/360 in Biology Target • Kota Medical Faculty",
        category: "Medical Entrance",
        duration: "24 Months",
        level: "Class 11 + 12 (2 Yrs)",
        mode: "Live Interactive + Recorded",
        price: 24999,
        originalPrice: 59999,
        instructor: "Dr. Arvind Saxena (AIIMS Alum) & Team",
        instructorRole: "16+ Yrs Exp, Guided 1200+ MBBS Doctors",
        highlights: [
          "100% NCERT Line-by-Line audio-visual decoding for Biology",
          "Physics made simple with zero-fear numerical formula sheets",
          "40+ OMR-Based All-India NEET Mock Tests with video analysis",
        ],
        description:
          "2-year comprehensive program for students entering Class 11. Builds crystal-clear basics in Botany, Zoology, Human Physiology, Organic Chemistry, and NEET-specific Physics numericals.",
        curriculum: [
          {
            subject: "Biology (Botany & Zoology)",
            topics: [
              "Diversity in Living World & Biological Classification",
              "Structural Organisation in Animals & Plants",
              "Cell Structure, Function & Cell Cycle Division",
              "Plant Physiology (Photosynthesis, Respiration, Plant Growth)",
              "Human Physiology (Digestion, Circulation, Excretion, Nervous)",
              "Genetics, Molecular Basis of Inheritance & Evolution",
              "Biotechnology Principles & Applications",
              "Ecology, Environment & Biodiversity",
            ],
          },
          {
            subject: "Physics for NEET",
            topics: [
              "Kinematics & Laws of Motion",
              "Gravitation & Mechanical Properties of Matter",
              "Thermodynamics & Kinetic Theory",
              "Electrostatics & Current Electricity",
              "Magnetism, EMI & AC",
              "Ray & Wave Optics",
              "Dual Nature of Radiation & Atomic Nucleus",
            ],
          },
          {
            subject: "Chemistry for NEET",
            topics: [
              "Physical Chemistry: Solutions, Electrochemistry, Kinetics",
              "Inorganic: Periodic Classification, Chemical Bonding, Coordination",
              "Organic: Biomolecules, Hydrocarbons, Carbonyl Compounds",
            ],
          },
        ],
      },
      {
        id: "neet-target",
        tierId: "target-1yr",
        title: "NEET UG Target 1-Year Dropper Batch",
        subtitle: "Mission 680+ Marks • 100 Mock Tests • Daily 5-Hour Intensive Sessions",
        category: "Medical Entrance",
        duration: "12 Months",
        level: "Droppers / Class 12 Pass",
        mode: "Live Interactive + Mentorship",
        price: 15999,
        originalPrice: 39999,
        instructor: "Dr. Shweta Rao & Kota Medical Leads",
        instructorRole: "Ex-Allen & Aakash Senior Faculty",
        highlights: [
          "Targeted to maximize score from 400+ to 680+ in 1 year",
          "Special focus on tricky Physics numericals & Chemistry conversions",
          "Daily OMR tests with immediate negative marking analytics",
        ],
        description:
          "Dedicated dropper program focused on converting mistakes into accuracy. Intensive revision, daily problem sessions, and weekly simulated NEET tests.",
        curriculum: [
          {
            subject: "High-Yield Biology",
            topics: [
              "Genetics & Biotechnology 120 Marks Masterclass",
              "Human Physiology High-Frequency Question Drills",
              "Ecology & Evolution Guaranteed Scoring Areas",
            ],
          },
          {
            subject: "Physics Formula Drills",
            topics: [
              "Mechanics & Electrodynamics Shortcut Solving",
              "Modern Physics & Optics 100% Accuracy Workouts",
            ],
          },
          {
            subject: "Chemistry NCERT Review",
            topics: [
              "Named Reactions, Reagents & Organic Chains",
              "Inorganic NCERT Line by Line Highlighted PDF Notes",
            ],
          },
        ],
      },
      {
        id: "neet-crash",
        tierId: "crash-3m",
        title: "NEET 100-Day Super Rank Booster Crash Course",
        subtitle: "Complete NCERT Revision • 30 Full OMR Mock Tests • Doubt Helpline",
        category: "Medical Entrance",
        duration: "3 Months",
        level: "NEET Aspirants",
        mode: "Daily Live Fastrack",
        price: 7499,
        originalPrice: 18999,
        instructor: "Senior AIIMS Mentors & Doctors",
        instructorRole: "NEET Rank Booster Specialists",
        highlights: [
          "Fast-track audio visual revision of 97 chapters",
          "30 Full-length mock tests matching the exact NTA pattern",
          "Special cheat codes & mnemonics for memorizing biological terms",
        ],
        description:
          "The ultimate sprint before the exam. Revises all high-weightage topics, removes exam anxiety, and provides continuous practice with timed mock tests.",
        curriculum: [
          {
            subject: "Rapid Biology",
            topics: ["Top 300 NCERT Diagram Questions", "Direct Statements & Assertion-Reason Mastery", "Match the Following Drills"],
          },
          {
            subject: "Rapid Chemistry",
            topics: ["Direct Inorganic Questions", "Physical Chemistry Formula Quick Review", "Organic Reagents Quick Sheets"],
          },
          {
            subject: "Rapid Physics",
            topics: ["Direct Formula Applications", "Modern Physics & Semiconductor Scoring Questions", "Dimensional Analysis Tricks"],
          },
        ],
      },
    ],
  },
  {
    id: "cuet",
    title: "CUET (UG & PG)",
    shortName: "CUET University",
    category: "Central University Entrance",
    icon: FaBook,
    badge: "DU, BHU & JNU Dedicated",
    color: "from-amber-600 to-orange-800",
    bgLight: "bg-amber-50/70 border-amber-200",
    leadDesc:
      "Crack top central universities (Delhi University, BHU, JNU, Jamia) with our all-in-one CUET preparation program. Covers Section 1 (Languages), Section 2 (Domain Subjects - Science, Commerce, Arts), and Section 3 (General Aptitude Test).",
    eligibility: "Class 12 Appearing or Passed",
    popularBatch: "CUET North Campus Dream Batch",
    batches: [
      {
        id: "cuet-comprehensive",
        tierId: "foundation-2yr",
        title: "CUET UG All-in-One Comprehensive Master Program",
        subtitle: "Language + Domain (Science/Commerce/Hum) + General Test • 100% Percentile Prep",
        category: "Central University Entrance",
        duration: "6 Months",
        level: "Class 12 Students",
        mode: "Live + Practice Portal",
        price: 9999,
        originalPrice: 24999,
        instructor: "Prof. Ananya Sen & Central University Alumni",
        instructorRole: "Top DU SRCC & St. Stephen's Mentors",
        highlights: [
          "Comprehensive coverage of English language & Reading Comprehension",
          "Domain-specific mastery tailored strictly to NCERT Class 12 syllabus",
          "General Test mastery: Quantitative, Logical Reasoning & Current Affairs",
        ],
        description:
          "Guaranteed complete preparation for admissions to top colleges like SRCC, Hindu, St. Stephen's, Miranda House, and BHU with regular mock assessments.",
        curriculum: [
          {
            subject: "Section 1: English & Hindi Language",
            topics: [
              "Reading Comprehension (Factual, Narrative, Literary)",
              "Vocabulary, Synonyms, Antonyms & Idioms",
              "Sentence Correction, Para Jumbles & Word Substitution",
            ],
          },
          {
            subject: "Section 2: Domain Subjects (Customized)",
            topics: [
              "Science Stream: Physics, Chemistry, Math, Biology",
              "Commerce Stream: Accountancy, Business Studies, Economics",
              "Humanities Stream: History, Political Science, Geography, Sociology",
            ],
          },
          {
            subject: "Section 3: General Test (GT)",
            topics: [
              "General Knowledge & Current Affairs (Monthly digests)",
              "General Mental Ability & Numerical Ability",
              "Reasoning (Analytical, Verbal, Logical)",
            ],
          },
        ],
      },
      {
        id: "cuet-fastrack",
        tierId: "crash-3m",
        title: "CUET 60-Day High-Percentile Crash Program",
        subtitle: "Rapid Mock Practice • 50+ Domain Mocks • NTA Test Simulator",
        category: "Central University Entrance",
        duration: "2 Months",
        level: "Class 12 Post Board Exam",
        mode: "Daily Live Classes",
        price: 5999,
        originalPrice: 14999,
        instructor: "Dizital Adda CUET Specialist Panel",
        instructorRole: "Top Rank University Counsellors",
        highlights: [
          "Focused revision right after 12th Board examinations",
          "50 Full-length Computer Based Mock Tests on real NTA software",
          "University form-filling & preference sheet guidance",
        ],
        description:
          "Fast-track bootcamp starting immediately after board exams to convert board knowledge into high CUET MCQ percentiles.",
        curriculum: [
          {
            subject: "General Test Rapid Drills",
            topics: ["Math & Reasoning Quick Tricks", "Current Affairs 6-Month Compendium", "Logic Puzzles & Coding-Decoding"],
          },
          {
            subject: "Domain Rapid MCQ Revision",
            topics: ["NCERT Chapter-Wise 100 Best MCQs", "Elimination Strategy for Confusing Options"],
          },
        ],
      },
    ],
  },
  {
    id: "nda",
    title: "NDA & Defence Entrance",
    shortName: "NDA / CDS",
    category: "Defence Entrance",
    icon: FaShieldAlt,
    badge: "Written + SSB Guidance",
    color: "from-red-700 to-amber-900",
    bgLight: "bg-red-50/70 border-red-200",
    leadDesc:
      "National Defence Academy & Naval Academy preparation guided by ex-Defence officers and top academic faculties. Complete Mathematics and General Ability Test (GAT) along with specialized SSB Interview guidance.",
    eligibility: "Class 11, Class 12 & 12th Passed (Age: 16.5 - 19.5)",
    popularBatch: "NDA Mission Khadakwasla Batch",
    batches: [
      {
        id: "nda-foundation",
        tierId: "foundation-2yr",
        title: "NDA Comprehensive Written + SSB Complete Course",
        subtitle: "Mathematics (300 Marks) + GAT (600 Marks) + SSB Officer Personality Training",
        category: "Defence Entrance",
        duration: "12 Months",
        level: "Class 11 & 12 / Aspirants",
        mode: "Live Sessions + Physical Prep Guide",
        price: 13999,
        originalPrice: 34999,
        instructor: "Col. R.K. Bhardwaj (Retd.) & Team",
        instructorRole: "Ex-SSB Board Interviewing Officer",
        highlights: [
          "Complete mastery of 11th & 12th Mathematics with shortcut tricks",
          "In-depth General Ability Test: English, Physics, Chemistry, GS, Current Affairs",
          "SSB Interview orientation: OIR, PPDT, TAT, WAT, SRT & Personal Interview",
        ],
        description:
          "Complete guidance for written clearance and personality grooming required for NDA & CDS officer recommendation.",
        curriculum: [
          {
            subject: "Mathematics (Paper 1)",
            topics: [
              "Algebra: Matrices, Determinants, Complex Numbers, Binomial",
              "Trigonometry: Identities, Angles, Heights & Distances",
              "Differential & Integral Calculus with shortcut solving",
              "Coordinate Geometry, Vectors & 3D Lines",
              "Statistics, Mean, Variance & Probability distributions",
            ],
          },
          {
            subject: "General Ability Test (Paper 2)",
            topics: [
              "English: Grammar, Vocabulary, Comprehension, Spotting Errors",
              "General Science: Physics, Chemistry & Biology basics",
              "Social Studies: Indian History, Freedom Struggle, Geography, Polity",
              "Current National & International Events and Defence Updates",
            ],
          },
          {
            subject: "SSB Guidance & Personality",
            topics: [
              "Screening Test: Officer Intelligence Rating (OIR) & PPDT Narration",
              "Psychological Tests: TAT, WAT, SRT, Self Description",
              "Group Testing Officer (GTO) Tasks: PGT, HGT, Command Task",
              "Personal Interview & Conference etiquette",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ca",
    title: "CA Foundation & Inter",
    shortName: "CA Programs",
    category: "Commerce & Professional",
    icon: FaCalculator,
    badge: "ICAI Pattern Aligned",
    color: "from-purple-700 to-indigo-900",
    bgLight: "bg-purple-50/70 border-purple-200",
    leadDesc:
      "Rigorous Chartered Accountancy coaching aligned 100% with the latest ICAI syllabus. Conceptual learning in Accounting, Business Law, Quantitative Aptitude & Business Economics with extensive writing practice.",
    eligibility: "Class 12 Passed or Commerce Graduates",
    popularBatch: "CA Foundation All-Ranker Batch",
    batches: [
      {
        id: "ca-foundation-all",
        tierId: "foundation-2yr",
        title: "CA Foundation Complete 4-Paper Master Program",
        subtitle: "Accounting + Law + Quant + Economics • ICAI Study Material Solved • 500+ Hours",
        category: "Commerce & Professional",
        duration: "6 Months",
        level: "Class 12 / Aspirants",
        mode: "Live Interactive + Case Studies",
        price: 12999,
        originalPrice: 29999,
        instructor: "CA Gaurav Agarwal & CA Neha Mehta",
        instructorRole: "Fellow Chartered Accountants with 12+ Yrs Exp",
        highlights: [
          "Complete coverage of all 4 ICAI papers with chapter-wise RTPs and MTPs",
          "Dedicated Business Law answer-writing evaluation with personalized feedback",
          "Comprehensive quantitative aptitude shortcut tips for non-maths students",
        ],
        description:
          "High-success program enabling students to crack CA Foundation in their very first attempt with conceptual clarity and exam-tested presentation methods.",
        curriculum: [
          {
            subject: "Paper 1: Accounting",
            topics: [
              "Theoretical Framework & Accounting Process",
              "Bank Reconciliation Statement & Inventories",
              "Depreciation & Bills of Exchange",
              "Preparation of Final Accounts of Sole Proprietors",
              "Partnership Accounts & Company Accounts basics",
            ],
          },
          {
            subject: "Paper 2: Business Laws",
            topics: [
              "The Indian Regulatory Framework",
              "The Indian Contract Act, 1872",
              "The Sale of Goods Act, 1930 & Indian Partnership Act, 1932",
              "The Limited Liability Partnership Act, 2008 & Companies Act, 2013",
            ],
          },
          {
            subject: "Paper 3: Quantitative Aptitude",
            topics: [
              "Ratio, Proportion, Indices & Logarithms",
              "Equations, Linear Inequalities & Time Value of Money",
              "Permutations, Combinations, Sequence & Series",
              "Logical Reasoning: Number Series, Direction Tests, Blood Relations",
              "Statistical Description of Data, Central Tendency & Probability",
            ],
          },
          {
            subject: "Paper 4: Business Economics",
            topics: [
              "Introduction to Business Economics",
              "Theory of Demand and Supply & Consumer Behaviour",
              "Theory of Production and Cost",
              "Price Determination in Different Markets & Business Cycles",
              "National Income, Public Finance & Money Market",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "clat",
    title: "CLAT & National Law",
    shortName: "CLAT Law",
    category: "Law Entrance",
    icon: FaBalanceScale,
    badge: "NLUs Targeted",
    color: "from-slate-800 to-zinc-950",
    bgLight: "bg-slate-50 border-slate-200",
    leadDesc:
      "Premier coaching for Common Law Admission Test (CLAT), AILET & SLAT for entry into top National Law Universities (NLSIU Bengaluru, NALSAR Hyderabad, WBNUJS Kolkata). Passage-based reading drills, legal reasoning & daily current affairs.",
    eligibility: "Class 11, Class 12 & Graduates",
    popularBatch: "CLAT Top NLU Dream Batch",
    batches: [
      {
        id: "clat-master",
        tierId: "foundation-2yr",
        title: "CLAT Comprehensive 1-Year National Law Entrance Program",
        subtitle: "Passage Based Strategy • Legal Reasoning • Reading Comprehension • 80 Mocks",
        category: "Law Entrance",
        duration: "12 Months",
        level: "Class 11, 12 & Droppers",
        mode: "Live + Speed Reading Labs",
        price: 14999,
        originalPrice: 34999,
        instructor: "Adv. Siddharth Joshi (NLSIU Alum)",
        instructorRole: "High Court Practitioner & Senior CLAT Coach",
        highlights: [
          "Special speed reading and comprehension training for 15,000-word papers",
          "Deep dive into Legal Aptitude: Torts, Contracts, Constitutional Law, Criminal Law",
          "80 Full-length passage-based CLAT Mock Tests with detailed ranking",
        ],
        description:
          "Specifically structured to conquer the new passage-based testing format of the Consortium of NLUs with analytical precision.",
        curriculum: [
          {
            subject: "English Language & Comprehension",
            topics: [
              "Speed Reading & Critical Thinking Passages",
              "Identifying Arguments, Inferences & Tone of the Author",
              "Contextual Vocabulary & Idiomatic Usages",
            ],
          },
          {
            subject: "Current Affairs & General Knowledge",
            topics: [
              "Monthly Legal GK & Landmark Judgments Roundup",
              "National & International Contemporary Affairs",
              "Historical & Political background of trending news",
            ],
          },
          {
            subject: "Legal Reasoning",
            topics: [
              "Law of Torts (Negligence, Strict Liability, Defamation)",
              "Law of Contracts (Offer, Acceptance, Consideration, Breach)",
              "Constitutional Law & Fundamental Rights",
              "Criminal Law (IPC, General Exceptions, Offences Against Body)",
            ],
          },
          {
            subject: "Logical Reasoning & Quantitative Techniques",
            topics: [
              "Critical Reasoning: Premises, Assumptions & Weakening Arguments",
              "Deductive Logic & Syllogisms",
              "Data Interpretation (Graphs, Tables, Caselets)",
            ],
          },
        ],
      },
    ],
  },
];

// Flat list of all courses for card rendering
const ALL_ENTRANCE_COURSES = ENTRANCE_DOMAINS.flatMap((dom) =>
  dom.batches.map((batch) => ({
    ...batch,
    domainId: dom.id,
    domainName: dom.shortName,
  }))
);

// ==========================================
// MAIN ENTRANCE PORTAL COMPONENT
// ==========================================
export default function Entrance() {
  const navigate = useNavigate();

  // Multi-step navigation state: 1: Domains, 2: Program Batches (CourseCard), 3: Deep Dive
  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState(ENTRANCE_DOMAINS[0]);
  const [selectedBatchTier, setSelectedBatchTier] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // Step 3 Deep Dive Tab State
  const [activeTab, setActiveTab] = useState("curriculum"); // curriculum | mocktests | aiDoubt | faculty | fees
  const [curriculumSearch, setCurriculumSearch] = useState("");
  const [expandedSubjectIdx, setExpandedSubjectIdx] = useState(0);

  // Counselor Modal State
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [counselorForm, setCounselorForm] = useState({ name: "", phone: "", exam: "JEE" });

  // Filter courses based on active domain, tier & search query
  const displayedCourses = ALL_ENTRANCE_COURSES.filter((c) => {
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
      setCounselorForm({ name: "", phone: "", exam: "JEE" });
    }, 2500);
  };

  return (
    <div className="bg-[#080E1A] min-h-screen text-slate-100 font-sans selection:bg-[#D4A017] selection:text-slate-950">
      {/* =========================================================================
          HERO SECTION (Classical Navy + Gold Accents + Live Stats)
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#080E1A] border-b border-slate-800/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb & Step Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Entrance Examination Portal</span>
            </div>

            {/* 3 Step Pill Tracker */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 text-xs">
              <button
                onClick={() => setStep(1)}
                className={`px-3 py-1 rounded-full transition font-bold flex items-center gap-1.5 ${
                  step === 1 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>1</span>
                <span>Select Exam</span>
              </button>
              <span className="text-slate-600">→</span>
              <button
                onClick={() => setStep(2)}
                className={`px-3 py-1 rounded-full transition font-bold flex items-center gap-1.5 ${
                  step === 2 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>2</span>
                <span>Choose Batch</span>
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
                <span>Syllabus & Enroll</span>
              </button>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="text-center max-w-4xl mx-auto mt-10">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              National Competitive Examination Ecosystem
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Crack National Entrance Exams with <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Top IITians, Doctors & Rankers
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Structured preparation for JEE, NEET, CUET, NDA, CA & CLAT. Featuring daily live classes, NCERT line-by-line decoding, 15,000+ video solutions, 24/7 AI doubt solving & All-India Test Series.
            </p>

            {/* Quick CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowCounselorModal(true)}
                className="bg-gradient-to-r from-[#D4A017] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-7 py-3.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <FaPhoneAlt className="text-xs" />
                Book Free Counseling Session
              </button>

              <a
                href="https://wa.me/918810606010?text=Hi%2C+I+want+counseling+for+National+Entrance+Exams"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center gap-2 border border-emerald-400/30"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp Counselor
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

            {/* Live Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">45,000+</div>
                <div className="text-xs text-slate-400 mt-1">Aspirants Enrolled</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">98.6%</div>
                <div className="text-xs text-slate-400 mt-1">Selection & Success Ratio</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">100+</div>
                <div className="text-xs text-slate-400 mt-1">Full CBT Mock Tests</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">24/7</div>
                <div className="text-xs text-slate-400 mt-1">AI Mentor & Doubt Desk</div>
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
                Choose Your Target Entrance Examination
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Select your entrance stream to access specialized target batches, Kota study notes, previous year question banks, and All-India mock series.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ENTRANCE_DOMAINS.map((domain) => {
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

                      {/* Batches count & eligibility tag */}
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
            {/* Header with Active Domain Info & Back Button */}
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
                    <span>Active Domain</span>
                    <span>•</span>
                    <span>{selectedDomain.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {selectedDomain.title} Batches & Programs
                  </h2>
                </div>
              </div>

              {/* Exam Switcher Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 font-bold">Switch Exam:</label>
                <select
                  value={selectedDomain.id}
                  onChange={(e) => {
                    const found = ENTRANCE_DOMAINS.find((d) => d.id === e.target.value);
                    if (found) setSelectedDomain(found);
                  }}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold py-2 px-3 rounded-xl focus:outline-none focus:border-amber-400"
                >
                  {ENTRANCE_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Bar: Tiers + Search */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {/* Tier Filter Pills */}
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

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  placeholder="Search batch or topic..."
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
                    {/* Render standard CourseCard */}
                    <CourseCard course={course} />

                    {/* Additional Button to open Deep-Dive Syllabus in Step 3 */}
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
            {/* Top Navigation & Selected Course Banner */}
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
                  Batch Detailed Prospectus
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
                    Enroll / Get Callback
                  </button>
                </div>
              </div>
            </div>

            {/* Deep-Dive Navigation Tabs */}
            <div className="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-bold">
              {[
                { id: "curriculum", label: "Detailed Curriculum & Topics" },
                { id: "mocktests", label: "Mock Test Papers & PYQs" },
                { id: "aiDoubt", label: "24/7 AI Doubt Mentor & Player" },
                { id: "faculty", label: "Faculty & Mentorship" },
                { id: "fees", label: "Fee Structure & Enrollment" },
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

            {/* TAB CONTENT: CURRICULUM */}
            {activeTab === "curriculum" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Subject-Wise Comprehensive Syllabus</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Structured module-by-module breakdown according to recent national testing agency patterns.
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search chapter or topic..."
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
                                {filteredTopics.length} Comprehensive Learning Chapters
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

            {/* TAB CONTENT: MOCK TESTS */}
            {activeTab === "mocktests" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">All-India Test Series & Previous 15-Year Papers</h3>
                <p className="text-xs text-slate-400">
                  Simulate real testing conditions with exact NTA/ICAI UI, negative marking algorithms, and comparative AIR rank prediction.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-amber-400 font-black text-2xl">50+ Full Tests</div>
                    <div className="text-sm font-bold text-white mt-1">Full-Length CBT Mocks</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Timer-based full papers matching the exact difficulty and marks distribution of the national exam.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-blue-400 font-black text-2xl">15,000+ PYQs</div>
                    <div className="text-sm font-bold text-white mt-1">Video Solutions Included</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Every question from 2010 to 2024 with step-by-step video solution and shortcut formula techniques.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-emerald-400 font-black text-2xl">Instant AI Report</div>
                    <div className="text-sm font-bold text-white mt-1">Weak Area Diagnostic</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Detailed post-test analytics identifying time taken per question, silly mistakes, and high-scoring weak topics.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: AI DOUBT MENTOR */}
            {activeTab === "aiDoubt" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-lg">
                    <FaRegLightbulb />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">24/7 AI Doubt Mentor & Anti-Piracy Player</h3>
                    <p className="text-xs text-slate-400">
                      Learn without interruptions with instant step-by-step guidance whenever you get stuck.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="text-sm font-bold text-amber-300">🤖 24/7 AI Doubt Assistant</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Stuck on a tricky calculation or concept at 2 AM? Our AI Doubt Mentor breaks down complex derivations, explains equations in simple Hinglish, and suggests similar practice problems instantly.
                    </p>
                    <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                      "Ask: Explain why Lenz's Law satisfies Conservation of Energy with formula derivation."
                    </div>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="text-sm font-bold text-blue-300">🛡️ High-Security Anti-Piracy Player</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Enjoy seamless 1080p adaptive bitrate streaming with dynamic student watermarking, complete screen-record blacking protection, and zero lag on desktop or mobile.
                    </p>
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-2">
                      <FaCheckCircle /> Protected by Dizital Adda Proprietary DRM Engine
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FACULTY */}
            {activeTab === "faculty" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Mentorship by Top National Rankers</h3>
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0">
                    {selectedCourse.instructor?.slice(0, 2).toUpperCase() || "TS"}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{selectedCourse.instructor}</h4>
                    <p className="text-xs text-amber-400 font-bold mt-0.5">{selectedCourse.instructorRole}</p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Proven track record of producing top 100 All-India ranks with simplified pedagogies, shortcut speed tricks, and individual performance monitoring.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FEES */}
            {activeTab === "fees" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Enrollment Fee & Flexible Scholarships</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="text-xs text-slate-400 font-bold uppercase">One-Time Payment Discount</div>
                    <div className="text-3xl font-black text-amber-400">
                      ₹{selectedCourse.price?.toLocaleString("en-IN")}
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> Complete Live + Recorded Syllabus Access
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> Hardcopy Kota Study Material dispatched to home
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> 100+ CBT Mock Tests with AI Rank Predictor
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
                    <div className="text-xs text-slate-400 font-bold uppercase">Zero-Cost EMI Plan</div>
                    <div className="text-3xl font-black text-blue-400">
                      ₹{Math.round(selectedCourse.price / 6).toLocaleString("en-IN")} / month
                    </div>
                    <p className="text-xs text-slate-300">
                      Pay in 6 interest-free monthly installments. No credit card required, verified with simple student Aadhaar / Parent KYC.
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
            <p className="text-xs text-slate-400 mt-1">Everything you need to know about our national entrance exam coaching.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Can I prepare for both Class 12 Boards and Entrance Exams together?",
                a: "Yes! Our 2-Year Foundation batches are specially synchronized with CBSE/ICSE board exam schedules so that you score 90%+ in boards alongside cracking top entrance ranks without burnout.",
              },
              {
                q: "What happens if I miss a live lecture?",
                a: "Every live lecture is automatically recorded in crystal clear 1080p and uploaded within 2 hours alongside class PPT notes, downloadable PDFs, and practice questions.",
              },
              {
                q: "How do doubt clearing sessions work?",
                a: "You have 2 options: instant 24/7 AI Doubt Mentor resolution for round-the-clock step-by-step assistance, plus daily scheduled 1-hour live teacher doubt clinics.",
              },
              {
                q: "Do I get physical hardcopy study material?",
                a: "Yes, for comprehensive 1-year and 2-year programs, complete theory books, formula handbooks, and chapter-wise question modules are couriered to your doorstep.",
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
          <h3 className="text-2xl sm:text-3xl font-black text-white">Still Confused Which Batch Fits You?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2">
            Speak directly with our senior entrance counselors. We will evaluate your current preparation score and suggest the perfect roadmap.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowCounselorModal(true)}
              className="bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition shadow-lg"
            >
              Request Free Academic Callback
            </button>
            <a
              href="https://wa.me/918810606010?text=Hi%2C+please+guide+me+on+selecting+the+right+entrance+exam+batch"
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
                  Our senior academic counselor will call you within 15 minutes to guide you on your entrance exam roadmap.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCounselorSubmit} className="space-y-4">
                <div className="text-xs font-bold text-amber-400 uppercase">Expert Academic Counseling</div>
                <h4 className="text-xl font-black text-white">Speak to a Senior Entrance Mentor</h4>
                <p className="text-xs text-slate-400">
                  Enter your details to receive an instant callback and customized syllabus breakdown.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
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
                      <option value="JEE">JEE Main & Advanced</option>
                      <option value="NEET">NEET Medical</option>
                      <option value="CUET">CUET (UG / PG)</option>
                      <option value="NDA">NDA / Defence</option>
                      <option value="CA">CA Foundation / Inter</option>
                      <option value="CLAT">CLAT / Law</option>
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
