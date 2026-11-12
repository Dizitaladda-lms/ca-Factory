import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaLaptopCode,
  FaChartLine,
  FaShieldAlt,
  FaCloud,
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
  FaHandshake,
  FaBookOpen,
} from "react-icons/fa";
import CourseCard from "../components/course/CourseCard";
import { COMPANY_LOGO_MAP } from "../components/HiringPartnersStrip.jsx";
import Footer from "../components/Footer";

// ==========================================
// BATCH TIER DEFINITIONS
// ==========================================
const BATCH_TIERS = [
  {
    id: "all",
    label: "All Career Programs",
    desc: "View all career tracks with placement assurance",
  },
  {
    id: "diploma-12m",
    label: "12-Month Master Diploma (Paid Internship + Job Guarantee)",
    desc: "Comprehensive career transition with 3-month paid internship and legal placement assurance.",
  },
  {
    id: "bootcamp-6m",
    label: "6-Month Career Bootcamp",
    desc: "Intensive job-ready track with 10 production projects, DSA drills and 10 mock interviews.",
  },
  {
    id: "foundation-3m",
    label: "3-Month Fastrack Certification",
    desc: "High-impact skill sprint for quick job upgrades and freelance portfolio building.",
  },
];

// ==========================================
// PLACEMENT CAREER DOMAINS & PROGRAMS
// ==========================================
const PLACEMENT_DOMAINS = [
  {
    id: "software-eng",
    title: "Full Stack Software Engineering & Cloud",
    shortName: "Full Stack SWE",
    category: "Software Engineering",
    icon: FaLaptopCode,
    badge: "Highest Tech CTC: ₹45 LPA",
    color: "from-blue-600 to-indigo-900",
    leadDesc:
      "Become a production-grade full stack engineer. Master modern web architectures (React, Next.js, Node.js, Spring Boot), Cloud DevOps (Docker, AWS), Data Structures & Algorithms (LeetCode 350+), and System Design (HLD/LLD).",
    eligibility: "B.Tech, BCA, MCA, B.Sc or Any Graduate with coding passion",
    avgPackage: "₹8.5 - 24 LPA",
    hiringPartners: ["Amazon", "Microsoft", "Swiggy", "Zomato", "Oracle", "Paytm"],
    batches: [
      {
        id: "swe-master-12m",
        tierId: "diploma-12m",
        title: "Master Diploma in Full Stack Engineering & Cloud Architecture",
        subtitle: "12 Months Intensive • React, Node, Next.js, AWS, System Design & Paid Internship",
        category: "Software Engineering",
        duration: "12 Months",
        level: "Beginner to Enterprise Architect",
        mode: "Live Interactive + Agile Sprints",
        price: 34999,
        originalPrice: 79999,
        instructor: "Siddharth Verma (Ex-Amazon SDE II)",
        instructorRole: "10+ Yrs Enterprise Software Architect",
        highlights: [
          "Complete MERN & Next.js architecture with Microservices & Redis caching",
          "350+ LeetCode DSA questions solved with time-complexity analysis",
          "Guaranteed 3-Month Paid Internship + Legal Placement Guarantee",
        ],
        description:
          "Zero-to-hired master engineering diploma. Build and deploy real-time scalable systems like Netflix video streaming, Uber cab dispatch, and E-commerce high-concurrency checkouts.",
        curriculum: [
          {
            subject: "Month 1-3: Modern Frontend & Reactive Architecture",
            topics: [
              "Advanced JavaScript (ES6+, Closures, Event Loop, Async/Await)",
              "React 19 Deep Dive: Custom Hooks, Context, Suspense & Server Components",
              "Next.js 15 Full-Stack: App Router, Server Actions & Dynamic Routing",
              "Tailwind CSS, Framer Motion & Responsive Design Engineering",
            ],
          },
          {
            subject: "Month 4-6: Backend Engineering, Microservices & Databases",
            topics: [
              "Node.js & Express.js REST APIs with Clean Architecture",
              "Relational Databases: PostgreSQL, Prisma ORM, Indexing & Transactions",
              "NoSQL: MongoDB aggregation pipelines & Redis in-memory caching",
              "Authentication: JWT, OAuth 2.0, RBAC & API Gateway security",
            ],
          },
          {
            subject: "Month 7-9: System Design & Data Structures (DSA)",
            topics: [
              "Arrays, Strings, Linked Lists, Stacks, Queues & Hash Maps",
              "Trees, Graphs, BFS/DFS, Dynamic Programming & Backtracking",
              "Low-Level Design (LLD): SOLID Principles, Design Patterns & OOP",
              "High-Level Design (HLD): Microservices, Load Balancers, Kafka, Sharding",
            ],
          },
          {
            subject: "Month 10-12: Cloud DevOps & Placement Drives",
            topics: [
              "Docker Containerization & Kubernetes Cluster Orchestration",
              "CI/CD Pipelines with GitHub Actions & AWS Cloud Deployment (EC2, S3, RDS)",
              "5 Mock Technical Interviews + 100% Placement Drives with 500+ Companies",
            ],
          },
        ],
      },
      {
        id: "swe-bootcamp-6m",
        tierId: "bootcamp-6m",
        title: "Full Stack Web Developer 6-Month Career Bootcamp",
        subtitle: "MERN Stack • Real-world Enterprise Portfolios • 100% Placement Assistance",
        category: "Software Engineering",
        duration: "6 Months",
        level: "Fastrack Job Switchers",
        mode: "Daily Live Code Labs",
        price: 21999,
        originalPrice: 48999,
        instructor: "Senior SDE Mentors Panel",
        instructorRole: "Senior Engineers from Tier-1 Tech",
        highlights: [
          "Hands-on building of 6 production-grade full-stack applications",
          "Comprehensive Git, GitHub, CI/CD and deployment workflows",
          "Dedicated resume review, LinkedIn optimization & referral network",
        ],
        description:
          "Fast-track bootcamp designed for graduates and working professionals aiming to switch into software developer roles within 6 months.",
        curriculum: [
          {
            subject: "Core MERN Stack Mastery",
            topics: [
              "Modern JavaScript ES6+ & TypeScript Essentials",
              "React Component Trees, State Management & Tailwind CSS",
              "Node.js REST APIs with Express & MongoDB",
              "Full Deployment to Vercel and Render with live URLs",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-ai",
    title: "Data Science, AI & Machine Learning",
    shortName: "Data Science & AI",
    category: "Data Science & AI",
    icon: FaChartLine,
    badge: "Highest Data CTC: ₹38 LPA",
    color: "from-purple-700 to-indigo-950",
    leadDesc:
      "Transform into a high-demand Data Scientist and AI/ML Engineer. Master Python, PyTorch, Scikit-Learn, Big Data PySpark, Large Language Models (LLMs), RAG pipelines, and MLOps deployment.",
    eligibility: "STEM Graduates, BCA, MCA, Engineers, Analysts",
    avgPackage: "₹9.5 - 28 LPA",
    hiringPartners: ["Tiger Analytics", "Mu Sigma", "Fractal", "Deloitte", "Accenture", "Infosys"],
    batches: [
      {
        id: "ds-master-12m",
        tierId: "diploma-12m",
        title: "National Diploma in Data Science, Machine Learning & GenAI",
        subtitle: "12 Months Comprehensive • PyTorch, PySpark, LLMs, MLOps & Paid Corporate Internship",
        category: "Data Science & AI",
        duration: "12 Months",
        level: "Beginner to Chief Data Scientist",
        mode: "Live Interactive + Kaggle Sprints",
        price: 39999,
        originalPrice: 79999,
        instructor: "Miss Shagun Shrivastav & Dr. Gulshan Kumar",
        instructorRole: "Chief Data Scientists with 15+ Yrs Industry Exp",
        highlights: [
          "140 Comprehensive Modules covering classical ML to Generative AI",
          "Distributed Big Data with Apache Spark & PySpark on AWS",
          "Guaranteed 3-Month Paid Corporate Internship + 100% Placement Guarantee",
        ],
        description:
          "Our flagship data program. Train predictive algorithms, build computer vision & NLP models, fine-tune open-source LLMs (Llama 3), and deploy production endpoints.",
        curriculum: [
          {
            subject: "Month 1-3: Python, SQL & Exploratory Data Analysis",
            topics: [
              "Python Programming: NumPy, Pandas, Vectorized Mathematics",
              "Advanced SQL: Window Functions, CTEs, Joins & Database Modeling",
              "Data Visualization: Seaborn, Matplotlib & Power BI Storytelling",
              "Statistical Foundations: Probability, Distributions & Hypothesis Testing",
            ],
          },
          {
            subject: "Month 4-6: Machine Learning & Predictive Analytics",
            topics: [
              "Supervised Learning: Linear/Logistic Regression, Decision Trees, Random Forests",
              "Ensemble Models: XGBoost, LightGBM, CatBoost & Hyperparameter Tuning",
              "Unsupervised Learning: K-Means, Hierarchical Clustering, PCA Dimensionality",
              "Feature Engineering & Cross-Validation pipelines with Scikit-Learn",
            ],
          },
          {
            subject: "Month 7-9: Deep Learning, NLP & Generative AI",
            topics: [
              "Neural Networks Architecture with PyTorch & Backpropagation",
              "Computer Vision: CNNs, Transfer Learning with ResNet & YOLO",
              "Natural Language Processing: Transformers, BERT, Hugging Face",
              "Generative AI: LLM Fine-Tuning (LoRA), RAG Pipelines & LangChain",
            ],
          },
          {
            subject: "Month 10-12: Big Data, MLOps & Placement Drives",
            topics: [
              "Distributed Computing with Apache Spark & PySpark",
              "MLOps: Docker, FastAPI REST Endpoints, MLflow & Cloud Serving",
              "Paid Internship Execution & Corporate Hiring Drives",
            ],
          },
        ],
      },
      {
        id: "ds-bootcamp-6m",
        tierId: "bootcamp-6m",
        title: "Advanced Data Science & Machine Learning Bootcamp",
        subtitle: "6 Months Intensive • Python, ML, Deep Learning & Streamlit Deployment",
        category: "Data Science & AI",
        duration: "6 Months",
        level: "Applied Data Specialists",
        mode: "Daily Live Code Labs",
        price: 24999,
        originalPrice: 49999,
        instructor: "Senior Data Science Mentors",
        instructorRole: "AI Practitioners & Kaggle Grandmasters",
        highlights: [
          "8 Real-world ML projects with interactive cloud dashboards",
          "Complete hands-on Kaggle and GitHub portfolio setup",
          "Dedicated placement assistance with 5 mock technical interviews",
        ],
        description:
          "6-month applied track to master mathematical statistics, supervised algorithms, and neural networks with real industry datasets.",
        curriculum: [
          {
            subject: "Machine Learning Applied Modules",
            topics: [
              "Python Scientific Computing & Statistics",
              "Regression, Classification & Clustering Models",
              "Deep Learning Fundamentals with PyTorch",
              "Model Deployment on Streamlit Cloud & FastAPI",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Business Intelligence",
    shortName: "Data Analytics",
    category: "Analytics & BI",
    icon: FaChartLine,
    badge: "Highest Business CTC: ₹18 LPA",
    color: "from-amber-600 to-orange-800",
    leadDesc:
      "Master modern corporate business intelligence. Complete proficiency in Advanced Excel modeling, SQL relational queries, Power BI DAX & dashboards, Tableau visualizations, and automated business reporting.",
    eligibility: "Any Graduate, B.Com, BBA, BCA, B.Tech, Arts",
    avgPackage: "₹6 - 15 LPA",
    hiringPartners: ["KPMG", "EY", "PwC", "Genpact", "Wipro", "Cognizant"],
    batches: [
      {
        id: "da-master-12m",
        tierId: "diploma-12m",
        title: "Diploma in Business Analytics & Corporate Intelligence",
        subtitle: "12 Months Flagship • Advanced Excel, SQL, Power BI, Python & Paid Internship",
        category: "Analytics & BI",
        duration: "12 Months",
        level: "Beginner to BI Consultant",
        mode: "Live + Corporate Case Studies",
        price: 29999,
        originalPrice: 59999,
        instructor: "Deepanshu Soni & Dr. Gulshan Kumar",
        instructorRole: "BI Architects & Corporate Analytics Heads",
        highlights: [
          "92 Practical Modules across 12 monthly phases",
          "12 Major Corporate Capstones (E-commerce, Retail, Healthcare, Fintech)",
          "Guaranteed 3-Month Paid Corporate Internship + 100% Placement Guarantee",
        ],
        description:
          "Convert raw business numbers into executive decisions. Build interactive KPI dashboards that corporate CXOs and department heads rely on.",
        curriculum: [
          {
            subject: "Phase 1: Advanced Excel & Business Math",
            topics: [
              "Lookup Functions: XLOOKUP, INDEX-MATCH, Dynamic Array Formulas",
              "Power Query ETL: Cleaning messy data, Unpivoting, Merging",
              "Pivot Tables, Slicers, Conditional Formatting & KPI Dashboards",
            ],
          },
          {
            subject: "Phase 2: Relational Databases & SQL",
            topics: [
              "DDL, DML, Constraints, Normalization & ER Diagrams",
              "Complex Queries: Joins, Subqueries, CTEs, Window Functions",
              "Data Aggregations, Grouping Sets & Business Problem Solving",
            ],
          },
          {
            subject: "Phase 3: Power BI & Tableau Visual Analytics",
            topics: [
              "Data Modeling: Star Schema, Snowflake Schema, Relationships",
              "DAX Formulas: CALCULATE, Time Intelligence, Filter Context",
              "Interactive Executive Visualizations, Drill-downs & Row-Level Security",
            ],
          },
          {
            subject: "Phase 4: Python for Analytics & Corporate Internship",
            topics: [
              "Python Pandas & Seaborn for Automated Reporting",
              "Paid Internship with real client deliverables & hiring drives",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "digital-growth",
    title: "Digital Marketing & Growth Performance",
    shortName: "Digital Growth",
    category: "Digital Growth & Marketing",
    icon: FaBriefcase,
    badge: "Agency Internship Included",
    color: "from-emerald-700 to-teal-900",
    leadDesc:
      "Become a full-funnel Growth Marketer. Run live ad campaigns with real budgets across Google Ads, Meta Ads (Instagram/Facebook), SEO, Content Marketing, AI Automation, GA4, and E-commerce scaling.",
    eligibility: "Any Graduate, 12th Pass, Entrepreneurs, Marketers",
    avgPackage: "₹5.5 - 16 LPA",
    hiringPartners: ["Dentsu", "GroupM", "Ogilvy", "Zomato", "Nykaa", "Dizital Adda Agency"],
    batches: [
      {
        id: "dm-expert-12m",
        tierId: "diploma-12m",
        title: "Master Program in Digital Marketing & AI Growth Architecture",
        subtitle: "12 Months Comprehensive • 55 Modules, 60+ AI Tools, Live Ad Budgets & Paid Agency Internship",
        category: "Digital Growth & Marketing",
        duration: "12 Months",
        level: "Beginner to Agency Director",
        mode: "Live Hybrid + Agency Labs",
        price: 24999,
        originalPrice: 49999,
        instructor: "Dr. Gulshan Kumar & 8 Agency Directors",
        instructorRole: "Founder Dizital Adda, 14+ Yrs Marketing Authority",
        highlights: [
          "55 Comprehensive Modules with live ad budgets provided by the institute",
          "In-House Paid Agency Internship with real enterprise brands",
          "15+ Global Certifications (Google, Meta, HubSpot) + 100% Placement Guarantee",
        ],
        description:
          "The most authoritative digital marketing diploma in India. Build WordPress websites, master SEO ranking, scale ROI on Google & Meta Ads, and automate workflows with AI.",
        curriculum: [
          {
            subject: "Website Architecture & Organic Search (SEO)",
            topics: [
              "WordPress Website Creation from scratch without coding",
              "On-Page SEO, Keyword Research, Search Intent & Semantic HTML",
              "Technical SEO: Schema Markup, Core Web Vitals, Crawling & Indexing",
              "Off-Page SEO: High-Authority Backlinks, Digital PR & Outreach",
            ],
          },
          {
            subject: "Paid Performance Marketing (Google & Meta)",
            topics: [
              "Google Search, Display, Video & Performance Max Campaigns",
              "Meta Ads Manager: Pixel Tracking, Custom/Lookalike Audiences, CBO",
              "Copywriting & Creative Ad Design with Canva Pro & AI Tools",
            ],
          },
          {
            subject: "Analytics, AI Automation & Agency Internship",
            topics: [
              "Google Analytics 4 (GA4), Tag Manager & Attribution Models",
              "Email Marketing Automation & WhatsApp Chatbot Funnels",
              "3-Month Paid Agency Internship managing real customer accounts",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cyber-security",
    title: "Cyber Security, Ethical Hacking & Forensics",
    shortName: "Cyber Security",
    category: "Information Security",
    icon: FaShieldAlt,
    badge: "Highest Security CTC: ₹32 LPA",
    color: "from-red-700 to-zinc-950",
    leadDesc:
      "Protect enterprise digital infrastructure from cyber threats. Master Network Security, Ethical Hacking, Web Application Penetration Testing (VAPT), Bug Bounty, Digital Forensics, and SOC Analyst incident response.",
    eligibility: "B.Tech, BCA, MCA, IT Specialists, Security Enthusiasts",
    avgPackage: "₹8 - 26 LPA",
    hiringPartners: ["Palo Alto Networks", "CrowdStrike", "Cisco", "EY", "KPMG", "Wipro"],
    batches: [
      {
        id: "cyber-master-12m",
        tierId: "diploma-12m",
        title: "National Diploma in Cyber Security, Ethical Hacking & SOC Defense",
        subtitle: "12 Months Flagship • CEH Prep, Penetration Testing, Bug Bounty & Security Labs",
        category: "Information Security",
        duration: "12 Months",
        level: "Beginner to Security Architect",
        mode: "Live Interactive + Virtual Range",
        price: 34999,
        originalPrice: 69999,
        instructor: "Certified Ethical Hackers & Security Researchers",
        instructorRole: "Offensive Security Certified Specialists",
        highlights: [
          "Hands-on labs on Kali Linux, Metasploit, Burp Suite, Wireshark, Nmap",
          "Real-world CTF (Capture the Flag) challenges & Bug Bounty hunting",
          "100% Placement Guarantee + Corporate Security Internship",
        ],
        description:
          "Step into high-paying cybersecurity careers. Learn to think like a black-hat hacker to defend enterprise servers, cloud infrastructure, and APIs.",
        curriculum: [
          {
            subject: "Networking & Linux Security Foundations",
            topics: [
              "TCP/IP, OSI Model, Subnetting, Firewalls & VPNs",
              "Linux Command Line, Bash Scripting & System Hardening",
              "Information Gathering, Passive/Active Reconnaissance & Nmap Scanning",
            ],
          },
          {
            subject: "Web Application Penetration Testing (OWASP Top 10)",
            topics: [
              "SQL Injection, Cross-Site Scripting (XSS), CSRF & SSRF",
              "Broken Authentication, Authorization & Security Misconfigurations",
              "Burp Suite Professional: Intercepting, Fuzzing & Exploitation",
            ],
          },
          {
            subject: "SOC Analyst Operations & Digital Forensics",
            topics: [
              "SIEM Tools (Splunk, QRadar), Log Analysis & Incident Response",
              "Memory Forensics, Disk Imaging & Malware Reverse Engineering basics",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud Computing, DevOps & SRE",
    shortName: "Cloud & DevOps",
    category: "Cloud Infrastructure",
    icon: FaCloud,
    badge: "High-Demand SRE Track",
    color: "from-cyan-700 to-blue-950",
    leadDesc:
      "Bridge software engineering and production IT operations. Master Linux administration, AWS/Azure Cloud Infrastructure, Docker containerization, Kubernetes cluster orchestration, Terraform IaC, and CI/CD pipelines.",
    eligibility: "B.Tech, BCA, MCA, System Admins, Developers",
    avgPackage: "₹8.5 - 25 LPA",
    hiringPartners: ["Red Hat", "Cognizant", "Capgemini", "IBM", "HCLTech", "L&T Infotech"],
    batches: [
      {
        id: "devops-bootcamp-6m",
        tierId: "bootcamp-6m",
        title: "Enterprise DevOps & Cloud Architect Career Bootcamp",
        subtitle: "6 Months Intensive • AWS, Docker, Kubernetes, Jenkins, Terraform & Prometheus",
        category: "Cloud Infrastructure",
        duration: "6 Months",
        level: "DevOps & Cloud Engineers",
        mode: "Live Practical Cloud Labs",
        price: 24999,
        originalPrice: 54999,
        instructor: "Certified AWS & Kubernetes Architects",
        instructorRole: "Lead Cloud Infrastructure Engineers",
        highlights: [
          "Hands-on building of 8 end-to-end automated deployment pipelines",
          "Complete Infrastructure as Code (IaC) with Terraform & Ansible",
          "Placement drives with top MNCs looking for certified DevOps engineers",
        ],
        description:
          "Master continuous integration, deployment, and resilient infrastructure. Learn to automate the modern cloud software lifecycle.",
        curriculum: [
          {
            subject: "Cloud & DevOps Full Stack",
            topics: [
              "Linux Server Administration & Shell Scripting",
              "AWS Cloud: EC2, VPC, IAM, S3, RDS, Lambda & CloudFront",
              "Docker Containers & Microservices Architecture",
              "Kubernetes Cluster Architecture, Pods, Deployments & Services",
              "CI/CD with Jenkins & GitHub Actions",
              "Terraform Infrastructure as Code & Prometheus/Grafana Monitoring",
            ],
          },
        ],
      },
    ],
  },
];

// Flat list of all placement courses for card rendering
const ALL_PLACEMENT_COURSES = PLACEMENT_DOMAINS.flatMap((dom) =>
  dom.batches.map((batch) => ({
    ...batch,
    domainId: dom.id,
    domainName: dom.shortName,
  }))
);

// ==========================================
// MAIN PLACEMENT PORTAL COMPONENT
// ==========================================
export default function Placement() {
  const navigate = useNavigate();

  // Multi-step navigation state: 1: Domains, 2: CourseCard Batches, 3: Deep Dive
  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState(PLACEMENT_DOMAINS[0]);
  const [selectedBatchTier, setSelectedBatchTier] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Step 3 Deep Dive Tab State
  const [activeTab, setActiveTab] = useState("roadmap"); // roadmap | projects | partners | aiMentor | fees
  const [curriculumSearch, setCurriculumSearch] = useState("");
  const [expandedSubjectIdx, setExpandedSubjectIdx] = useState(0);

  // Counselor Modal State
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [counselorForm, setCounselorForm] = useState({ name: "", phone: "", track: "FullStack" });

  const displayedCourses = ALL_PLACEMENT_COURSES.filter((c) => {
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
    setActiveTab("roadmap");
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
      setCounselorForm({ name: "", phone: "", track: "FullStack" });
    }, 2500);
  };

  return (
    <div className="bg-[#080E1A] min-h-screen text-slate-100 font-sans selection:bg-[#D4A017] selection:text-slate-950">
      {/* =========================================================================
          HERO SECTION (Classical Navy + Gold Accents + Live Placement Stats)
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#080E1A] border-b border-slate-800/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb & Step Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Placement & Career Accelerator Portal</span>
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
                <span>Select Career Track</span>
              </button>
              <span className="text-slate-600">→</span>
              <button
                onClick={() => setStep(2)}
                className={`px-3 py-1 rounded-full transition font-bold flex items-center gap-1.5 ${
                  step === 2 ? "bg-[#D4A017] text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <span>2</span>
                <span>Choose Program</span>
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
                <span>Roadmap & Placement</span>
              </button>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="text-center max-w-4xl mx-auto mt-10">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              100% Placement Guarantee with Legal Agreement
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Launch High-Paying Tech Careers at <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                MNCs, Unicorns & Global Startups
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Job-guaranteed bootcamps in Software Engineering, Data Science & AI, Data Analytics, Digital Growth, and Cloud DevOps. Featuring paid industry internships, 1-on-1 technical mock interviews, and direct hiring drives with 500+ corporate recruiters.
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowCounselorModal(true)}
                className="bg-gradient-to-r from-[#D4A017] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-7 py-3.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <FaPhoneAlt className="text-xs" />
                Book Free Career Counseling
              </button>

              <a
                href="https://wa.me/918810606010?text=Hi%2C+I+want+information+about+100%25+Placement+Guarantee+Programs"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center gap-2 border border-emerald-400/30"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp Placement Desk
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

            {/* Live Placement Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">₹50 LPA</div>
                <div className="text-xs text-slate-400 mt-1">Highest Package Offered</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">₹12.5 LPA</div>
                <div className="text-xs text-slate-400 mt-1">Average Graduate Package</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">500+</div>
                <div className="text-xs text-slate-400 mt-1">Active Hiring Partners</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">Placement Guarantee Support</div>
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
            STEP 1: SELECT CAREER DOMAIN
        ===================================================================== */}
        {step === 1 && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step 1 of 3</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Select Your Desired Career Specialization
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Choose the domain that matches your career aspirations to explore salary trends, hiring partners, curriculum roadmaps, and guaranteed interview bootcamps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLACEMENT_DOMAINS.map((domain) => {
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

                      {/* Info Metrics */}
                      <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Average CTC:</span>
                          <span className="font-bold text-amber-400">{domain.avgPackage}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Eligibility:</span>
                          <span className="font-bold text-slate-200 truncate max-w-[180px]">{domain.eligibility}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Active Programs:</span>
                          <span className="font-bold text-slate-200">{domain.batches.length} Tracks Available</span>
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full bg-slate-800 group-hover:bg-[#D4A017] text-slate-300 group-hover:text-slate-950 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2">
                      <span>Explore {domain.shortName} Programs</span>
                      <FaChevronRight className="text-[10px]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 2: SELECT CAREER PROGRAM / COURSE CARDS GRID
        ===================================================================== */}
        {step === 2 && (
          <div>
            {/* Active Header */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-2xl transition"
                  title="Back to all career tracks"
                >
                  <FaUndo className="text-sm" />
                </button>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <span>Career Track</span>
                    <span>•</span>
                    <span>{selectedDomain.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {selectedDomain.title} Programs
                  </h2>
                </div>
              </div>

              {/* Track Switcher */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 font-bold">Switch Track:</label>
                <select
                  value={selectedDomain.id}
                  onChange={(e) => {
                    const found = PLACEMENT_DOMAINS.find((d) => d.id === e.target.value);
                    if (found) setSelectedDomain(found);
                  }}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold py-2 px-3 rounded-xl focus:outline-none focus:border-amber-400"
                >
                  {PLACEMENT_DOMAINS.map((d) => (
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
                  placeholder="Search program or technology..."
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
                <h3 className="text-lg font-bold text-white">No Programs Found</h3>
                <p className="text-xs text-slate-400 mt-1">Try switching the program tier or clearing search.</p>
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
                      <span>View Career Roadmap & Curriculum →</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            STEP 3: COMPLETE PROGRAM DEEP DIVE (Roadmap, Projects, Partners, Fees)
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
                  Back to Programs
                </button>
                <span className="text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full">
                  100% Placement Guaranteed Track
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
                    0% EMI starting at ₹{Math.round(selectedCourse.price / 6).toLocaleString("en-IN")}/mo
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
                { id: "roadmap", label: "Curriculum & Learning Roadmap" },
                { id: "projects", label: "Enterprise Capstones & Portfolio" },
                { id: "partners", label: "500+ Hiring Partners & CTC" },
                { id: "aiMentor", label: "AI Mock Interviewer & Player" },
                { id: "fees", label: "Tuition & 0% EMI Options" },
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

            {/* TAB: ROADMAP */}
            {activeTab === "roadmap" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Full Practical Phase-by-Phase Roadmap</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Progressively designed from foundational syntaxes to production-grade architectures and enterprise deployment.
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search module or tool..."
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
                                {filteredTopics.length} Industry-Tested Modules
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

            {/* TAB: PROJECTS */}
            {activeTab === "projects" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Live Enterprise Capstone Projects</h3>
                <p className="text-xs text-slate-400">
                  Graduate with a battle-tested GitHub portfolio that recruiters value over plain academic certificates.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-amber-400 font-black text-xl">Real Client Projects</div>
                    <div className="text-sm font-bold text-white mt-1">Production Codebases</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Work on real-world enterprise architectures, live database schemas, and actual user traffic flows.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-blue-400 font-black text-xl">Paid Agency Internship</div>
                    <div className="text-sm font-bold text-white mt-1">3-Month Work Experience Letter</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Every 12-month master student receives an official corporate internship appointment letter and monthly stipend.
                    </p>
                  </div>
                  <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
                    <div className="text-emerald-400 font-black text-xl">100% Code Review</div>
                    <div className="text-sm font-bold text-white mt-1">Senior Tech Lead Audits</div>
                    <p className="text-xs text-slate-400 mt-2">
                      Your PRs and commits are reviewed by senior developers from top product firms to teach clean production standards.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PARTNERS */}
            {activeTab === "partners" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">500+ Corporate Hiring Partners</h3>
                <p className="text-xs text-slate-400">
                  Direct interview scheduling with top product MNCs, unicorns, and fast-growing digital agencies.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
                  {["Amazon", "Microsoft", "Google", "TCS", "Infosys", "Wipro", "Swiggy", "Zomato", "Deloitte", "Cognizant", "HCL Tech", "Paytm"].map((company) => {
                    const LogoComp = COMPANY_LOGO_MAP[company];
                    return (
                      <div key={company} className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-center flex flex-col items-center justify-between min-h-[95px] hover:border-amber-500/50 transition">
                        <div className="bg-white rounded-xl px-2 py-2 w-full flex items-center justify-center my-auto min-h-[38px]">
                          {LogoComp ? <LogoComp /> : <span className="font-bold text-slate-800 text-xs">{company}</span>}
                        </div>
                        <div className="text-[10px] text-amber-400 font-semibold mt-2">Active Recruiter</div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4 mt-6">
                  <div>
                    <h4 className="text-sm font-bold text-white">Placement Support Timeline</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Placement assistance begins in Month 5 with dedicated mock rounds, ATS resume tailoring, and direct corporate HR referrals.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCounselorModal(true)}
                    className="bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs"
                  >
                    View Placement Report
                  </button>
                </div>
              </div>
            )}

            {/* TAB: AI MENTOR */}
            {activeTab === "aiMentor" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-lg">
                    <FaRegLightbulb />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Technical Interview Simulator & Player</h3>
                    <p className="text-xs text-slate-400">
                      Practice real technical interview questions and get scored on code efficiency, system design, and communication.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="text-sm font-bold text-amber-300">🤖 AI Interview Coach</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Simulate real technical screenings for SDE, Data Analyst, and Marketer roles. Receive instant feedback on code complexity, edge cases, and confidence score.
                    </p>
                    <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                      "Prompt: Run a 15-minute mock interview on React Redux state management and event bubbling."
                    </div>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
                    <div className="text-sm font-bold text-blue-300">🛡️ DRM Protected HD Player</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Smooth, distraction-free video player with smart anti-piracy protection, variable speed playback, bookmarking, and offline download support on the mobile app.
                    </p>
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-2">
                      <FaCheckCircle /> Protected by Dizital Adda Enterprise Player Security
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FEES */}
            {activeTab === "fees" && (
              <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Tuition & Zero-Cost Installments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="text-xs text-slate-400 font-bold uppercase">Upfront Tuition Payment</div>
                    <div className="text-3xl font-black text-amber-400">
                      ₹{selectedCourse.price?.toLocaleString("en-IN")}
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> Full Live Bootcamp + Code Repository Access
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> 100% Placement Guarantee (with legal agreement)
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-400" /> 3-Month Paid Internship appointment
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowCounselorModal(true)}
                      className="w-full bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs transition"
                    >
                      Enroll Now (Instant Onboarding)
                    </button>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="text-xs text-slate-400 font-bold uppercase">0% Interest Monthly Installments</div>
                    <div className="text-3xl font-black text-blue-400">
                      ₹{Math.round(selectedCourse.price / 6).toLocaleString("en-IN")} / month
                    </div>
                    <p className="text-xs text-slate-300">
                      No heavy upfront burden. Pay in 6 or 9 interest-free equal installments without credit card lockups.
                    </p>
                    <a
                      href={`https://wa.me/918810606010?text=Hi%2C+I+want+to+apply+for+0%25+EMI+in+${encodeURIComponent(
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
            <p className="text-xs text-slate-400 mt-1">Frequently asked questions regarding our career programs and hiring drives.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "How does the 100% Placement Guarantee work?",
                a: "For all 12-month Master Diploma programs, we sign a formal placement agreement. We prepare you with projects, resume optimization, and mock technical rounds, and provide unlimited interview calls till you receive your offer letter.",
              },
              {
                q: "Can non-engineering or non-coding students join?",
                a: "Yes! Over 40% of our successful alumni come from non-tech backgrounds (B.Com, BA, BBA, B.Sc). Our mentors teach programming and logical thinking from absolute zero.",
              },
              {
                q: "Are the classes live or pre-recorded?",
                a: "All core concepts are taught in live interactive classes with screen-sharing and doubt clinics. Every session is recorded in 1080p for lifetime revision.",
              },
              {
                q: "What is the average duration of the hiring phase?",
                a: "Most students receive their job offers within 30 to 60 days of completing their capstone project and technical clearance.",
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
          <h3 className="text-2xl sm:text-3xl font-black text-white">Unsure Which Tech Track Offers the Best ROI?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2">
            Schedule a free 1-on-1 profile evaluation with our senior industry mentors. We will review your background and suggest the highest-paying tech roadmap for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowCounselorModal(true)}
              className="bg-[#D4A017] hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition shadow-lg"
            >
              Request Free Profile Evaluation Call
            </button>
            <a
              href="https://wa.me/918810606010?text=Hi%2C+please+evaluate+my+profile+for+tech+placements"
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
                  Our career placement advisor will call you within 15 minutes to evaluate your profile and discuss hiring tracks.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCounselorSubmit} className="space-y-4">
                <div className="text-xs font-bold text-amber-400 uppercase">Tech Placement Advisory</div>
                <h4 className="text-xl font-black text-white">Speak to a Senior Career Advisor</h4>
                <p className="text-xs text-slate-400">
                  Enter your details to receive an instant callback and customized placement roadmap.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Mehra"
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
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Preferred Career Track</label>
                    <select
                      value={counselorForm.track}
                      onChange={(e) => setCounselorForm({ ...counselorForm, track: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="FullStack">Full Stack Software Engineering</option>
                      <option value="DataScience">Data Science & Machine Learning</option>
                      <option value="DataAnalytics">Data Analytics & Power BI</option>
                      <option value="DigitalMarketing">Digital Marketing & Growth</option>
                      <option value="CyberSecurity">Cyber Security & Ethical Hacking</option>
                      <option value="CloudDevOps">Cloud Computing & DevOps</option>
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