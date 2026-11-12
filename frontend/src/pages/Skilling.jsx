import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaChartLine,
  FaDatabase,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaAward,
  FaRocket,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaPhoneAlt,
  FaCalendarAlt,
  FaUsers,
  FaCheck,
  FaUndo,
  FaExternalLinkAlt,
  FaWhatsapp,
  FaSearch,
  FaBullhorn,
  FaLaptopCode,
  FaPalette,
  FaVideo,
  FaLayerGroup,
  FaUserTie,
  FaBookOpen,
  FaQuestionCircle,
} from "react-icons/fa";
import { EXPERT_DIGITAL_MARKETING_DETAILS } from "../data/expertDigitalMarketingData.js";
import { ADVANCED_DIGITAL_MARKETING_DETAILS } from "../data/advancedDigitalMarketingData.js";
import { PROFESSIONAL_DIGITAL_MARKETING_DETAILS } from "../data/professionalDigitalMarketingData.js";
import { BEGINNER_DIGITAL_MARKETING_DETAILS } from "../data/beginnerDigitalMarketingData.js";
import {
  NIDADS_CERTIFICATION_DATA_ANALYTICS,
  NIDADS_ADVANCED_DATA_ANALYTICS,
  NIDADS_DIPLOMA_DATA_ANALYTICS,
} from "../data/nidadsDataAnalyticsData.js";
import { getDomainContactInfo } from "../utils/courseNavigation";
import {
  NIDADS_ADVANCED_DATA_SCIENCE,
  NIDADS_DIPLOMA_DATA_SCIENCE,
} from "../data/nidadsDataScienceData.js";
import {
  FOUNDATION_CYBER_SECURITY_DETAILS,
  ADVANCED_CYBER_SECURITY_DETAILS,
  EXPERT_CYBER_SECURITY_DETAILS,
  DIGITAL_FORENSICS_DETAILS,
  BUG_BOUNTY_DETAILS,
} from "../data/cyberSecurityData.js";
import {
  FOUNDATION_AI_PROMPT_DETAILS,
  ADVANCED_AI_AGENTS_DETAILS,
  MASTER_AI_ENGINEERING_DETAILS,
} from "../data/aiPromptEngineeringData.js";
import TrackComparisonSection from "../components/TrackComparisonSection.jsx";
import StudentTestimonialSlider from "../components/StudentTestimonialSlider.jsx";
import HiringPartnersStrip from "../components/HiringPartnersStrip.jsx";
import Footer from "../components/Footer";

// ==========================================
// DURATION DEFINITIONS
// ==========================================
const DURATION_OPTIONS = [
  {
    id: "3-months",
    duration: "3 Months",
    name: "Beginner Level Track",
    badge: "Beginner",
    hoursPerWeek: "8 - 10 Hours / Week",
    liveHours: "60+ Hours Live Sessions",
    projects: "Guided & Mini Projects",
    mentorship: "Group Learning & Weekly Q&A",
    placementSupport: "Resume Review & Dizital Adda Job Board Access",
    certification: "Completion Certificate",
    roadmap: [
      { phase: "Month 1", title: "Core Fundamentals & Tooling Setup", desc: "Environment setup, fundamental theory, syntax, and essential tools." },
      { phase: "Month 2", title: "Applied Concepts & Hands-on Exercises", desc: "Hands-on implementation of core tools, libraries, and real exercises." },
      { phase: "Month 3", title: "Guided Capstone & Portfolio Review", desc: "Building a working portfolio project with mentor feedback." },
    ],
  },
  {
    id: "4-months",
    duration: "4 Months",
    name: "Professional Level Track",
    badge: "Professional",
    hoursPerWeek: "10 - 12 Hours / Week",
    liveHours: "90+ Hours Live Sessions",
    projects: "Mini Projects & Real Exercises",
    mentorship: "Weekly Mentorship",
    placementSupport: "Placement Portal Access & Resume Review",
    certification: "Digital Certificate",
    roadmap: [
      { phase: "Month 1", title: "Core Concepts & Essential Skills", desc: "Foundational mastery, industry best practices, and standard tooling." },
      { phase: "Month 2", title: "Applied Specialization & Workflows", desc: "Executing real workflows, campaign and system setups." },
      { phase: "Month 3", title: "Analytics, Optimization & Mini Projects", desc: "Data-driven performance tuning, A/B tests & mini project reviews." },
      { phase: "Month 4", title: "Capstone Execution & Interview Prep", desc: "Final practical project evaluation and interview question drill." },
    ],
  },
  {
    id: "6-months",
    duration: "6 Months",
    name: "Advanced Level Track",
    badge: "Advanced",
    hoursPerWeek: "12 - 15 Hours / Week",
    liveHours: "150+ Hours Live Sessions",
    projects: "Practice Projects + Major Capstone",
    mentorship: "Group Mentorship & 1:1 Reviews",
    placementSupport: "Dedicated Placement Support + 5 Mock Technical Interviews",
    certification: "Course Certification + ISO Verified",
    roadmap: [
      { phase: "Month 1 - 2", title: "Advanced Architecture & Mechanics", desc: "Deep dive into language mechanics, design patterns, and architecture." },
      { phase: "Month 3 - 4", title: "Production Workflows & Integrations", desc: "Building scalable production systems, data persistence & security." },
      { phase: "Month 5 - 6", title: "Enterprise Capstone & Placement Prep", desc: "Full-scale enterprise project deployment, mock interviews & hiring drives." },
    ],
  },
  {
    id: "12-months",
    duration: "12 Months",
    name: "Expert Level Track",
    badge: "Expert",
    hoursPerWeek: "15 - 20 Hours / Week",
    liveHours: "300+ Hours Live Sessions",
    projects: "Real Project Portfolio + 2 Major Capstones",
    mentorship: "1-on-1 Mentorship & Leadership Coaching",
    placementSupport: "100% Placement Guarantee (with formal agreement)",
    certification: "Industry Certification + Internship Letter",
    roadmap: [
      { phase: "Month 1 - 3", title: "Comprehensive Foundations & Strategy", desc: "Deep foundational knowledge, strategy development & tool mastery." },
      { phase: "Month 4 - 6", title: "Advanced Execution & High-Budget Ops", desc: "Managing enterprise workflows, complex campaigns & predictive analytics." },
      { phase: "Month 7 - 9", title: "Real Client Projects & Paid Internship", desc: "Working on live client mandates, real budgets & leadership sprints." },
      { phase: "Month 10 - 12", title: "Placement Drives & Guaranteed Offers", desc: "Dedicated placement desk, executive referrals & offer negotiations." },
    ],
  },
];

// ==========================================
// 4 CORE DOMAINS (EXACT AS REQUESTED)
// ==========================================
const DOMAINS = [
  // 1. Digital Marketing (EXACT FROM USER SCREENSHOTS)
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Beginner, Professional, Advanced & Expert Level Programs",
    icon: <FaChartLine />,
    badge: "High ROI & Demand",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    avgSalary: "₹4.5 - ₹18 LPA",
    description:
      "Industry-accredited Digital Marketing tracks from Beginner (3 Months), Professional (4 Months), Advanced (6 Months), to Expert Level (12 Months) with AI Tools integration.",
    availableDurationIds: ["3-months", "4-months", "6-months", "12-months"],
    coursesByDuration: {
      "3-months": [
        {
          id: "dm-beginners",
          title: "Digital Marketing for Beginners Course in Delhi",
          details: BEGINNER_DIGITAL_MARKETING_DETAILS,
          subtitle: "30 Basic Modules • 40+ AI Tools Introduction • 10 Live Brand Projects",
          duration: "3 Months",
          durationId: "3-months",
          level: "BEGINNER LEVEL",
          levelColor: "border-amber-400 text-amber-700 bg-amber-50",
          checkColor: "text-amber-500",
          modulesCount: "30",
          modulesType: "Core Foundational Modules",
          aiToolsCount: "40+",
          aiToolsType: "AI Marketing & Automation Tools",
          hoursPerWeek: "8 - 10 Hours / Week",
          modulesPill: "30 Basic Modules • 40+ AI Tools • 10 Live Projects",
          shortDesc: "Comprehensive 3-month foundational course covering SEO, Meta Ads, Google Ads, Content Writing, 40+ AI tools, and 10 live projects.",
          projectsHighlight: "10 Live Brand Projects",
          certHighlight: "10+ Global Certifications (Google, Meta, HubSpot)",
          price: 25000,
          originalPrice: 30000,
          onlinePrice: 25000,
          offlinePrice: 30000,
          emi: "₹2,499/mo",
          projects: "10 Live Brand Projects",
          mentorship: "Guided Mentorship with Dr. Gulshan Kumar & 8 Industry Practitioners",
          certification: "Dizital Adda Official Certification + 10 Global Certifications",
          perfectFor: "Students, 12th Pass, Fresh Graduates, Homemakers & Small Business Owners",
          perfectForBg: "bg-amber-50/80 border-amber-200 text-amber-900",
          enrollUrl: "https://dizitaladda.com/courses/digital-marketing-for-beginners",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+am+interested+in+the+Digital+Marketing+For+Beginners+Course",
          featureList: [
            "30 Practical Modules across 14 Domains",
            "40+ AI Tools (ChatGPT, Gemini, Canva AI)",
            "10 Live Brand Projects with Ad Budgets",
            "SEO, Google Ads & Meta Ads Mastery",
            "Canva Brand Design & Video Editing",
            "WordPress Website Build from Zero",
            "10+ Global Certifications (Google, Meta, HubSpot)",
            "100% Placement Assistance (500+ Partners)",
          ],
          modules: [
            "Digital Marketing Landscape & Consumer Mindsets",
            "Google Workspace & Search Infrastructure Tools",
            "Graphic Designing with Canva Pro & AI Tools",
            "Video Editing for Reels, Shorts & Ads (Filmora)",
            "WordPress Website Architecture & Design",
            "Content Writing, Copywriting & AI Generation",
            "Organic SEO (On-Page, Off-Page & Technical)",
            "Social Media Marketing (Instagram, Facebook & LinkedIn)",
            "Meta Ads & Google Ads Performance Campaigns",
            "Email & WhatsApp Marketing Automation",
            "Performance Marketing, GA4 & Freelancing Launch",
          ],
        },
      ],
      "4-months": [
        {
          id: "dm-professionals",
          title: "Digital Marketing For Professionals",
          subtitle: "40 Focused Modules • 50+ AI Tools Overview • 10 Live Brand Projects",
          duration: "4 Months",
          durationId: "4-months",
          level: "PROFESSIONAL LEVEL",
          levelColor: "border-emerald-400 text-emerald-700 bg-emerald-50",
          checkColor: "text-emerald-500",
          modulesCount: "40",
          modulesType: "Focused Professional Modules",
          aiToolsCount: "50+",
          aiToolsType: "AI Marketing & Automation Tools",
          hoursPerWeek: "10 - 12 Hours / Week",
          modulesPill: "40 Focused Modules • 50+ AI Tools • 10 Live Projects",
          shortDesc: "A 4-month, 80+ hour hybrid digital marketing course for working professionals, career switchers, and business owners. Covers 40 modules, 10 live brand projects & 50+ AI tools.",
          projectsHighlight: "10 Live Brand Projects",
          certHighlight: "10+ Global Certifications (Google, Meta, HubSpot)",
          price: 14999,
          originalPrice: 45000,
          onlinePrice: 14999,
          offlinePrice: 45000,
          emi: "₹3,750/mo",
          projects: "10 Live Brand Projects",
          mentorship: "Weekly Mentorship with Dr. Gulshan Kumar & 8 Industry Practitioners",
          certification: "10+ Global Certifications + Agency Internship Certificate",
          perfectFor: "Working Professionals, Career Switchers & Business Owners",
          perfectForBg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
          enrollUrl: "https://dizitaladda.com/courses/digital-marketing-for-professional",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Digital+Marketing+For+Professional+Course",
          details: PROFESSIONAL_DIGITAL_MARKETING_DETAILS,
          featureList: [
            "40 Focused Modules across 15 Domains",
            "50+ AI Marketing & Automation Tools",
            "10 Live Brand Projects with Ad Budgets",
            "SEO, Google Ads & Meta Ads Specialization",
            "Paid In-House Agency Internship",
            "GA4 Analytics & Performance Marketing",
            "10+ Global Certifications (Google, Meta, HubSpot)",
            "100% Placement Assistance (250+ Recruiters)",
          ],
          modules: [
            "Foundation & Online Consumer Mindsets",
            "Google Workspace & Productivity Marketer Suite",
            "Google Products: Search Console, GA4 & Tag Manager",
            "Graphic Designing & Brand Identity (Canva Pro)",
            "Video Editing for Reels, Shorts & YouTube (Filmora)",
            "WordPress Website Architecture & Landing Pages",
            "Content Writing, Copywriting & AI Generation",
            "Organic SEO (On-Page, Off-Page & Technical)",
            "Social Media Marketing (Organic SMM & Community)",
            "Meta Ads: Audience Targeting, Creatives & ROAS",
            "Google Ads: Search, Display & YouTube Campaigns",
            "WhatsApp & Email Marketing Automation",
            "Performance Marketing & Advanced GA4 Tracking",
            "Remarketing, Retargeting & CRO Optimization",
            "Freelancing Launch on Upwork, Fiverr & Toptal",
          ],
        },
      ],
      "6-months": [
        {
          id: "dm-advanced",
          title: "Advanced Digital Marketing",
          subtitle: "60 Detailed Modules • 54+ AI Tools Coverage • 10 Live Projects",
          duration: "6 Months",
          durationId: "6-months",
          level: "ADVANCED LEVEL",
          levelColor: "border-blue-400 text-blue-700 bg-blue-50",
          checkColor: "text-blue-500",
          modulesCount: "60",
          modulesType: "Detailed Modules",
          aiToolsCount: "54+",
          aiToolsType: "AI Tools Coverage",
          hoursPerWeek: "12 - 15 Hours / Week",
          modulesPill: "60 Detailed Modules • 54+ AI Tools Coverage",
          shortDesc: "Comprehensive job-ready curriculum with end-to-end live industry projects and group mentorship.",
          projectsHighlight: "Practice Projects + Major Capstone",
          certHighlight: "Course Certification + ISO Verification",
          isPopular: true,
          price: 18999,
          originalPrice: 35999,
          onlinePrice: 18999,
          offlinePrice: 50000,
          emi: "₹3,299/mo",
          rating: 4.9,
          ratingsCount: "1,043+ students",
          projects: "10 Live Brand Campaigns",
          mentorship: "Industry Expert Mentorship & Weekly Live Q&A",
          certification: "10+ Global Certifications + Agency Internship Certificate",
          placementGuarantee: "100% Placement Support (500+ Hiring Partners)",
          perfectFor: "Ambitious Graduates, Working Professionals & Career Switchers",
          perfectForBg: "bg-blue-50/80 border-blue-200 text-blue-900",
          enrollUrl: "https://dizitaladda.com/courses/advanced-digital-marketing-course",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+am+interested+in+the+Advanced+Digital+Marketing+Course+in+Delhi+%E2%80%94+6+Months+%7C+100%25+Placement.",
          details: ADVANCED_DIGITAL_MARKETING_DETAILS,
          featureList: [
            "60 Detailed Modules",
            "54+ AI Tools Coverage",
            "10 Live Brand Projects",
            "Paid In-House Agency Internship",
            "Next-Gen Search AI (AEO / LLMO)",
            "Industry Expert Mentorship",
            "Real Project Portfolio",
            "10+ Global Certifications",
          ],
          modules: [
            "60 Detailed Modules across 25 Practical Digital Marketing Domains",
            "10 Live Brand Projects with Real Ad Budgets & Proof-of-Work",
            "Next-Gen Search AI: Answer Engine (AEO) & LLM Optimization (LLMO)",
            "Paid In-House Agency Internship Managing Live Client Brand Accounts",
            "54+ Modern AI Marketing Tools Integrated into Daily Workflows",
            "Expert Mentorship, 10+ Global Certifications & 100% Placement Support",
          ],
        },
      ],
      "12-months": [
        {
          id: "dm-expert",
          title: "Expert in Digital Marketing",
          subtitle: "70 Comprehensive Modules • 60+ AI Tools Integration • 10 Live Projects",
          duration: "12 Months",
          durationId: "12-months",
          level: "EXPERT LEVEL",
          levelColor: "border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50",
          checkColor: "text-fuchsia-500",
          modulesCount: "70",
          modulesType: "Comprehensive Modules",
          aiToolsCount: "60+",
          aiToolsType: "AI Tools Integration",
          hoursPerWeek: "15 - 20 Hours / Week",
          modulesPill: "70 Comprehensive Modules • 60+ AI Tools Integration",
          shortDesc: "Comprehensive expert mastery with 1-on-1 mentorship, real project portfolio, and guaranteed placement.",
          projectsHighlight: "Real Project Portfolio + 2 Major Capstones",
          certHighlight: "Industry Certification + Internship Letter",
          price: 34999,
          originalPrice: 69999,
          onlinePrice: 34999,
          offlinePrice: 95000,
          emi: "₹3,199/mo",
          rating: 4.9,
          ratingsCount: "1,580+ reviews",
          projects: "10 Live Brand Campaigns",
          mentorship: "1-on-1 Mentorship & Leadership Coaching",
          certification: "10+ Industry Certifications + Agency Internship Letter",
          placementGuarantee: "100% Placement Assistance (250+ Hiring Partners)",
          perfectFor: "Future Digital Marketing Leaders & Entrepreneurs",
          perfectForBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",
          enrollUrl: "https://dizitaladda.com/courses/expert-digital-marketing-course",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Expert+in+Digital+Marketing+Course",
          details: EXPERT_DIGITAL_MARKETING_DETAILS,
          featureList: [
            "70 Comprehensive Modules",
            "60+ AI Tools Integration",
            "10 Live Brand Campaigns",
            "Paid In-House Agency Internship",
            "Advanced SEO, AEO & LLMO",
            "1-on-1 Mentorship",
            "Real Project Portfolio",
            "10+ Industry Certifications",
          ],
          modules: [
            "70 In-Depth Modules across 32 Industry Specializations",
            "10 Live Brand Campaigns with Real Ad Budgets",
            "Next-Gen Search AI: Answer Engine (AEO) & LLM Optimization (LLMO)",
            "Paid In-House Agency Internship Managing Live Client Accounts",
            "60+ Advanced AI Tools Integration for Automated Workflows",
            "1-on-1 Senior Mentorship, 10+ Certifications & 100% Placement Support",
          ],
        },
      ],
    },
  },

  // 2. Data science & data analystic (NIDADS & DIZITAL ADDA)
  {
    id: "data-science",
    title: "Data Science & Data Analytics",
    subtitle: "Two Distinct Career Specializations: Data Analytics (BI & SQL) & Data Science (ML & AI)",
    icon: <FaDatabase />,
    badge: "High Growth",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    avgSalary: "₹6 - ₹24 LPA",
    description:
      "Choose between Data Analytics (Business Intelligence, SQL, Power BI, Tableau & KPI Dashboards) or Data Science (Python, Applied Statistics, Machine Learning, Deep Learning & Big Data).",
    hasSpecializations: true,
    specializationTracks: [
      {
        id: "data-analytics",
        backendCourseId: "data-analytics",
        numericCourseId: 5,
        name: "Data Analytics Course",
        shortTitle: "Data Analytics",
        badge: "BI, SQL & Dashboards",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
        durationSummary: "3 - 12 Months",
        description:
          "Focus on Business Intelligence, SQL data warehousing, interactive Power BI & Tableau dashboards, and product analytics to drive business decisions.",
        availableDurationIds: ["3-months", "6-months", "12-months"],
        coursesByDuration: {
          "3-months": [
            {
              id: "da-3m-bi",
              backendCourseId: "data-analytics",
              courseId: 5,
              title: "Certification in Data Analytics & AI",
              subtitle: "3 Months Foundation • Excel Modeling, SQL Queries & Power BI Dashboards",
              duration: "3 Months",
              durationId: "3-months",
              level: "BEGINNER LEVEL",
              levelColor: "border-amber-400 text-amber-700 bg-amber-50",
              checkColor: "text-amber-500",
              modulesCount: "24",
              modulesType: "Core Analytics Modules",
              aiToolsCount: "25+",
              aiToolsType: "AI & BI Tools",
              hoursPerWeek: "8 - 10 Hours / Week",
              modulesPill: "24 Core Modules • 25+ AI & BI Tools",
              shortDesc:
                "Master foundational analytics, Excel modeling, SQL queries & dynamic Power BI dashboards.",
              projectsHighlight: "4 Interactive Business Dashboards",
              certHighlight: "Foundation Certificate in BI",
              price: 9999,
              originalPrice: 24999,
              onlinePrice: 9999,
              offlinePrice: 25000,
              emi: "₹3,499/mo",
              projects: "4 Interactive Dashboards (Sales, Finance, HR)",
              mentorship: "Weekly Live Mentorship with Mr. Deepanshu Soni & Dr. Gulshan Kumar",
              certification: "NIDADS & Dizital Adda Official Certificate in Data Analytics",
              perfectFor: "Students, Career Starters & Business Analysts",
              perfectForBg: "bg-amber-50/80 border-amber-200 text-amber-900",
              details: NIDADS_CERTIFICATION_DATA_ANALYTICS,
              featureList: [
                "24 Core Analytics Modules",
                "25+ AI Tools & Copilot Overview",
                "Advanced Excel & Power Query",
                "SQL Queries & Database Joins",
                "Power BI Data Modeling & DAX",
                "Interactive Visual Dashboards",
                "Weekly Live Doubt Clearing",
                "Official Certificate of Completion",
              ],
              modules: [
                "Month 1: Data Fundamentals & Advanced Excel Modeling",
                "Month 2: Database Fundamentals, Relational Schemas & SQL Queries",
                "Month 3: Business Intelligence & Power BI Executive Dashboards",
              ],
            },
          ],
          "6-months": [
            {
              id: "da-6m-pro",
              backendCourseId: "data-analytics",
              courseId: 5,
              title: "Advanced Certification in Data Analytics & AI",
              subtitle: "6 Months Intensive • Advanced SQL, Power BI, Python EDA, Statistics & Tableau",
              duration: "6 Months",
              durationId: "6-months",
              level: "ADVANCED LEVEL",
              levelColor: "border-blue-400 text-blue-700 bg-blue-50",
              checkColor: "text-blue-500",
              modulesCount: "48",
              modulesType: "Advanced Engineering Modules",
              aiToolsCount: "45+",
              aiToolsType: "AI Tools & Code Assistants",
              hoursPerWeek: "12 - 15 Hours / Week",
              modulesPill: "48 Advanced Modules • 45+ Tools & Libraries",
              shortDesc:
                "Complete analytics engineering with advanced SQL window functions, Python data pipelines, and Tableau.",
              projectsHighlight: "8 Live Business Intelligence Capstones",
              certHighlight: "Professional BI Analyst Certificate + ISO Verified",
              isPopular: true,
              price: 18999,
              originalPrice: 38999,
              onlinePrice: 18999,
              offlinePrice: 50000,
              emi: "₹3,299/mo",
              projects: "8 Real-world Portfolio Projects",
              mentorship: "Industry Expert Mentorship & 1:1 Reviews with Mr. Deepanshu Soni & Dr. Gulshan Kumar",
              certification: "NIDADS Advanced Certificate + ISO 9001:2015 Verified",
              placementGuarantee: "100% Placement Support (500+ Hiring Partners)",
              perfectFor: "Working Professionals, Analysts & Switchers",
              perfectForBg: "bg-blue-50/80 border-blue-200 text-blue-900",
              details: NIDADS_ADVANCED_DATA_ANALYTICS,
              featureList: [
                "48 Detailed Analytics Modules",
                "45+ Modern BI & Analytics Tools",
                "Advanced SQL & Complex Window Functions",
                "Python for Data Wrangling (Pandas/NumPy)",
                "Tableau Desktop & Server Publishing",
                "Dark Store Demand Twin Capstone",
                "Midnight Basket Drop Analysis",
                "100% Placement Assistance & Resume Review",
              ],
              modules: [
                "Month 1: Foundation of Data Analytics & Modern Tooling",
                "Month 2: Power BI & Executive Visual Storytelling",
                "Month 3: SQL for Data Analysis, Window Functions & CTEs",
                "Month 4: Python for Data Analysis & Exploratory Analytics",
                "Month 5: Statistics & Advanced Business Inference",
                "Month 6: Capstone Projects (Dark Store & Basket Drop) & Placement",
              ],
            },
          ],
          "12-months": [
            {
              id: "da-12m-diploma",
              backendCourseId: "data-analytics",
              courseId: 5,
              title: "Diploma in Data Analytics & AI | Get Job-Ready",
              subtitle: "12 Months Comprehensive Master • 12 Monthly Specializations • Paid Internship & Placement Guarantee",
              duration: "12 Months",
              durationId: "12-months",
              level: "EXPERT LEVEL",
              levelColor: "border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50",
              checkColor: "text-fuchsia-500",
              modulesCount: "92",
              modulesType: "Comprehensive Master Modules",
              aiToolsCount: "60+",
              aiToolsType: "Enterprise BI & AI Stack",
              hoursPerWeek: "15 - 20 Hours / Week",
              modulesPill: "92 Master Modules • 60+ AI Tools • Paid Internship",
              shortDesc:
                "Complete 12-month master diploma with full portfolio, 1-on-1 mentorship, paid internship, and guaranteed placement.",
              projectsHighlight: "12 Major Portfolio Projects + Capstone",
              certHighlight: "National Diploma + 3-Month Paid Internship Letter",
              price: 34999,
              originalPrice: 69999,
              onlinePrice: 34999,
              offlinePrice: 95000,
              emi: "₹3,199/mo",
              projects: "12 Major Portfolio Projects + Capstone",
              mentorship: "1-on-1 Chief Mentor Guidance with Dr. Gulshan Kumar, Mr. Deepanshu Soni & Miss Shagun Shrivastav",
              certification: "National Diploma in Data Analytics & AI + 3-Month Paid Internship Letter",
              placementGuarantee: "100% Placement Guarantee (with formal agreement)",
              perfectFor: "Future Data Analytics Leads, BI Consultants & Corporate Strategists",
              perfectForBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",
              details: NIDADS_DIPLOMA_DATA_ANALYTICS,
              featureList: [
                "92 In-Depth Modules across 12 Monthly Phases",
                "60+ Enterprise BI & AI Tools",
                "12 Major Capstones (Dark Store, Basket Drop, Hospital Radar)",
                "Guaranteed 3-Month Paid Corporate Internship",
                "1-on-1 Senior Mentorship with Dr. Gulshan Kumar",
                "Microsoft Power BI (PL-300) Certification Prep",
                "100% Placement Guarantee with Legal Agreement",
                "Dedicated Executive Placement Desk",
              ],
              modules: [
                "Month 1: Data Fundamentals & Advanced Excel",
                "Month 2: Advanced Excel & Introduction to Business Intelligence",
                "Month 3: Database Fundamentals & SQL Queries",
                "Month 4: Introduction to Programming & Python",
                "Month 5: Data Visualization & Storytelling with Tableau & Power BI",
                "Month 6: Statistics & Data Analysis",
                "Month 7: Advanced Data Analysis Techniques",
                "Month 8: Automation & Efficiency",
                "Month 9: Industry Applications & Case Studies",
                "Month 10: Advanced Machine Learning Applications",
                "Month 11: Specialization & Advanced Projects",
                "Month 12: Capstone Project & Career Placement Drives",
              ],
            },
          ],
        },
      },
      {
        id: "data-science",
        backendCourseId: "data-science",
        numericCourseId: 8,
        name: "Data Science Course",
        shortTitle: "Data Science",
        badge: "Python, ML & AI",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
        durationSummary: "6 - 12 Months",
        description:
          "Focus on Python programming, mathematical statistics, machine learning algorithms, deep learning neural networks, and AI predictive model deployment.",
        availableDurationIds: ["6-months", "12-months"],
        coursesByDuration: {
          "6-months": [
            {
              id: "ds-6m-ml",
              backendCourseId: "data-science",
              courseId: 8,
              title: "Advanced Certification in Data Science & AI Program",
              subtitle: "6 Months Intensive • Python, Machine Learning, Deep Learning, Statistics & MLOps",
              duration: "6 Months",
              durationId: "6-months",
              level: "ADVANCED LEVEL",
              levelColor: "border-blue-400 text-blue-700 bg-blue-50",
              checkColor: "text-blue-500",
              modulesCount: "52",
              modulesType: "Data Science & ML Modules",
              aiToolsCount: "50+",
              aiToolsType: "AI Frameworks & Libraries",
              hoursPerWeek: "12 - 15 Hours / Week",
              modulesPill: "52 Detailed Modules • 50+ ML Tools",
              shortDesc:
                "Master statistical modeling, supervised/unsupervised algorithms, and full-stack model deployment.",
              projectsHighlight: "8 Real-world ML Projects + Cloud Deployment",
              certHighlight: "NIDADS Advanced Certificate + ISO Verified",
              isPopular: true,
              price: 24999,
              originalPrice: 49999,
              onlinePrice: 24999,
              offlinePrice: 60000,
              emi: "₹4,299/mo",
              projects: "8 Real-world ML Projects + Streamlit Cloud Deployment",
              mentorship: "Senior Data Scientist Mentorship with Miss Shagun Shrivastav & Dr. Gulshan Kumar",
              certification: "NIDADS Advanced Certificate in Data Science & AI + ISO Verified",
              placementGuarantee: "100% Placement Support (500+ Hiring Partners)",
              perfectFor: "Coders, STEM Graduates, Software Engineers & Data Enthusiasts",
              perfectForBg: "bg-blue-50/80 border-blue-200 text-blue-900",
              details: NIDADS_ADVANCED_DATA_SCIENCE,
              featureList: [
                "52 Comprehensive ML Modules",
                "50+ Data Science & AI Libraries",
                "Python Core & Scientific Computing Stack",
                "Applied Statistics, Probability & Hypothesis Testing",
                "Supervised Learning: Regressions, Trees, Ensemble Models",
                "Unsupervised Learning: Clustering, PCA & Dimensionality",
                "Model Deployment with Streamlit & FastAPI REST APIs",
                "100% Placement Assistance & Kaggle Portfolio",
              ],
              modules: [
                "Month 1: Foundations, Anaconda, Jupyter, Colab & GitHub",
                "Month 2: Python for Data Science & Vectorized Math with NumPy & Pandas",
                "Month 3: Advanced Machine Learning & Ensemble Modeling",
                "Month 4: Deep Learning & Neural Networks with PyTorch",
                "Month 5: Statistical Techniques & Hypothesis Testing",
                "Month 6: AI Deployment & MLOps Engineering with FastAPI & Docker",
              ],
            },
          ],
          "12-months": [
            {
              id: "ds-12m-master",
              backendCourseId: "data-science",
              courseId: 8,
              title: "Diploma in Data Science & AI",
              subtitle: "12 Months Comprehensive Master • PyTorch, PySpark, Big Data Cloud, LLMs, MLOps & Paid Internship",
              duration: "12 Months",
              durationId: "12-months",
              level: "EXPERT LEVEL",
              levelColor: "border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50",
              checkColor: "text-fuchsia-500",
              modulesCount: "140",
              modulesType: "Complete AI & Big Data Modules",
              aiToolsCount: "70+",
              aiToolsType: "AI, Cloud & Distributed Stack",
              hoursPerWeek: "15 - 20 Hours / Week",
              modulesPill: "140 Comprehensive Modules • 70+ AI Tools • Paid Internship",
              shortDesc:
                "Flagship master diploma with PySpark distributed computing, Deep Learning, LLMOps, and paid internship.",
              projectsHighlight: "16+ Production AI & Big Data Capstones",
              certHighlight: "National Diploma in Data Science & AI + 3-Month Paid Internship Letter",
              price: 39999,
              originalPrice: 79999,
              onlinePrice: 39999,
              offlinePrice: 110000,
              emi: "₹3,499/mo",
              projects: "16+ Production AI & Big Data Capstones",
              mentorship: "1-on-1 Chief Data Scientist Mentorship with Miss Shagun Shrivastav & Dr. Gulshan Kumar",
              certification: "National Diploma in Data Science & AI + 3-Month Paid Internship Letter",
              placementGuarantee: "100% Placement Guarantee (with formal agreement)",
              perfectFor: "Future AI Researchers, Big Data Engineers, Machine Learning Engineers & Tech Leaders",
              perfectForBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",
              details: NIDADS_DIPLOMA_DATA_SCIENCE,
              featureList: [
                "140 Comprehensive Modules across 12 Monthly Stages",
                "70+ Cloud AI, Big Data & LLM Tools",
                "Distributed Big Data with Apache Spark & PySpark",
                "Deep Learning Architecture with PyTorch & CUDA",
                "Computer Vision (CNNs) & Natural Language Processing (NLP)",
                "Large Language Models (LLMs) Fine-Tuning & RAG Pipelines",
                "Guaranteed 3-Month Paid Industry Internship",
                "100% Placement Guarantee with Dedicated Placement Desk",
              ],
              modules: [
                "Month 1: Foundations & Setup (Anaconda, Colab, GitHub)",
                "Month 2: Python for Data Science (NumPy, Pandas)",
                "Month 3: Data Visualization & Exploratory Data Analysis",
                "Month 4: Statistics & Probability",
                "Month 5: SQL & NoSQL (PostgreSQL, MongoDB)",
                "Month 6: Machine Learning Fundamentals",
                "Month 7: Advanced Machine Learning & XGBoost",
                "Month 8: Deep Learning & Neural Networks with PyTorch",
                "Month 9: Big Data & Cloud Computing (Apache Spark)",
                "Month 10: Model Deployment & Production Systems (FastAPI, Docker)",
                "Month 11: Advanced Specializations & Capstone Project",
                "Month 12: Career Preparation & Placement Drives",
              ],
            },
          ],
        },
      },
    ],
    availableDurationIds: ["3-months", "6-months", "12-months"],
    coursesByDuration: {
      "3-months": [
        {
          id: "da-3m-bi",
          backendCourseId: "data-analytics",
          courseId: 5,
          title: "Certification in Data Analytics & AI",
          subtitle: "3 Months Foundation • Excel Modeling, SQL Queries & Power BI Dashboards",
          duration: "3 Months",
          durationId: "3-months",
          level: "BEGINNER LEVEL",
          levelColor: "border-amber-400 text-amber-700 bg-amber-50",
          checkColor: "text-amber-500",
          modulesCount: "24",
          modulesType: "Core Analytics Modules",
          aiToolsCount: "25+",
          aiToolsType: "AI & BI Tools",
          price: 9999,
          originalPrice: 24999,
          onlinePrice: 9999,
          offlinePrice: 25000,
          emi: "₹3,499/mo",
          projects: "4 Interactive Dashboards",
          mentorship: "Weekly Live Mentorship with Mr. Deepanshu Soni & Dr. Gulshan Kumar",
          certification: "NIDADS & Dizital Adda Official Certificate in Data Analytics",
          perfectFor: "Students & Business Analysts",
          perfectForBg: "bg-amber-50/80 border-amber-200 text-amber-900",
          details: NIDADS_CERTIFICATION_DATA_ANALYTICS,
          featureList: [
            "24 Core Analytics Modules",
            "25+ AI Tools & Copilot Overview",
            "Excel & Power Query Mastery",
            "Power BI Data Modeling & DAX",
            "Interactive Visual Dashboards",
            "Weekly Group Mentorship",
            "Guided Real-world Projects",
            "Completion Certificate",
          ],
          modules: [
            "Month 1: Data Fundamentals & Advanced Excel Modeling",
            "Month 2: Database Fundamentals, Relational Schemas & SQL Queries",
            "Month 3: Business Intelligence & Power BI Executive Dashboards",
          ],
        },
      ],
      "6-months": [
        {
          id: "da-6m-pro",
          backendCourseId: "data-analytics",
          courseId: 5,
          title: "Advanced Certification in Data Analytics & AI",
          subtitle: "6 Months Intensive • Advanced SQL, Power BI, Python EDA, Statistics & Tableau",
          duration: "6 Months",
          durationId: "6-months",
          level: "ADVANCED LEVEL",
          levelColor: "border-blue-400 text-blue-700 bg-blue-50",
          checkColor: "text-blue-500",
          modulesCount: "48",
          modulesType: "Detailed Modules",
          aiToolsCount: "45+",
          aiToolsType: "AI Tools & Code Assistants",
          price: 18999,
          originalPrice: 38999,
          onlinePrice: 18999,
          offlinePrice: 50000,
          emi: "₹3,299/mo",
          projects: "8 Business Intelligence Projects + Capstone",
          mentorship: "Group Mentorship & 1:1 Reviews",
          certification: "NIDADS Advanced Certificate + ISO Verified",
          perfectFor: "Data Aspirants & Career Switchers",
          perfectForBg: "bg-blue-50/80 border-blue-200 text-blue-900",
          details: NIDADS_ADVANCED_DATA_ANALYTICS,
          featureList: [
            "48 Detailed Modules",
            "45+ AI Tools & Code Assistants",
            "Exploratory Data Analysis (EDA)",
            "Advanced SQL & Python Wrangling",
            "Tableau Desktop & Business Dashboards",
            "Dedicated Mentorship",
            "8 Industry Capstones",
            "Course Certification",
          ],
          modules: [
            "Month 1: Foundation of Data Analytics & Modern Tooling",
            "Month 2: Power BI & Executive Visual Storytelling",
            "Month 3: SQL for Data Analysis, Window Functions & CTEs",
            "Month 4: Python for Data Analysis & Exploratory Analytics",
            "Month 5: Statistics & Advanced Business Inference",
            "Month 6: Capstone Projects (Dark Store & Basket Drop) & Placement",
          ],
        },
      ],
      "12-months": [
        {
          id: "ds-12m-master",
          backendCourseId: "data-science",
          courseId: 8,
          title: "Diploma in Data Science & AI",
          subtitle: "12 Months Comprehensive Master • PyTorch, PySpark, Big Data Cloud, LLMs & MLOps",
          duration: "12 Months",
          durationId: "12-months",
          level: "EXPERT LEVEL",
          levelColor: "border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50",
          checkColor: "text-fuchsia-500",
          modulesCount: "140",
          modulesType: "Comprehensive Modules",
          aiToolsCount: "70+",
          aiToolsType: "AI Tools & LLM Ops",
          price: 39999,
          originalPrice: 79999,
          onlinePrice: 39999,
          offlinePrice: 110000,
          emi: "₹3,499/mo",
          projects: "16+ Production & Big Data Projects",
          mentorship: "1-on-1 Mentorship & Internship",
          certification: "Dual Global Certificate + Internship Letter",
          perfectFor: "Future Data Leaders & Enterprise Engineers",
          perfectForBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",
          details: NIDADS_DIPLOMA_DATA_SCIENCE,
          featureList: [
            "140 Comprehensive Modules",
            "70+ AI & LLM Tools Integration",
            "Distributed Big Data with Apache Spark",
            "Deep Learning with PyTorch & TensorFlow",
            "Paid 3-Month Internship Guarantee",
            "1-on-1 Senior Mentorship",
            "100% Placement Guarantee",
            "Dual Global Certification",
          ],
          modules: [
            "Month 1: Foundations & Setup (Anaconda, Colab, GitHub)",
            "Month 2: Python for Data Science (NumPy, Pandas)",
            "Month 3: Advanced Machine Learning & Deep Learning",
            "Month 4: Big Data with Apache Spark & Distributed Computing",
            "Month 5: Generative AI, LLMOps & Production Deployment",
            "Month 6: Enterprise Capstone & Placement Drives",
          ],
        },
      ],
    },
  },

  // 3. Cyber Security (DIZITAL ADDA OFFICIAL)
  {
    id: "cyber-security",
    title: "Cyber Security",
    subtitle: "Ethical Hacking, SOC Analyst, Network Defence & Penetration Testing",
    icon: <FaShieldAlt />,
    badge: "Mission Critical",
    badgeColor: "bg-red-100 text-red-900 border-red-300",
    avgSalary: "₹6 - ₹24 LPA",
    description:
      "Defend digital infrastructure against modern threats, detect cyber attacks in real time, identify system vulnerabilities, and master ethical hacking techniques.",
    availableDurationIds: ["4-months", "6-months", "12-months"],
    coursesByDuration: {
      "4-months": [
        {
          id: "cs-4m-found",
          backendCourseId: "cyber-foundation",
          courseId: 9,
          title: "Foundation in Cyber Security and Ethical Hacking",
          subtitle: "4 Months Foundation • Python, Networking, Linux & Ethical Hacking Basics",
          duration: "4 Months",
          durationId: "4-months",
          level: "BEGINNER LEVEL",
          levelColor: "border-amber-400 text-amber-700 bg-amber-50",
          checkColor: "text-amber-500",
          modulesCount: "12",
          modulesType: "Core Security Modules",
          aiToolsCount: "25+",
          aiToolsType: "Security & Recon Tools",
          hoursPerWeek: "8 - 10 Hours / Week",
          modulesPill: "12 Core Modules • 25+ Security Tools",
          shortDesc:
            "Master cybersecurity fundamentals, Python automation, networking, and ethical hacking basics in isolated labs.",
          projectsHighlight: "4 Virtual Lab Projects",
          certHighlight: "Dizital Adda Certificate + Security+ Prep",
          price: 30000,
          originalPrice: 40000,
          onlinePrice: 30000,
          offlinePrice: 40000,
          emi: "₹3,499/mo",
          projects: "4 Hands-on Virtual Lab Projects",
          mentorship: "Weekly Mentorship with Dr. Gulshan Kumar & Ethical Hackers",
          certification: "Dizital Adda Official Certification + Security+ Prep",
          perfectFor: "Students, IT Freshers & System Admins",
          perfectForBg: "bg-amber-50/80 border-amber-200 text-amber-900",
          details: FOUNDATION_CYBER_SECURITY_DETAILS,
          enrollUrl: "https://dizitaladda.com/courses/foundation-in-cyber-security-and-ethical-hacking",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Foundation+in+Cyber+Security+and+Ethical+Hacking+Course",
          featureList: [
            "12 Core Security Modules",
            "25+ Industry Security Tools",
            "Python Security Scripting & Automation",
            "TCP/IP & Packet Analysis with Wireshark",
            "Linux System Hardening & Bash",
            "Ethical Hacking & Vulnerability Scanning",
            "Weekly Live Doubt Clearing",
            "Official Certificate of Completion",
          ],
          modules: [
            "Month 1: Foundation of Cyber Security & Python Automation",
            "Month 2: Enterprise Networking & Packet Sniffing with Wireshark",
            "Month 3: Linux for Cybersecurity & System Hardening",
            "Month 4: Ethical Hacking Fundamentals, Footprinting & Password Attacks",
          ],
        },
        {
          id: "cs-4m-forensics",
          backendCourseId: "cyber-forensics",
          courseId: 11,
          title: "Certification in Digital Forensic and Cyber Investigation",
          subtitle: "4 Months Specialization • Disk Imaging, Memory Forensics & Cybercrime Investigation",
          duration: "4 Months",
          durationId: "4-months",
          level: "INTERMEDIATE LEVEL",
          levelColor: "border-teal-400 text-teal-700 bg-teal-50",
          checkColor: "text-teal-500",
          modulesCount: "12",
          modulesType: "DFIR Forensic Modules",
          aiToolsCount: "25+",
          aiToolsType: "Forensic Investigation Tools",
          hoursPerWeek: "8 - 10 Hours / Week",
          modulesPill: "12 DFIR Modules • 25+ Forensic Tools",
          shortDesc:
            "Learn digital crime scene investigation, bit-stream disk imaging, memory forensics with Volatility, and court evidence dossiers.",
          projectsHighlight: "4 Forensic Case Study Projects",
          certHighlight: "Dizital Adda Certificate + GCFA / EnCE Prep",
          price: 35000,
          originalPrice: 50000,
          onlinePrice: 35000,
          offlinePrice: 50000,
          emi: "₹3,999/mo",
          projects: "4 Forensic Case Study Projects",
          mentorship: "Weekly Mentorship with Forensic Cyber Investigators & Dr. Gulshan Kumar",
          certification: "Dizital Adda DFIR Specialist Certificate + GCFA Prep",
          perfectFor: "Forensic Aspirants, Legal Professionals, Police Trainees & SOC Analysts",
          perfectForBg: "bg-teal-50/80 border-teal-200 text-teal-900",
          details: DIGITAL_FORENSICS_DETAILS,
          enrollUrl: "https://dizitaladda.com/courses/certification-in-digital-forensic-and-cyber-investigation",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Certification+in+Digital+Forensic+and+Cyber+Investigation+Course",
          featureList: [
            "12 DFIR Forensic Modules",
            "25+ Industry Forensic Tools",
            "Bit-Stream Disk Imaging (FTK Imager)",
            "NTFS File Carving & Slack Space in Autopsy",
            "Live RAM Memory Forensics with Volatility 3",
            "Mobile Forensics (Android / iOS SQLite)",
            "Court-Admissible 65B Evidence Dossier",
            "100% Placement Support in Corporate Forensics",
          ],
          modules: [
            "Month 1: Fundamentals of Digital Forensics & Evidence Seizure",
            "Month 2: File System Analysis & Deleted Artifact Carving",
            "Month 3: Memory Forensics (Volatility) & Network Triage",
            "Month 4: Mobile Forensics, Cloud Artifacts & Expert Witness Reporting",
          ],
        },
        {
          id: "cs-4m-bugbounty",
          backendCourseId: "cyber-bugbounty",
          courseId: 12,
          title: "Expert Training in Bug Bounty",
          subtitle: "4 Months Intensive • Web App Hacking, API Security, OWASP Top 10 & Bug Hunting",
          duration: "4 Months",
          durationId: "4-months",
          level: "ADVANCED LEVEL",
          levelColor: "border-purple-400 text-purple-700 bg-purple-50",
          checkColor: "text-purple-500",
          modulesCount: "12",
          modulesType: "Bug Hunting & Pentest Modules",
          aiToolsCount: "30+",
          aiToolsType: "Exploitation & Recon Stack",
          hoursPerWeek: "8 - 10 Hours / Week",
          modulesPill: "12 Modules • 30+ Exploitation Tools • Live Bounties",
          shortDesc:
            "Master advanced recon, OWASP Top 10 exploits (IDOR, SSRF, SQLi), REST/GraphQL API testing, and HackerOne report writing.",
          projectsHighlight: "4 Live Bug Bounty Targets",
          certHighlight: "Bug Bounty Specialist + HackerOne Prep",
          price: 35000,
          originalPrice: 50000,
          onlinePrice: 35000,
          offlinePrice: 50000,
          emi: "₹3,999/mo",
          projects: "4 Live Bug Bounty Targets",
          mentorship: "Weekly Mentorship with Hall of Fame Bug Hunters & Dr. Gulshan Kumar",
          certification: "Dizital Adda Bug Bounty Hunter Certificate + HackerOne Readiness",
          perfectFor: "Web Developers, Ethical Hackers, Pentesters & Security Researchers",
          perfectForBg: "bg-purple-50/80 border-purple-200 text-purple-900",
          details: BUG_BOUNTY_DETAILS,
          enrollUrl: "https://dizitaladda.com/courses/expert-traning-in-bug-bounty",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Expert+Traning+in+Bug+Bounty+Course",
          featureList: [
            "12 Specialized Bug Hunting Modules",
            "30+ Modern Offensive & Recon Tools",
            "Burp Suite Pro Interception & Macros",
            "OWASP Top 10 Exploitation (IDOR, SSRF, SQLi)",
            "REST & GraphQL API Security Audit",
            "Android APK Reverse Engineering & SSL Bypass",
            "HackerOne & Bugcrowd Report Writing",
            "100% Placement Assistance in Product Security",
          ],
          modules: [
            "Month 1: Advanced Reconnaissance & Target Surface Mapping",
            "Month 2: Mastering OWASP Top 10 Exploitation",
            "Month 3: API Security Testing & Authentication Flaws",
            "Month 4: Mobile Pentesting, Automation & Responsible Disclosure",
          ],
        },
      ],
      "6-months": [
        {
          id: "cs-6m-ceh",
          backendCourseId: "cyber-intermediate",
          courseId: 10,
          title: "Advanced Certification in Cyber Security and Ethical Hacking",
          subtitle: "6 Months Intensive • Professional VAPT, Web App Pentesting & Digital Forensics",
          duration: "6 Months",
          durationId: "6-months",
          level: "ADVANCED LEVEL",
          levelColor: "border-blue-400 text-blue-700 bg-blue-50",
          checkColor: "text-blue-500",
          modulesCount: "20",
          modulesType: "VAPT & DFIR Modules",
          aiToolsCount: "45+",
          aiToolsType: "Exploitation & Forensic Tools",
          hoursPerWeek: "12 - 15 Hours / Week",
          modulesPill: "20 Advanced Modules • 45+ Tools • CEH Prep",
          shortDesc:
            "Master enterprise VAPT, Metasploit, Burp Suite Pro, OWASP Top 10, and digital forensics investigations.",
          projectsHighlight: "8 Live Enterprise Pentest Projects",
          certHighlight: "CEH Prep + ISO Verified Certificate",
          isPopular: true,
          price: 45000,
          originalPrice: 60000,
          onlinePrice: 45000,
          offlinePrice: 60000,
          emi: "₹3,299/mo",
          projects: "8 Live Enterprise Pentest & Forensics Projects",
          mentorship: "Industry Expert Mentorship & 1:1 Code Reviews with Dr. Gulshan Kumar",
          certification: "Dizital Adda Advanced Certificate + CEH Prep",
          placementGuarantee: "100% Placement Support (500+ Hiring Partners)",
          perfectFor: "Security Analysts, System Engineers & Switchers",
          perfectForBg: "bg-blue-50/80 border-blue-200 text-blue-900",
          details: ADVANCED_CYBER_SECURITY_DETAILS,
          enrollUrl: "https://dizitaladda.com/courses/advanced-certification-in-cyber-security-and-ethical-hacking",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+am+interested+in+the+Advanced+Certification+in+Cyber+Security+and+Ethical+Hacking+Course",
          featureList: [
            "20 Advanced Security Modules",
            "45+ Modern Offensive & DFIR Tools",
            "Metasploit Pro Exploitation Framework",
            "OWASP Top 10 Web Application Pentesting",
            "Burp Suite Pro Advanced Interception & Fuzzing",
            "Memory Forensics (Volatility) & Disk (Autopsy)",
            "Certified Ethical Hacker (CEH) Exam Prep",
            "100% Placement Assistance & Resume Review",
          ],
          modules: [
            "Month 1: Cyber Security Landscape & Advanced Python Security Tooling",
            "Month 2: Enterprise Networking, Routing & Wireshark Triage",
            "Month 3: Linux Security Auditing & Shell Scripting for Pentesters",
            "Month 4: Offensive Ethical Hacking & Active Directory Recon",
            "Month 5: Vulnerability Assessment & Penetration Testing (VAPT)",
            "Month 6: Digital & Cyber Forensic Investigation (DFIR) & Placement",
          ],
        },
      ],
      "12-months": [
        {
          id: "cs-12m-master",
          backendCourseId: "cyber-advanced",
          courseId: 6,
          title: "Expert Training in Cyber Security and Ethical Hacking",
          subtitle: "12 Months Comprehensive Master • Web/Mobile Pentest, Cloud Security, Malware & SOC Ops",
          duration: "12 Months",
          durationId: "12-months",
          level: "EXPERT LEVEL",
          levelColor: "border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50",
          checkColor: "text-fuchsia-500",
          modulesCount: "32",
          modulesType: "Master Specialization Modules",
          aiToolsCount: "60+",
          aiToolsType: "Enterprise Defense & Threat Hunting Stack",
          hoursPerWeek: "15 - 20 Hours / Week",
          modulesPill: "32 Master Modules • 60+ Tools • Paid Internship",
          shortDesc:
            "Complete 12-month master program with Web/Mobile pentesting, AWS Cloud Security, Malware Analysis, and paid internship.",
          projectsHighlight: "16+ Enterprise Cyber Capstones",
          certHighlight: "Expert Diploma + 3-Month Paid Internship Letter",
          price: 95000,
          originalPrice: 135000,
          onlinePrice: 95000,
          offlinePrice: 135000,
          emi: "₹4,199/mo",
          projects: "16+ Enterprise Cyber Capstones & Red/Blue Team Drills",
          mentorship: "1-on-1 Chief Mentor Guidance with Dr. Gulshan Kumar & Senior Red Team Leads",
          certification: "Expert Diploma in Cyber Security + Paid Internship Letter",
          placementGuarantee: "100% Placement Guarantee (with formal agreement)",
          perfectFor: "Future CISOs, Red Team Specialists & Security Architects",
          perfectForBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",
          details: EXPERT_CYBER_SECURITY_DETAILS,
          enrollUrl: "https://dizitaladda.com/courses/expert-training-in-cyber-security-and-ethical-hacking",
          whatsappUrl: "https://wa.me/918810606010?text=Hi%2C+I+want+to+enquire+about+the+Expert+Training+In+Cyber+Security+and+Ethical+Hacking+Course",
          featureList: [
            "32 Comprehensive Specialization Modules",
            "60+ Enterprise Cyber, Cloud & SOC Tools",
            "Web & API Security (GraphQL, JWT, SSRF)",
            "Mobile App Pentesting (Android/iOS with Frida)",
            "AWS Cloud Security Architecture & DevSecOps",
            "Malware Reverse Engineering with IDA Pro & Ghidra",
            "Splunk SIEM, Wazuh EDR & SOC Operations",
            "Guaranteed 3-Month Paid In-House Corporate Internship",
            "100% Placement Guarantee with Formal Agreement",
          ],
          modules: [
            "Month 1-3: Security Fundamentals, Networking, Linux Hardening & Python",
            "Month 4-6: Advanced Ethical Hacking, VAPT & Digital Forensics (DFIR)",
            "Month 7-8: Advanced Web App Pentesting (API/SSRF) & Mobile App Pentesting (Frida)",
            "Month 9-10: AWS Cloud Security, Container Hardening & IoT Firmware Analysis",
            "Month 11: Malware Reverse Engineering (IDA Pro, Ghidra, Sandbox)",
            "Month 12: Endpoint Security, Splunk SIEM, Wazuh EDR & Placement Drives",
          ],
        },
      ],
    },
  },

  // 4. Ai and prompt engreeing
  {
    id: "ai-prompt-engineering",
    title: "AI & Prompt Engineering",
    subtitle: "Generative AI, ChatGPT, Claude, LangChain, AI Agents & Automation",
    icon: <FaLaptopCode />,
    badge: "Trending Tech 2025",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    avgSalary: "₹7 - ₹26 LPA",
    description:
      "Harness the power of Generative AI, master advanced prompt engineering techniques, build autonomous multi-agent systems, and integrate modern LLMs into real-world applications.",
    availableDurationIds: ["3-months", "6-months", "12-months"],
    coursesByDuration: {
      "3-months": [
        {
          id: "ai-3m-prompt",
          backendCourseId: "ai-expert",
          courseId: 7,
          details: FOUNDATION_AI_PROMPT_DETAILS,
          title: "Generative AI & Prompt Engineering for Professionals",
          subtitle: "ChatGPT, Claude 3.5, Midjourney, Advanced Prompting & Workflows",
          duration: "3 Months",
          durationId: "3-months",
          level: "BEGINNER LEVEL",
          levelColor: "border-amber-400 text-amber-700 bg-amber-50",
          checkColor: "text-amber-500",
          modulesCount: "30",
          modulesType: "Core Modules",
          aiToolsCount: "50+",
          aiToolsType: "AI Tools Overview",
          price: 9999,
          originalPrice: 19999,
          emi: "₹3,499/mo",
          projects: "4 Real AI Workflow Deployments",
          mentorship: "Group Learning",
          certification: "Completion Certificate",
          perfectFor: "Students, Creators & Knowledge Workers",
          perfectForBg: "bg-amber-50/80 border-amber-200 text-amber-900",
          featureList: [
            "30 Core AI Modules",
            "50+ AI Tools Overview & Hands-on",
            "Chain-of-Thought & Role Prompting",
            "AI Image & Video Generation",
            "Workplace Workflow Automation",
            "Group Mentorship",
            "Guided AI Projects",
            "Completion Certificate",
          ],
          modules: [
            "Foundations of Large Language Models & Prompt Engineering",
            "Advanced Prompting Techniques (CoT, ReAct, Tree-of-Thought)",
            "AI Image & Media Generation with Midjourney & Runway",
            "Workflow Automation: Summaries, Coding & Data Extraction",
            "AI Capstone: Building a Complete Business Workflow Solution",
          ],
        },
      ],
      "6-months": [
        {
          id: "ai-6m-agents",
          backendCourseId: "ai-expert",
          courseId: 7,
          details: ADVANCED_AI_AGENTS_DETAILS,
          title: "Autonomous AI Agents & Multi-Agent Teams",
          subtitle: "CrewAI, AutoGen, Model Context Protocol (MCP) & LangGraph",
          duration: "6 Months",
          durationId: "6-months",
          level: "ADVANCED LEVEL",
          levelColor: "border-blue-400 text-blue-700 bg-blue-50",
          checkColor: "text-blue-500",
          modulesCount: "55",
          modulesType: "Detailed Modules",
          aiToolsCount: "60+",
          aiToolsType: "AI Agent & Framework Coverage",
          price: 18999,
          originalPrice: 35999,
          emi: "₹3,299/mo",
          projects: "8 Multi-Agent Production Systems",
          mentorship: "Group Mentorship & 1:1 Reviews",
          certification: "Professional Certificate + ISO Verified",
          perfectFor: "Developers, Engineers & Tech Innovators",
          perfectForBg: "bg-blue-50/80 border-blue-200 text-blue-900",
          featureList: [
            "55 Detailed Modules",
            "60+ AI Frameworks & Tools",
            "CrewAI Multi-Agent Teams",
            "LangGraph Workflows & State",
            "Model Context Protocol (MCP)",
            "Dedicated Mentorship",
            "Production Agent Deployments",
            "Course Certification",
          ],
          modules: [
            "Agentic Workflows vs Traditional Single-Prompt Queries",
            "CrewAI Multi-Agent Teams, Role Playing & Task Delegation",
            "LangGraph State Machines, Cycles & Human-in-the-Loop",
            "Model Context Protocol (MCP) Server & Tool Development",
            "Enterprise Agent Capstone: Automated Software Testing Squad",
          ],
        },
      ],
      "12-months": [
        {
          id: "ai-12m-finetune",
          backendCourseId: "ai-expert",
          courseId: 7,
          details: MASTER_AI_ENGINEERING_DETAILS,
          title: "Generative AI Engineer & Foundation Model Fine-Tuning Masterclass",
          subtitle: "Llama 3, Mistral, Hugging Face, LoRA/QLoRA, PyTorch & vLLM",
          duration: "12 Months",
          durationId: "12-months",
          level: "EXPERT LEVEL",
          levelColor: "border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50",
          checkColor: "text-fuchsia-500",
          modulesCount: "70",
          modulesType: "Comprehensive Modules",
          aiToolsCount: "75+",
          aiToolsType: "AI Tools & Infrastructure",
          price: 34999,
          originalPrice: 69999,
          emi: "₹3,199/mo",
          projects: "16+ Enterprise AI Models & Systems",
          mentorship: "1-on-1 Mentorship & Internship",
          certification: "Dual Global Certificate + Internship Letter",
          perfectFor: "Future AI Engineers & Startup Founders",
          perfectForBg: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900",
          featureList: [
            "70 Comprehensive Modules",
            "75+ AI & LLM Tools Integration",
            "Fine-Tuning Open Source LLMs (LoRA/QLoRA)",
            "High-Throughput Model Serving with vLLM",
            "Paid 3-Month Internship Guarantee",
            "1-on-1 Senior Mentorship",
            "100% Placement Guarantee",
            "Industry Certification",
          ],
          modules: [
            "Transformer Architecture Deep Dive & Tokenization Mechanics",
            "Data Pipeline Engineering for Model Pre-training & Fine-Tuning",
            "PEFT Techniques: LoRA, QLoRA & DPO (Direct Preference Optimization)",
            "High-Throughput Inference Serving with vLLM, TensorRT & Docker",
            "Enterprise Capstone: Custom Domain-Specific LLM Deployment",
          ],
        },
      ],
    },
  },
];

// ==========================================
// DURATION PILL STYLING HELPER
// ==========================================
const getDurationPillStyle = (durationId) => {
  switch (durationId) {
    case "3-months":
      return "bg-amber-100/90 text-amber-900 border-amber-300";
    case "4-months":
      return "bg-emerald-100/90 text-emerald-900 border-emerald-300";
    case "6-months":
      return "bg-blue-100/90 text-blue-900 border-blue-300";
    case "12-months":
      return "bg-purple-100/90 text-purple-900 border-purple-300";
    default:
      return "bg-slate-100 text-slate-800 border-slate-300";
  }
};

// ==========================================
// 3D INTERACTIVE DURATION TRACK CARD COMPONENT
// ==========================================
function DurationTrackCard3D({ course, isPopular, onSelect, index }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Pitch & Yaw rotation (smooth spring-like bounds)
    const rotX = (0.5 - y) * 16;
    const rotY = (x - 0.5) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex h-full"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Elevated Floating Badge for Popular Card */}
      {isPopular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-transform duration-200"
          style={{
            transform: `translateX(-50%) translateZ(${isHovered ? 45 : 30}px)`,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-[0_6px_18px_rgba(245,158,11,0.45)] border border-yellow-200 ring-2 ring-white/70">
            <FaStar className="text-[10px] text-amber-900" />
            <span>MOST POPULAR</span>
          </div>
        </div>
      )}

      {/* Main 3D Tilted Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.2s ease"
            : "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s ease",
        }}
        className={`relative w-full rounded-3xl p-6 sm:p-7 cursor-pointer flex flex-col justify-between transition-all duration-300 group ${
          isPopular
            ? "bg-white border-2 border-amber-400 ring-2 ring-amber-300/30 shadow-[0_16px_40px_rgba(245,158,11,0.18)] hover:shadow-[0_25px_60px_rgba(245,158,11,0.28)]"
            : "bg-white border-2 border-slate-200/90 hover:border-[#7C2D12]/50 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_45px_rgba(15,23,42,0.14)]"
        }`}
      >
        {/* Holographic / Metallic Glare Overlay */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: isPopular
              ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(251, 191, 36, 0.22) 0%, rgba(255, 255, 255, 0.15) 35%, transparent 70%)`
              : `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 75%)`,
          }}
        />

        {/* Card Content Top Section */}
        <div>
          {/* Top Pill Tag & Weekly Hours */}
          <div
            className="flex items-center justify-between gap-2 mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            <span
              className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${getDurationPillStyle(
                course.durationId
              )}`}
            >
              {course.duration} Track
            </span>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <FaClock className="text-[11px] text-slate-400" />
              {course.hoursPerWeek || "10 - 12 Hours / Week"}
            </span>
          </div>

          {/* Big Duration Title & Program Name */}
          <div style={{ transform: "translateZ(30px)" }}>
            <h4 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight">
              {course.duration}
            </h4>
            <p className="text-sm sm:text-base font-bold text-[#7C2D12] mt-1 leading-snug">
              {course.title}
            </p>
          </div>

          {/* Modules & AI Tools Pill */}
          <div
            className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs font-bold text-slate-800"
            style={{ transform: "translateZ(22px)" }}
          >
            <span>
              {course.modulesPill ||
                `${course.modulesCount || 40} Focused Modules • ${
                  course.aiToolsCount || "50+"
                } AI Tools Overview`}
            </span>
          </div>

          {/* Short Description */}
          <p
            className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed line-clamp-3 min-h-[48px]"
            style={{ transform: "translateZ(18px)" }}
          >
            {course.shortDesc ||
              course.perfectFor ||
              course.subtitle ||
              "Master foundational concepts, core practical tools & build real working prototypes quickly."}
          </p>

          {/* Program Mode & Admissions Highlights */}
          <div
            className="mt-5 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200 shadow-inner"
            style={{ transform: "translateZ(26px)" }}
          >
            <div className="flex items-center justify-between text-xs font-bold text-[#0B1220]">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                ● Admissions Open
              </span>
              <span className="text-slate-500 font-medium">
                Online & Classroom
              </span>
            </div>
            <div className="text-[11px] font-semibold text-slate-600 mt-2 flex items-center justify-between">
              <span>{course.modulesCount || "30+"} Syllabus Modules</span>
              <span className="text-[#7C2D12]">100% Practical</span>
            </div>
          </div>

          {/* Inclusions Highlights */}
          <div
            className="mt-4 space-y-2.5 pt-1"
            style={{ transform: "translateZ(22px)" }}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
              <FaBriefcase className="text-[#7C2D12] text-xs flex-shrink-0" />
              <span>
                {course.projectsHighlight ||
                  course.projects ||
                  "Guided & Mini Projects"}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
              <FaGraduationCap className="text-[#7C2D12] text-xs flex-shrink-0" />
              <span>
                {course.certHighlight ||
                  course.certification ||
                  "Completion Certificate"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-2" style={{ transform: "translateZ(38px)" }}>
          <button
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md group/btn ${
              isPopular
                ? "bg-[#7C2D12] hover:bg-[#63240e] text-white hover:shadow-xl hover:shadow-orange-950/20"
                : "bg-[#0B1220] hover:bg-[#7C2D12] text-white hover:shadow-lg"
            }`}
          >
            <span>Select {course.duration}</span>
            <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// MAIN SKILLING COMPONENT
// ==========================================
function Skilling() {
  const navigate = useNavigate();

  // Multi-step Streamlined State:
  // Step 1: Select Domain
  // Step 2: Choose Program / Duration Card (All duration cards shown side-by-side)
  // Step 3: Master Program Details & Enrollment (Syllabus, Inclusions & Actions)
  const [step, setStep] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedDataTrack, setSelectedDataTrack] = useState("data-analytics");
  const [searchParams] = useSearchParams();

  // Support direct deep-linking to exact course description from popular course cards
  useEffect(() => {
    const domainId = searchParams.get("domain");
    const durationId = searchParams.get("duration");
    const trackId = searchParams.get("track");
    const courseParam = searchParams.get("course");

    // 1. If course parameter is provided, find exact course across all domains
    if (courseParam) {
      const targetKey = String(courseParam).toLowerCase().trim();
      for (const dom of DOMAINS) {
        // Search regular coursesByDuration
        if (dom.coursesByDuration) {
          for (const [durId, list] of Object.entries(dom.coursesByDuration)) {
            const found = (list || []).find(
              (c) =>
                String(c.id).toLowerCase() === targetKey ||
                String(c.course_id).toLowerCase() === targetKey ||
                c.title?.toLowerCase().includes(targetKey)
            );
            if (found) {
              setSelectedDomain(dom);
              setSelectedCourse(found);
              const dur =
                DURATION_OPTIONS.find((d) => d.id === found.durationId || d.id === durId) ||
                DURATION_OPTIONS[0];
              setSelectedDuration(dur);
              setStep(3);
              setTimeout(() => window.scrollTo({ top: 350, behavior: "smooth" }), 150);
              return;
            }
          }
        }
        // Search specializationsByDuration
        if (dom.specializationsByDuration) {
          for (const [specTrack, durMap] of Object.entries(dom.specializationsByDuration)) {
            for (const [durId, list] of Object.entries(durMap || {})) {
              const found = (list || []).find(
                (c) =>
                  String(c.id).toLowerCase() === targetKey ||
                  String(c.course_id).toLowerCase() === targetKey ||
                  c.title?.toLowerCase().includes(targetKey)
              );
              if (found) {
                setSelectedDomain(dom);
                setSelectedDataTrack(specTrack);
                setSelectedCourse(found);
                const dur =
                  DURATION_OPTIONS.find((d) => d.id === found.durationId || d.id === durId) ||
                  DURATION_OPTIONS[0];
                setSelectedDuration(dur);
                setStep(3);
                setTimeout(() => window.scrollTo({ top: 350, behavior: "smooth" }), 150);
                return;
              }
            }
          }
        }
      }
    }

    // 2. Otherwise match by domain and duration
    if (domainId) {
      const dom = DOMAINS.find((d) => d.id === domainId);
      if (dom) {
        setSelectedDomain(dom);
        const activeTrack =
          trackId ||
          (dom.hasSpecializations ? dom.specializationTracks[0]?.id : "data-analytics");
        if (dom.hasSpecializations) {
          setSelectedDataTrack(activeTrack);
        }

        if (durationId) {
          let coursesList = [];
          if (dom.hasSpecializations) {
            coursesList =
              dom.specializationsByDuration?.[activeTrack]?.[durationId] || [];
          } else {
            coursesList = dom.coursesByDuration?.[durationId] || [];
          }

          if (coursesList && coursesList.length > 0) {
            setSelectedCourse(coursesList[0]);
            const dur =
              DURATION_OPTIONS.find((d) => d.id === durationId) ||
              DURATION_OPTIONS[0];
            setSelectedDuration(dur);
            setStep(3);
            setTimeout(() => window.scrollTo({ top: 350, behavior: "smooth" }), 150);
            return;
          }
        }
        setStep(2);
        setTimeout(() => window.scrollTo({ top: 350, behavior: "smooth" }), 150);
      }
    }
  }, [searchParams]);

  // Step 3 Interactive Tabs & Deep Dive State
  const [activeDetailTab, setActiveDetailTab] = useState("curriculum"); // curriculum | projects | aiTools | journey | whoCanJoin | fees
  const [expandedCurriculumIdx, setExpandedCurriculumIdx] = useState(0);
  const [curriculumSearch, setCurriculumSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const tabsContainerRef = useRef(null);

  // Smoothly switch tab and scroll up to the tabs view
  const switchToTab = (tabName) => {
    setActiveDetailTab(tabName);
    if (tabsContainerRef.current) {
      const yOffset = -70;
      const element = tabsContainerRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Counselor Modal State
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [counselorSubmitted, setCounselorSubmitted] = useState(false);
  const [counselorForm, setCounselorForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Domain-specific counselor & WhatsApp contact details
  const currentContact = getDomainContactInfo(selectedDomain, selectedCourse);

  // Step 1: Select Domain -> Directly go to Step 2 (Duration Program Cards)
  const handleDomainSelect = (domain, trackId = null) => {
    setSelectedDomain(domain);
    setSelectedCourse(null);
    setSelectedDuration(null);
    if (domain.hasSpecializations) {
      setSelectedDataTrack(trackId || domain.specializationTracks[0]?.id || "data-analytics");
    }
    setStep(2);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Step 2: Select Course / Duration Card -> Directly go to Step 3 (Program Details)
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    const dur =
      DURATION_OPTIONS.find((d) => d.id === course.durationId) ||
      DURATION_OPTIONS[0];
    setSelectedDuration(dur);
    setActiveDetailTab("curriculum");
    setExpandedCurriculumIdx(0);
    setCurriculumSearch("");
    setStep(3);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Reset Flow
  const handleReset = () => {
    setStep(1);
    setSelectedDomain(null);
    setSelectedCourse(null);
    setSelectedDuration(null);
    setSelectedDataTrack("data-analytics");
  };

  // Handle Counselor Form Submit
  const handleCounselorSubmit = (e) => {
    e.preventDefault();
    if (!counselorForm.name || !counselorForm.phone) return;
    setCounselorSubmitted(true);
    setTimeout(() => {
      setShowCounselorModal(false);
      setCounselorSubmitted(false);
      setCounselorForm({ name: "", phone: "", email: "" });
    }, 2500);
  };

  // Active Specialization Track (e.g. Data Analytics vs Data Science)
  const activeSpecialization =
    selectedDomain?.hasSpecializations && selectedDomain.specializationTracks
      ? selectedDomain.specializationTracks.find(
          (t) => t.id === selectedDataTrack
        ) || selectedDomain.specializationTracks[0]
      : null;

  // Collect all duration course cards for the selected domain or active track
  const domainCourses = activeSpecialization
    ? (activeSpecialization.availableDurationIds || [])
        .flatMap((durId) => activeSpecialization.coursesByDuration?.[durId] || [])
        .filter(Boolean)
    : selectedDomain
    ? (selectedDomain.availableDurationIds || [])
        .flatMap((durId) => selectedDomain.coursesByDuration?.[durId] || [])
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      {/* ==========================================
          PORTAL TOP BAR NAVIGATION
      ========================================== */}
      <div className="bg-[#1E293B] text-slate-200 border-b border-slate-700">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 text-center text-sm md:text-base font-semibold">
          <Link
            to="/"
            className="py-3 px-2 border-r border-slate-700/60 hover:bg-[#0B1220] hover:text-[#D4A017] transition"
          >
            Home
          </Link>
          <Link
            to="/academic"
            className="py-3 px-2 border-r border-slate-700/60 hover:bg-[#0B1220] hover:text-[#D4A017] transition"
          >
            Academics
          </Link>
          <Link
            to="/entrance"
            className="py-3 px-2 border-r border-slate-700/60 hover:bg-[#0B1220] hover:text-[#D4A017] transition"
          >
            Entrance
          </Link>
          <Link
            to="/competition"
            className="py-3 px-2 border-r border-slate-700/60 hover:bg-[#0B1220] hover:text-[#D4A017] transition"
          >
            Competition
          </Link>
          <Link
            to="/skilling"
            className="py-3 px-2 bg-[#7C2D12] text-white border-r border-slate-700/60 font-bold transition flex items-center justify-center gap-1"
          >
            <span>Skilling</span>
            <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse"></span>
          </Link>
          <Link
            to="/placement"
            className="py-3 px-2 hover:bg-[#0B1220] hover:text-[#D4A017] transition"
          >
            Placement
          </Link>
        </div>
      </div>

      {/* ==========================================
          HERO SECTION (EXACT SOLID DARK BLUE #0B1220, NO GRADIENT, NO SHINE)
      ========================================== */}
      <section className="bg-[#0B1220] text-white border-b-4 border-[#D4A017]">
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center bg-[#16243D] border border-slate-700 text-slate-200 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase mb-5">
            <span>National Future Skills & Career Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Future Skills Portal
          </h1>

          <p className="text-[#D4A017] mt-3 text-lg sm:text-xl font-bold max-w-2xl mx-auto">
            India's Technology & Job Placement Ecosystem
          </p>

          <div className="w-24 h-1 bg-[#D4A017] mx-auto mt-4 rounded-full"></div>

          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            Select your technology domain, explore specialized duration programs (3, 4, 6, or 12 Months),
            and launch your career with verified certifications and 100% placement support.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mt-8 pt-6 border-t border-slate-800">
            <div className="p-3.5 bg-[#16243D] border border-slate-700/60 rounded-xl text-center flex flex-col justify-center min-h-[85px]">
              <p className="text-lg sm:text-xl font-bold text-white">4</p>
              <p className="text-xs text-slate-300 mt-1 font-normal">Core Tech Domains</p>
            </div>
            <div className="p-3.5 bg-[#16243D] border border-slate-700/60 rounded-xl text-center flex flex-col justify-center min-h-[85px]">
              <p className="text-base sm:text-lg font-bold text-white leading-tight">3, 4, 6 or 12 Months</p>
              <p className="text-xs text-slate-300 mt-1 font-normal">Flexible Durations</p>
            </div>
            <div className="p-3.5 bg-[#16243D] border border-slate-700/60 rounded-xl text-center flex flex-col justify-center min-h-[85px]">
              <p className="text-lg sm:text-xl font-bold text-white">60+ Tools</p>
              <p className="text-xs text-slate-300 mt-1 font-normal">Industry Tools & Skills</p>
            </div>
            <div className="p-3.5 bg-[#16243D] border border-slate-700/60 rounded-xl text-center flex flex-col justify-center min-h-[85px]">
              <p className="text-lg sm:text-xl font-bold text-white">94%</p>
              <p className="text-xs text-slate-300 mt-1 font-normal">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE STEPPER & BREADCRUMBS (3 STEPS)
      ========================================== */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        {/* Stepper Circles */}
        <div className="flex items-center justify-between relative max-w-2xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#7C2D12] transition-all duration-500 z-0"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>

          {/* Stepper Items */}
          {[
            { num: 1, label: "1. Select Domain" },
            { num: 2, label: "2. Choose Program" },
            { num: 3, label: "3. Program Details" },
          ].map((item) => (
            <div
              key={item.num}
              onClick={() => {
                if (item.num < step) setStep(item.num);
              }}
              className={`relative z-10 flex flex-col items-center cursor-pointer transition-all ${
                item.num <= step ? "text-[#7C2D12]" : "text-slate-400"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base border-2 transition-all shadow-md ${
                  step === item.num
                    ? "bg-[#7C2D12] text-white border-[#D4A017] scale-110 ring-4 ring-orange-200"
                    : step > item.num
                    ? "bg-[#0B1220] text-[#D4A017] border-[#0B1220]"
                    : "bg-white text-slate-400 border-slate-300"
                }`}
              >
                {step > item.num ? <FaCheck className="text-sm" /> : item.num}
              </div>
              <span className="text-xs sm:text-sm font-semibold mt-2 text-center whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Breadcrumbs */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-2 text-slate-600">
            <span
              onClick={handleReset}
              className="font-medium hover:text-[#7C2D12] cursor-pointer flex items-center gap-1"
            >
              All Domains
            </span>

            {selectedDomain && (
              <>
                <FaChevronRight className="text-xs text-slate-400" />
                <span
                  onClick={() => {
                    setStep(2);
                    setSelectedCourse(null);
                  }}
                  className={`font-medium cursor-pointer ${
                    step === 2 && !selectedCourse
                      ? "text-[#7C2D12] font-bold"
                      : "hover:text-[#7C2D12]"
                  }`}
                >
                  {selectedDomain.title}
                </span>
                {activeSpecialization && (
                  <>
                    <FaChevronRight className="text-xs text-slate-400" />
                    <span
                      onClick={() => {
                        setStep(2);
                        setSelectedCourse(null);
                      }}
                      className={`font-medium cursor-pointer ${
                        step === 2 && !selectedCourse
                          ? "text-[#D4A017] bg-[#0B1220] px-2 py-0.5 rounded-md text-xs font-bold"
                          : "text-slate-700 hover:text-[#7C2D12]"
                      }`}
                    >
                      {activeSpecialization.name}
                    </span>
                  </>
                )}
              </>
            )}

            {selectedCourse && (
              <>
                <FaChevronRight className="text-xs text-slate-400" />
                <span className="font-bold text-[#7C2D12]">
                  {selectedCourse.title} ({selectedCourse.duration})
                </span>
              </>
            )}
          </div>

          {step > 1 && (
            <button
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              className="text-xs sm:text-sm inline-flex items-center gap-1.5 text-[#0B1220] hover:text-[#7C2D12] font-bold px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <FaArrowLeft className="text-xs" /> Back
            </button>
          )}
        </div>
      </div>

      {/* ==========================================
          MAIN INTERACTIVE CONTAINER
      ========================================== */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* ==========================================
            STEP 1: SELECT DOMAIN
        ========================================== */}
        {step === 1 && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220]">
                Step 1: Choose Your Career Domain
              </h2>
              <p className="text-slate-600 mt-2 text-base sm:text-lg">
                Select from our 4 specialized industry domains to see available duration programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DOMAINS.map((domain, index) => (
                <div
                  key={domain.id}
                  onClick={() => handleDomainSelect(domain)}
                  className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-[#7C2D12] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#7C2D12] group-hover:bg-[#7C2D12] group-hover:text-white transition-colors duration-300 flex items-center justify-center text-2xl shadow-inner">
                        {domain.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        0{index + 1}
                      </span>
                    </div>

                    <span
                      className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-bold border mb-2 ${domain.badgeColor}`}
                    >
                      {domain.badge}
                    </span>

                    <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-[#7C2D12] transition-colors leading-tight">
                      {domain.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                      {domain.availableDurationIds?.length || 0} Duration Tracks Available
                    </p>

                    <p className="text-slate-600 text-sm mt-3 line-clamp-3 leading-relaxed">
                      {domain.description}
                    </p>

                    {domain.hasSpecializations && domain.specializationTracks && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#7C2D12] block mb-1.5">
                          Choose Specialization Track:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {domain.specializationTracks.map((trk) => (
                            <button
                              key={trk.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDomainSelect(domain, trk.id);
                              }}
                              className="text-left p-2 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-[#7C2D12] transition"
                            >
                              <div className="font-bold text-[11px] text-[#0B1220] leading-tight truncate">
                                {trk.shortTitle}
                              </div>
                              <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                                {trk.durationSummary}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">
                        Avg CTC
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {domain.avgSalary}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-sm font-bold text-[#7C2D12] group-hover:translate-x-1 transition-transform">
                      Select Domain <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Testimonials Slider in Step 1 (Select Domain) */}
            <StudentTestimonialSlider />
          </div>
        )}

        {/* ==========================================
            STEP 2: CHOOSE PROGRAM / DURATION CARDS
            (DIRECT CARD VIEW MATCHING USER SCREENSHOTS)
        ========================================== */}
        {step === 2 && selectedDomain && (
          <div>
            {/* Domain Context Banner */}
            <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 mb-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#7C2D12] text-white flex items-center justify-center text-3xl shadow-md">
                  {selectedDomain.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                      Selected Domain
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold border ${selectedDomain.badgeColor}`}
                    >
                      {selectedDomain.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220]">
                    {selectedDomain.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {selectedDomain.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="self-start md:self-center inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#7C2D12] bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition"
              >
                <FaUndo className="text-xs" /> Change Domain
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100/80 border border-orange-200 mb-3">
                <span>Step 02 • Duration Roadmap</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#0B1220] tracking-tight">
                Step 2: Choose Your Duration Track
              </h3>
              <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
                Select your preferred duration track under <strong className="text-slate-900">{selectedDomain.title}</strong>.
              </p>
            </div>

            {/* Specialization Track Switcher (For Data Science & Data Analytics) */}
            {selectedDomain.hasSpecializations && selectedDomain.specializationTracks && (
              <div className="mb-10">
                <div className="text-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Specialization Field
                  </span>
                </div>
                <div className="max-w-2xl mx-auto bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200 shadow-inner flex items-center gap-2">
                  {selectedDomain.specializationTracks.map((trk) => {
                    const isActive = (selectedDataTrack || "data-analytics") === trk.id;
                    return (
                      <button
                        key={trk.id}
                        type="button"
                        onClick={() => setSelectedDataTrack(trk.id)}
                        className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base transition-all flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer ${
                          isActive
                            ? "bg-[#0B1220] text-[#D4A017] shadow-lg scale-[1.02] ring-2 ring-[#D4A017]/40"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
                        }`}
                      >
                        <span>{trk.name}</span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            isActive
                              ? "bg-[#D4A017] text-slate-950"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {trk.durationSummary}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {activeSpecialization && (
                  <div className="max-w-3xl mx-auto text-center mt-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full font-bold border mb-1.5 ${activeSpecialization.badgeColor}`}
                    >
                      {activeSpecialization.badge}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {activeSpecialization.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Ambient 3D Glow Orbs */}
            <div className="relative">
              <div className="absolute -top-10 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* 3D Course Cards Grid */}
              <div
                className={`relative z-10 grid grid-cols-1 gap-6 ${
                  (domainCourses?.length || 0) === 4
                    ? "md:grid-cols-2 lg:grid-cols-4"
                    : (domainCourses?.length || 0) === 3
                    ? "md:grid-cols-3"
                    : "md:grid-cols-2"
                }`}
              >
                {domainCourses.map((course, idx) => {
                  const isPopular =
                    course.isPopular ||
                    course.durationId === "6-months" ||
                    course.id?.includes("advanced");
                  return (
                    <DurationTrackCard3D
                      key={course.id}
                      course={course}
                      isPopular={isPopular}
                      onSelect={() => handleCourseSelect(course)}
                      index={idx}
                    />
                  );
                })}
              </div>
            </div>

            {/* Side-by-Side Comprehensive Track Comparison Matrix */}
            <TrackComparisonSection
              courses={domainCourses}
              selectedDomain={selectedDomain}
              onSelectCourse={handleCourseSelect}
              activeSpecialization={activeSpecialization}
            />

            <div className="flex justify-center mt-12">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-6 py-3 rounded-xl transition"
              >
                <FaArrowLeft /> Back to Domains
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            STEP 3: MASTER PROGRAM DETAILS & ENROLLMENT
        ========================================== */}
        {step === 3 && selectedDomain && selectedCourse && selectedDuration && (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Program Selected
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220] mt-3">
                {selectedCourse.title}
              </h2>
              <p className="text-slate-600 mt-1 max-w-2xl mx-auto text-sm sm:text-base">
                Official syllabus, live projects, AI tools stack, and career roadmap for the {selectedCourse.duration} track.
              </p>
            </div>

            {/* MASTER PROGRAM CARD */}
            <div className="bg-white rounded-3xl border-2 border-[#D4A017] shadow-2xl overflow-hidden mb-12">
              {/* Card Banner */}
              <div className="bg-[#0B1220] text-white p-6 sm:p-10 border-b-4 border-[#D4A017] relative">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#7C2D12] text-white flex items-center justify-center text-3xl shadow-lg border border-[#D4A017]/40 flex-shrink-0">
                      {selectedDomain.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#D4A017]">
                          {selectedDomain.title}
                        </span>
                        {activeSpecialization && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#D4A017] text-[#0B1220]">
                            {activeSpecialization.name}
                          </span>
                        )}
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${selectedCourse.levelColor}`}>
                          {selectedCourse.level}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                          <FaStar className="text-amber-400 text-[10px]" /> {selectedCourse.rating || 4.9} ({selectedCourse.ratingsCount || "1,000+ ratings"})
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-black text-white mt-1.5 leading-tight">
                        {selectedCourse.title}
                      </h3>
                      <p className="text-sm sm:text-base text-orange-200 mt-1 font-medium">
                        {selectedCourse.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center sm:text-right min-w-[170px]">
                    <span className="text-xs text-slate-300 block font-medium">
                      Duration Track
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#D4A017]">
                      {selectedCourse.duration}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                      ● Next Batch Monday
                    </span>
                  </div>
                </div>

                {/* Quick Navigation / Change Buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1"
                  >
                    <FaArrowLeft className="text-[10px]" /> Change Domain
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1"
                  >
                    <FaUndo className="text-[10px]" /> Change Duration
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-3 py-1.5 rounded-lg transition ml-auto"
                  >
                    Start Over
                  </button>
                </div>
              </div>

              {/* IF COURSE HAS RICH OFFICIAL DETAILS (EXPERT DIGITAL MARKETING) */}
              {selectedCourse.details ? (
                <div className="p-6 sm:p-10 space-y-10">
                  {/* 6 Key Performance Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {(selectedCourse.details?.keyMetrics || []).map((km, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-orange-50/70 border border-orange-200/80 rounded-2xl text-center flex flex-col justify-center"
                      >
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                          {km.label}
                        </span>
                        <span className="text-lg sm:text-xl font-black text-[#0B1220] mt-1 block">
                          {km.value}
                        </span>
                        <span className="text-[11px] text-[#7C2D12] font-semibold mt-0.5 block">
                          {km.subtext}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Official Course Overview Callout */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      <div className="lg:w-2/3">
                        <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#7C2D12] bg-orange-100 px-3 py-1 rounded-full mb-3">
                          Official Course Overview
                        </span>
                        <h4 className="text-2xl font-black text-[#0B1220] leading-snug">
                          Master Modern Digital Marketing with Real Budgets & AI
                        </h4>
                        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                          {selectedCourse.details.overviewDescription}
                        </p>
                      </div>

                      <div className="lg:w-1/3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm w-full">
                        <h5 className="font-black text-slate-900 text-sm mb-3 flex items-center gap-2">
                          <FaAward className="text-[#D4A017]" /> Program Highlights
                        </h5>
                        <ul className="space-y-2 text-xs font-semibold text-slate-700">
                          {(selectedCourse.details.highlights || []).slice(0, 5).map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <FaCheck className="text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Navigation Tabs for Course Deep Dive */}
                  <div ref={tabsContainerRef} className="scroll-mt-20">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-sm font-bold no-scrollbar">
                      <button
                        onClick={() => setActiveDetailTab("curriculum")}
                        className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                          activeDetailTab === "curriculum"
                            ? "bg-[#7C2D12] text-white shadow-md"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <FaBookOpen />
                        <span>{selectedCourse.details.modulesCount} Modules Roadmap</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                          {selectedCourse.details?.curriculumCategories?.length || 0} Categories
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveDetailTab("projects")}
                        className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                          activeDetailTab === "projects"
                            ? "bg-[#7C2D12] text-white shadow-md"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <FaRocket />
                        <span>{selectedCourse.details?.liveProjects?.length || 0} Live Projects</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                          Real Budgets
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveDetailTab("aiTools")}
                        className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                          activeDetailTab === "aiTools"
                            ? "bg-[#7C2D12] text-white shadow-md"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <FaLayerGroup />
                        <span>{selectedCourse.details.aiToolsCount} AI Tools Stack</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                          {selectedCourse.details.toolClusters?.length || 6} Clusters
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveDetailTab("journey")}
                        className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                          activeDetailTab === "journey"
                            ? "bg-[#7C2D12] text-white shadow-md"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <FaGraduationCap />
                        <span>Learning Journey</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                          {selectedCourse.details.journeySteps?.length || 6} Steps
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveDetailTab("whoCanJoin")}
                        className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                          activeDetailTab === "whoCanJoin"
                            ? "bg-[#7C2D12] text-white shadow-md"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <FaUsers />
                        <span>Who Should Join</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                          {selectedCourse.details.whoShouldJoin?.length || 6} Profiles
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveDetailTab("fees")}
                        className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                          activeDetailTab === "fees"
                            ? "bg-[#7C2D12] text-white shadow-md"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <FaAward />
                        <span>Admission & Batches</span>
                      </button>

                      {selectedCourse.details?.reviews?.length > 0 && (
                        <button
                          onClick={() => setActiveDetailTab("reviews")}
                          className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                            activeDetailTab === "reviews"
                              ? "bg-[#7C2D12] text-white shadow-md"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          <FaStar className="text-amber-400" />
                          <span>Student Reviews</span>
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                            {selectedCourse.details.reviews.length} Verified
                          </span>
                        </button>
                      )}

                      {selectedCourse.details?.faqs?.length > 0 && (
                        <button
                          onClick={() => setActiveDetailTab("faqs")}
                          className={`px-5 py-3 rounded-2xl transition whitespace-nowrap flex items-center gap-2 ${
                            activeDetailTab === "faqs"
                              ? "bg-[#7C2D12] text-white shadow-md"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          <FaQuestionCircle />
                          <span>FAQs</span>
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                            {selectedCourse.details.faqs.length} Q&As
                          </span>
                        </button>
                      )}
                    </div>

                    {/* TAB 1: 70 MODULES ROADMAP ACCORDION */}
                    {activeDetailTab === "curriculum" && (
                      <div className="mt-8 space-y-6 animate-fadeIn">
                        {/* Search in Curriculum */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                          <div>
                            <h5 className="font-black text-slate-900 text-base">
                              Explore {selectedCourse.details?.modulesCount || selectedCourse.modulesCount || 30} Modules Across {selectedCourse.details?.curriculumCategories?.length || 0} Domains
                            </h5>
                            <p className="text-xs text-slate-500">
                              Click any domain category below to inspect module topics and learned skills.
                            </p>
                          </div>
                          <div className="relative w-full sm:w-72">
                            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                            <input
                              type="text"
                              placeholder="Search SEO, Meta Ads, Canva, AEO..."
                              value={curriculumSearch}
                              onChange={(e) => setCurriculumSearch(e.target.value)}
                              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#7C2D12] bg-white"
                            />
                          </div>
                        </div>

                        {/* Category Cards */}
                        <div className="space-y-4">
                          {(selectedCourse.details?.curriculumCategories || [])
                            .map((cat, catIdx) => {
                              const q = curriculumSearch.toLowerCase().trim();
                              const modules = Array.isArray(cat.modules) ? cat.modules : [];
                              const filteredModules = q
                                ? modules.filter(
                                    (m) =>
                                      (m.title || "").toLowerCase().includes(q) ||
                                      (m.topics || []).some((t) => t.toLowerCase().includes(q)) ||
                                      (m.skills || []).some((s) => s.toLowerCase().includes(q))
                                  )
                                : modules;

                              if (q && filteredModules.length === 0) return null;

                              const isExpanded =
                                Boolean(q) || expandedCurriculumIdx === catIdx;

                              return (
                                <div
                                  key={cat.id}
                                  className="border-2 border-slate-200 rounded-2xl overflow-hidden transition bg-white"
                                >
                                  {/* Category Header */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedCurriculumIdx(
                                        expandedCurriculumIdx === catIdx ? -1 : catIdx
                                      )
                                    }
                                    className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="w-8 h-8 rounded-xl bg-[#7C2D12] text-white flex items-center justify-center font-black text-xs">
                                        0{catIdx + 1}
                                      </span>
                                      <div>
                                        <h5 className="text-base sm:text-lg font-black text-slate-900">
                                          {cat.categoryTitle}
                                        </h5>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                          {cat.categoryDesc}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <span className="text-xs font-bold bg-orange-100 text-[#7C2D12] px-2.5 py-1 rounded-full whitespace-nowrap">
                                        {filteredModules.length} Modules
                                      </span>
                                      {isExpanded ? (
                                        <FaChevronUp className="text-slate-400 text-xs" />
                                      ) : (
                                        <FaChevronDown className="text-slate-400 text-xs" />
                                      )}
                                    </div>
                                  </button>

                                  {/* Category Modules */}
                                  {isExpanded && (
                                    <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredModules.map((mod) => (
                                          <div
                                            key={mod.num}
                                            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#D4A017] transition"
                                          >
                                            <div>
                                              <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="text-[11px] font-bold text-[#7C2D12] uppercase tracking-wider">
                                                  Module {mod.num}
                                                </span>
                                              </div>
                                              <h6 className="font-black text-slate-900 text-base leading-snug mb-3">
                                                {mod.title}
                                              </h6>

                                              {/* Topics */}
                                              <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                                                {(mod.topics || []).map((topic, tIdx) => (
                                                  <li
                                                    key={tIdx}
                                                    className="flex items-start gap-1.5"
                                                  >
                                                    <span className="text-emerald-500 font-bold">
                                                      •
                                                    </span>
                                                    <span>{topic}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>

                                            {/* Skill Tags */}
                                            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                                              {(mod.skills || []).map((skill, sIdx) => (
                                                <span
                                                  key={sIdx}
                                                  className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                                                >
                                                  #{skill}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                            .filter(Boolean)}
                        </div>

                        {/* ==============================================================
                            POST-CURRICULUM QUICK EXPLORE (CROSS-TAB PREVIEWS)
                            Shows previews of 3 Live Projects, 6 AI Tools, Learning Journey
                            and Target Profiles with dynamic "+N More" count buttons that
                            redirect to the tabs and scroll smoothly to the tabs bar!
                        ============================================================== */}
                        {selectedCourse.details && (
                          <div className="mt-14 pt-10 border-t-2 border-slate-200 space-y-10">
                            {/* Section Header */}
                            <div className="text-center max-w-2xl mx-auto">
                              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7C2D12] bg-orange-100 border border-orange-200 px-3 py-1 rounded-full mb-2">
                                Beyond The Syllabus Modules
                              </span>
                              <h4 className="text-2xl sm:text-3xl font-black text-[#0B1220]">
                                More Included in Your {selectedCourse.duration} Program
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                                Syllabus modules ke alawa aapko live client campaigns, modern AI tools, aur structured career support milta hai:
                              </p>
                            </div>

                            {/* 1. LIVE BRAND PROJECTS PREVIEW (First 3 Projects + Explore More Button) */}
                            {Array.isArray(selectedCourse.details.liveProjects) &&
                              selectedCourse.details.liveProjects.length > 0 && (
                                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                                    <div>
                                      <span className="text-[11px] font-black uppercase tracking-wider text-[#7C2D12] block">
                                        Hands-On Portfolio Work
                                      </span>
                                      <h5 className="text-xl font-black text-[#0B1220] mt-0.5">
                                        Live Brand Projects with Real Ad Budgets
                                      </h5>
                                      <p className="text-xs text-slate-500 mt-0.5">
                                        Showing 3 of {selectedCourse.details.liveProjects.length} live client projects included in this track.
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => switchToTab("projects")}
                                      className="self-start sm:self-auto bg-[#0B1220] hover:bg-[#7C2D12] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition"
                                    >
                                      Explore All {selectedCourse.details.liveProjects.length} Projects{" "}
                                      {selectedCourse.details.liveProjects.length > 3
                                        ? `(+${selectedCourse.details.liveProjects.length - 3} More)`
                                        : ""}
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {selectedCourse.details.liveProjects.slice(0, 3).map((proj, pIdx) => (
                                      <div
                                        key={proj.num || pIdx}
                                        className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-[#7C2D12] transition shadow-xs"
                                      >
                                        <div>
                                          <div className="flex items-center justify-between gap-2 mb-2.5">
                                            <span className="w-7 h-7 rounded-lg bg-[#0B1220] text-[#D4A017] flex items-center justify-center font-black text-xs">
                                              P{proj.num || pIdx + 1}
                                            </span>
                                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-[#7C2D12] border border-orange-200">
                                              {proj.badge || "Live Campaign"}
                                            </span>
                                          </div>
                                          <h6 className="font-black text-slate-900 text-sm leading-snug">
                                            {proj.title}
                                          </h6>
                                          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                                            {proj.desc || proj.clientBrief}
                                          </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                                          <span>{proj.duration || "Real Ad Spend"}</span>
                                          <button
                                            type="button"
                                            onClick={() => switchToTab("projects")}
                                            className="text-[#7C2D12] hover:underline"
                                          >
                                            View Brief →
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Bottom Full CTA Button */}
                                  <div className="mt-6 text-center pt-2">
                                    <button
                                      type="button"
                                      onClick={() => switchToTab("projects")}
                                      className="inline-flex items-center gap-2 bg-[#7C2D12] hover:bg-[#60230e] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-sm"
                                    >
                                      <span>
                                        Explore All {selectedCourse.details.liveProjects.length} Live Projects{" "}
                                        {selectedCourse.details.liveProjects.length > 3
                                          ? `(+${selectedCourse.details.liveProjects.length - 3} More)`
                                          : ""}
                                      </span>
                                      <span>→</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                            {/* 2. AI TOOLS STACK PREVIEW (First 6 Tools + Explore More Button) */}
                            {(() => {
                              const clusters = selectedCourse.details.toolClusters || [];
                              const allTools = clusters.flatMap((c) =>
                                (c.tools || []).map((t) => {
                                  const toolName =
                                    typeof t === "object" && t !== null
                                      ? t.name || ""
                                      : String(t || "");
                                  const toolCategory = c.name || "AI & Digital Tools";
                                  return {
                                    name: toolName,
                                    category: toolCategory,
                                  };
                                })
                              );
                              const totalCount =
                                allTools.length ||
                                parseInt(selectedCourse.details.aiToolsCount) ||
                                40;
                              const previewTools = allTools.slice(0, 6);
                              const remainingCount = Math.max(0, totalCount - previewTools.length);

                              return (
                                <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                                    <div>
                                      <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 block">
                                        Next-Gen Tools & Automation
                                      </span>
                                      <h5 className="text-xl font-black text-[#0B1220] mt-0.5">
                                        {selectedCourse.details.aiToolsCount || "40+"} AI Tools & Marketing Stack
                                      </h5>
                                      <p className="text-xs text-slate-500 mt-0.5">
                                        Showing 6 of {totalCount} tools integrated directly into daily class exercises.
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => switchToTab("aiTools")}
                                      className="self-start sm:self-auto bg-[#0B1220] hover:bg-[#7C2D12] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition"
                                    >
                                      Explore All {totalCount} Tools{" "}
                                      {remainingCount > 0 ? `(+${remainingCount} More)` : ""}
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                    {(previewTools.length > 0
                                      ? previewTools
                                      : [
                                          { name: "ChatGPT", category: "Generative AI" },
                                          { name: "Google Gemini", category: "Generative AI" },
                                          { name: "Canva Pro AI", category: "Brand Design" },
                                          { name: "Meta Business", category: "Paid Ads" },
                                          { name: "Google Ads", category: "PPC Engine" },
                                          { name: "GA4 Analytics", category: "Tracking" },
                                        ]
                                    ).map((tool, tIdx) => (
                                      <div
                                        key={tIdx}
                                        className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center flex flex-col justify-center hover:border-purple-400 transition"
                                      >
                                        <span className="text-xs font-black text-slate-900 block truncate">
                                          {tool.name}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-medium block truncate mt-0.5">
                                          {tool.category}
                                        </span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Bottom Full CTA Button */}
                                  <div className="mt-6 text-center pt-2">
                                    <button
                                      type="button"
                                      onClick={() => switchToTab("aiTools")}
                                      className="inline-flex items-center gap-2 bg-[#0B1220] hover:bg-[#7C2D12] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-sm"
                                    >
                                      <span>
                                        Explore All {totalCount} AI Tools Stack{" "}
                                        {remainingCount > 0 ? `(+${remainingCount} More)` : ""}
                                      </span>
                                      <span>→</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })()}

                            {/* 3. LEARNING JOURNEY & WHO CAN JOIN (2-Column Preview Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Left Box: Learning Journey Preview (First 3 Steps) */}
                              {Array.isArray(selectedCourse.details.journeySteps) &&
                                selectedCourse.details.journeySteps.length > 0 && (
                                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-[#7C2D12]">
                                          Roadmap Timeline
                                        </span>
                                        <span className="text-xs font-bold text-slate-500">
                                          {selectedCourse.details.journeySteps.length} Phases Total
                                        </span>
                                      </div>
                                      <h5 className="text-lg font-black text-slate-900 mb-4">
                                        Learning Journey from Day 1 to Placement
                                      </h5>

                                      <div className="space-y-3">
                                        {selectedCourse.details.journeySteps.slice(0, 3).map((step, sIdx) => (
                                          <div
                                            key={sIdx}
                                            className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs"
                                          >
                                            <div className="font-bold text-slate-900">
                                              Phase {step.step || sIdx + 1}: {step.title}
                                            </div>
                                            <p className="text-slate-600 mt-1 line-clamp-1">
                                              {step.desc}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-slate-200">
                                      <button
                                        type="button"
                                        onClick={() => switchToTab("journey")}
                                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 transition flex items-center justify-center gap-2"
                                      >
                                        <span>
                                          Explore Full Learning Journey{" "}
                                          {selectedCourse.details.journeySteps.length > 3
                                            ? `(+${selectedCourse.details.journeySteps.length - 3} More Steps)`
                                            : ""}
                                        </span>
                                        <span>→</span>
                                      </button>
                                    </div>
                                  </div>
                                )}

                              {/* Right Box: Who Should Join Preview */}
                              {Array.isArray(selectedCourse.details.whoShouldJoin) &&
                                selectedCourse.details.whoShouldJoin.length > 0 && (
                                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-[#7C2D12]">
                                          Eligibility & Profiles
                                        </span>
                                        <span className="text-xs font-bold text-slate-500">
                                          {selectedCourse.details.whoShouldJoin.length} Personas
                                        </span>
                                      </div>
                                      <h5 className="text-lg font-black text-slate-900 mb-4">
                                        Who Gets Maximum Value from this Course?
                                      </h5>

                                      <div className="space-y-3">
                                        {selectedCourse.details.whoShouldJoin.slice(0, 3).map((prof, prIdx) => (
                                          <div
                                            key={prIdx}
                                            className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs"
                                          >
                                            <div className="font-bold text-slate-900">
                                              {prof.title}
                                            </div>
                                            <p className="text-slate-600 mt-1 line-clamp-1">
                                              {prof.desc}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-slate-200">
                                      <button
                                        type="button"
                                        onClick={() => switchToTab("whoCanJoin")}
                                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 transition flex items-center justify-center gap-2"
                                      >
                                        <span>
                                          View All Profiles & Outcomes{" "}
                                          {selectedCourse.details.whoShouldJoin.length > 3
                                            ? `(+${selectedCourse.details.whoShouldJoin.length - 3} More)`
                                            : ""}
                                        </span>
                                        <span>→</span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 2: LIVE BRAND PROJECTS */}
                    {activeDetailTab === "projects" && (
                      <div className="mt-8 space-y-6 animate-fadeIn">
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-xs font-black text-orange-700 uppercase tracking-widest block">
                              Real Work Experience
                            </span>
                            <h5 className="text-xl font-black text-slate-900 mt-1">
                              {selectedCourse.details?.liveProjects?.length || 0} Live Projects with Real Ad Budgets
                            </h5>
                            <p className="text-xs text-slate-600 mt-0.5">
                              You will execute campaigns on actual brand accounts, generate leads, and defend your results before mentors.
                            </p>
                          </div>
                          <span className="text-xs font-bold bg-white text-[#7C2D12] border border-orange-300 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xs">
                            *Brands change every batch
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {(selectedCourse.details?.liveProjects || []).map((proj) => (
                            <div
                              key={proj.num}
                              className="bg-white rounded-3xl border-2 border-slate-200 hover:border-[#7C2D12] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <span className="w-8 h-8 rounded-xl bg-[#0B1220] text-[#D4A017] flex items-center justify-center font-black text-xs">
                                    P{proj.num}
                                  </span>
                                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-orange-100 text-[#7C2D12] border border-orange-200">
                                    {proj.badge}
                                  </span>
                                </div>

                                <h5 className="text-xl font-black text-slate-900">
                                  {proj.title}
                                </h5>

                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                                  <FaClock className="text-slate-400" />
                                  <span>{proj.duration}</span>
                                </div>

                                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                                  {proj.description}
                                </p>

                                <div className="mt-4 pt-4 border-t border-slate-100">
                                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                                    Key Project Deliverables:
                                  </span>
                                  <ul className="space-y-1.5 text-xs font-medium text-slate-700">
                                    {(proj.deliverables || []).map((del, dIdx) => (
                                      <li
                                        key={dIdx}
                                        className="flex items-start gap-2"
                                      >
                                        <FaCheckCircle className="text-emerald-500 text-[11px] mt-0.5 flex-shrink-0" />
                                        <span>{del}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-5 pt-3 border-t border-slate-100 bg-orange-50/50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                                <span className="text-[11px] font-bold text-[#7C2D12] flex items-center gap-1.5">
                                  <FaAward className="text-amber-500" />
                                  {proj.highlight}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: AI TOOLS STACK */}
                    {activeDetailTab === "aiTools" && (
                      <div className="mt-8 space-y-8 animate-fadeIn">
                        <div className="text-center max-w-2xl mx-auto">
                          <h5 className="text-2xl font-black text-slate-900">
                            Hands-on Exposure to {selectedCourse.details.aiToolsCount} Industry & AI Tools
                          </h5>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            Gain practical mastery over the modern software stack used by top global marketing agencies.
                          </p>
                        </div>

                        <div className="space-y-6">
                          {(selectedCourse.details?.toolClusters || []).map((cluster, cIdx) => (
                            <div
                              key={cIdx}
                              className="bg-slate-50 border border-slate-200 rounded-3xl p-6"
                            >
                              <div className="flex items-center justify-between gap-3 mb-4">
                                <h6 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                                  <FaLayerGroup className="text-[#7C2D12]" />
                                  <span>{cluster.name}</span>
                                </h6>
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                                  {cluster.badge}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {(cluster.tools || []).map((t, tIdx) => {
                                  const toolName =
                                    typeof t === "object" && t !== null
                                      ? t.name || ""
                                      : String(t || "");
                                  const toolDesc =
                                    typeof t === "object" && t !== null
                                      ? t.desc || ""
                                      : "";
                                  const toolAccent =
                                    typeof t === "object" && t !== null && t.accent
                                      ? t.accent
                                      : "#7C2D12";

                                  return (
                                    <div
                                      key={tIdx}
                                      className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#7C2D12] transition"
                                    >
                                      <div className="flex items-center gap-2 mb-1">
                                        <span
                                          className="w-2.5 h-2.5 rounded-full"
                                          style={{ backgroundColor: toolAccent }}
                                        ></span>
                                        <span className="font-bold text-xs text-slate-900 truncate">
                                          {toolName}
                                        </span>
                                      </div>
                                      {toolDesc ? (
                                        <p className="text-[11px] text-slate-500 line-clamp-2">
                                          {toolDesc}
                                        </p>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 4: LEARNING JOURNEY */}
                    {activeDetailTab === "journey" && (
                      <div className="mt-8 space-y-6 animate-fadeIn">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                          <span className="text-xs font-black uppercase tracking-widest text-[#7C2D12]">
                            Your Path to Success
                          </span>
                          <h5 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                            Your {selectedCourse.duration} Journey With Us
                          </h5>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            From day one to your dream marketing role — step by step.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {(selectedCourse.details?.journeySteps || []).map((js) => (
                            <div
                              key={js.step}
                              className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#D4A017] shadow-sm flex flex-col justify-between"
                            >
                              <div>
                                <span className="inline-block text-xs font-black px-3 py-1 rounded-full bg-[#0B1220] text-[#D4A017] mb-3">
                                  Step {js.step}
                                </span>
                                <h6 className="text-lg font-black text-slate-900">
                                  {js.title}
                                </h6>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                  {js.desc}
                                </p>
                              </div>

                              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                                {(js.pills || []).map((pill, pIdx) => (
                                  <span
                                    key={pIdx}
                                    className="text-[10px] font-bold bg-orange-50 text-[#7C2D12] border border-orange-200 px-2 py-0.5 rounded-md"
                                  >
                                    ✓ {pill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 5: WHO SHOULD JOIN */}
                    {activeDetailTab === "whoCanJoin" && (
                      <div className="mt-8 space-y-6 animate-fadeIn">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                          <span className="text-xs font-black uppercase tracking-widest text-[#7C2D12]">
                            Tailored for You
                          </span>
                          <h5 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                            Who Should Join This {selectedCourse.level}?
                          </h5>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            Built for ambitious individuals who want real campaigns and proven career acceleration.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {(selectedCourse.details?.whoShouldJoin || []).map((w, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#7C2D12] shadow-sm"
                            >
                              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#7C2D12] flex items-center justify-center text-lg font-bold mb-3">
                                {idx === 0 ? <FaUserTie /> : idx === 1 ? <FaGraduationCap /> : idx === 2 ? <FaBriefcase /> : idx === 3 ? <FaUndo /> : idx === 4 ? <FaLaptopCode /> : <FaUsers />}
                              </div>
                              <h6 className="text-lg font-black text-slate-900">
                                {w.role}
                              </h6>
                              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                {w.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 6: FEES & CERTIFICATIONS */}
                    {activeDetailTab === "fees" && (
                      <div className="mt-8 space-y-8 animate-fadeIn">
                        {/* Certifications Grid */}
                        <div>
                          <h5 className="text-xl font-black text-slate-900 mb-2">
                            10+ Globally Recognized Certifications
                          </h5>
                          <p className="text-xs text-slate-500 mb-4">
                            Each certificate is earned upon passing module capstones and live practical assessments.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {(selectedCourse.details?.certificationsList || []).map((cert, cIdx) => (
                              <div
                                key={cIdx}
                                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-3">
                                  <FaAward className="text-[#D4A017] text-xl flex-shrink-0" />
                                  <div>
                                    <span className="font-bold text-xs text-slate-900 block leading-tight">
                                      {cert.name}
                                    </span>
                                    <span className="text-[11px] text-slate-500 block">
                                      Issuer: {cert.issuer}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                                  {cert.badge}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Training Delivery Modes & Batch Options */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
                          <h5 className="text-xl font-black text-slate-900 mb-2">
                            Training Delivery Modes & Batch Options
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-500 mb-6">
                            Choose between hands-on classroom training or live interactive online batches with dedicated mentor support.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border-2 border-[#7C2D12] shadow-sm flex flex-col justify-between">
                              <div>
                                <span className="text-xs font-black uppercase tracking-wider text-[#7C2D12] bg-orange-100 px-3 py-1 rounded-full inline-block mb-3">
                                  Offline Classroom Training
                                </span>
                                <h6 className="text-lg font-black text-[#0B1220] mb-2">
                                  In-Person Interactive Learning
                                </h6>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  Includes classroom lab access, personal dedicated workstation, physical face-to-face mentor reviews, and in-person agency internship.
                                </p>
                                <ul className="mt-4 space-y-2 text-xs text-slate-700 font-semibold">
                                  <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-600 text-xs flex-shrink-0" />
                                    <span>Daily Lab Practice & Real-time Doubt Clearing</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-600 text-xs flex-shrink-0" />
                                    <span>Offline Batch Schedule: Weekday & Weekend</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <a
                                  href={`tel:+91${currentContact.phone}`}
                                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-[#7C2D12] hover:bg-[#60230e] text-white flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02] cursor-pointer"
                                >
                                  <FaPhoneAlt className="text-xs" />
                                  <span>Talk to Counselor ({currentContact.formattedPhone})</span>
                                </a>
                                <a
                                  href={`https://wa.me/${currentContact.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to inquire about the ${selectedCourse.title} (Offline Classroom Batch)`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02]"
                                >
                                  <FaWhatsapp className="text-sm" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                              <div>
                                <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                                  Live Interactive Online
                                </span>
                                <h6 className="text-lg font-black text-[#0B1220] mb-2">
                                  Remote Live 2-Way Mentorship
                                </h6>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  Live 2-way audio/video sessions, cloud practice environment, lecture recordings on LMS, and remote paid agency internship.
                                </p>
                                <ul className="mt-4 space-y-2 text-xs text-slate-700 font-semibold">
                                  <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-600 text-xs flex-shrink-0" />
                                    <span>HD Lecture Archives & Downloadable Resources</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-600 text-xs flex-shrink-0" />
                                    <span>Flexible Evening & Weekend Batches</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <a
                                  href={`tel:+91${currentContact.phone}`}
                                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-[#0B1220] hover:bg-slate-900 text-[#D4A017] flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02] cursor-pointer"
                                >
                                  <FaPhoneAlt className="text-xs" />
                                  <span>Talk to Counselor ({currentContact.formattedPhone})</span>
                                </a>
                                <a
                                  href={`https://wa.me/${currentContact.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to inquire about the ${selectedCourse.title} (Online Live Batch)`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition shadow-md hover:scale-[1.02]"
                                >
                                  <FaWhatsapp className="text-sm" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 7: REVIEWS */}
                    {activeDetailTab === "reviews" && (
                      <div className="mt-8 space-y-8 animate-fadeIn">
                        <div className="text-center max-w-2xl mx-auto">
                          <span className="text-xs font-black uppercase tracking-widest text-[#7C2D12]">
                            Alumni Success & Placements
                          </span>
                          <h5 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                            Verified Alumni Reviews
                          </h5>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            Direct feedback from graduates working at top global cybersecurity organizations.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {(selectedCourse.details?.reviews || []).map((rev, rIdx) => (
                            <div
                              key={rIdx}
                              className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-[#D4A017] shadow-sm flex flex-col justify-between transition-all"
                            >
                              <div>
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-12 h-12 rounded-full bg-[#7C2D12] text-[#D4A017] flex items-center justify-center font-black text-lg shadow-sm">
                                    {rev.author.charAt(0)}
                                  </div>
                                  <div>
                                    <h6 className="font-black text-base text-slate-900">
                                      {rev.author}
                                    </h6>
                                    <p className="text-xs font-bold text-[#7C2D12]">
                                      {rev.role}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex text-amber-400 text-sm mb-3">
                                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                                    <FaStar key={i} />
                                  ))}
                                </div>
                                <blockquote className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                                  "{rev.text}"
                                </blockquote>
                              </div>
                              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                                <span>Verified Alumni</span>
                                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                                  <FaCheckCircle className="text-xs" /> Placed Graduate
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 8: FAQS */}
                    {activeDetailTab === "faqs" && (
                      <div className="mt-8 space-y-6 animate-fadeIn">
                        <div className="text-center max-w-2xl mx-auto">
                          <span className="text-xs font-black uppercase tracking-widest text-[#7C2D12]">
                            Got Questions? We Have Answers
                          </span>
                          <h5 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                            Frequently Asked Questions
                          </h5>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            Everything you need to know about prerequisites, labs, certifications, and placement support.
                          </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-3">
                          {(selectedCourse.details?.faqs || []).map((faq, fIdx) => {
                            const isOpen = openFaqIndex === fIdx;
                            return (
                              <div
                                key={fIdx}
                                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden transition-all shadow-xs"
                              >
                                <button
                                  onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#7C2D12] transition cursor-pointer"
                                >
                                  <span className="text-sm sm:text-base flex items-center gap-3">
                                    <span className="w-7 h-7 rounded-full bg-orange-100 text-[#7C2D12] text-xs font-black flex items-center justify-center flex-shrink-0">
                                      {fIdx + 1}
                                    </span>
                                    <span>{faq.q}</span>
                                  </span>
                                  {isOpen ? (
                                    <FaChevronUp className="text-[#7C2D12] flex-shrink-0 text-sm" />
                                  ) : (
                                    <FaChevronDown className="text-slate-400 flex-shrink-0 text-sm" />
                                  )}
                                </button>
                                {isOpen && (
                                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/60">
                                    <p>{faq.a}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Admissions, Official Links & Action CTAs Strip */}
                  <div className="border-t-2 border-slate-200 pt-8 bg-slate-50 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-10 rounded-b-3xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl sm:text-3xl font-black text-[#0B1220]">
                            Admissions Open
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                            Official Program
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                          Flexible Batches: Classroom & Live Online • 1-on-1 Senior Mentorship
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          *Includes Live Campaign Ad Budgets, Agency Internship, and Industry-Recognized Certifications.
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <a
                          href={`tel:+91${currentContact.phone}`}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-bold px-4 py-3.5 rounded-2xl transition shadow-xs text-xs sm:text-sm cursor-pointer"
                        >
                          <FaPhoneAlt className="text-xs" /> Talk to Counselor ({currentContact.formattedPhone})
                        </a>

                        <a
                          href={`https://wa.me/${currentContact.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to inquire about the ${selectedCourse.title} course`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3.5 rounded-2xl transition shadow-md text-xs sm:text-sm"
                        >
                          <FaWhatsapp className="text-base" /> WhatsApp
                        </a>

                        <a
                          href={currentContact.portalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7C2D12] hover:bg-[#60230e] text-white font-black px-6 py-3.5 rounded-2xl transition shadow-xl text-sm hover:scale-105"
                        >
                          <span>Official Portal</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* DEFAULT STANDARD STEP 3 CARD (FOR OTHER COURSES) */
                <div className="p-8 sm:p-10 space-y-10">
                  {/* 4 Feature Badges */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <FaClock className="text-2xl text-[#7C2D12] mb-2" />
                      <p className="text-xs text-slate-500 font-semibold">Total Modules</p>
                      <p className="text-base font-bold text-[#0B1220]">
                        {selectedCourse.modulesCount} {selectedCourse.modulesType}
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <FaBriefcase className="text-2xl text-[#7C2D12] mb-2" />
                      <p className="text-xs text-slate-500 font-semibold">AI Tools</p>
                      <p className="text-base font-bold text-[#0B1220]">
                        {selectedCourse.aiToolsCount} {selectedCourse.aiToolsType}
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <FaAward className="text-2xl text-[#7C2D12] mb-2" />
                      <p className="text-xs text-slate-500 font-semibold">Certification</p>
                      <p className="text-base font-bold text-[#0B1220]">
                        {selectedCourse.certification}
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <FaUsers className="text-2xl text-[#7C2D12] mb-2" />
                      <p className="text-xs text-slate-500 font-semibold">Mentorship</p>
                      <p className="text-base font-bold text-[#0B1220]">
                        {selectedCourse.mentorship}
                      </p>
                    </div>
                  </div>

                  {/* Target Audience Box */}
                  <div className={`p-5 rounded-2xl border ${selectedCourse.perfectForBg}`}>
                    <span className="block text-xs font-black uppercase tracking-wider mb-1">
                      TARGET AUDIENCE / PERFECT FOR:
                    </span>
                    <p className="text-base font-bold text-slate-900">
                      {selectedCourse.perfectFor}
                    </p>
                  </div>

                  {/* What's Included Grid */}
                  <div className="border-t border-slate-200 pt-8">
                    <h4 className="text-xl font-bold text-[#0B1220] mb-4 flex items-center gap-2">
                      <FaCalendarAlt className="text-[#7C2D12]" />
                      <span>Included in this Program</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {(selectedCourse.featureList || []).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <FaCheckCircle className={`text-sm ${selectedCourse.checkColor}`} />
                          <span className="text-sm font-semibold text-slate-800">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modules Covered Preview */}
                  <div className="border-t border-slate-200 pt-8">
                    <h4 className="text-xl font-bold text-[#0B1220] mb-2">
                      Curriculum Modules Overview
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">
                      Complete syllabus modules designed by industry experts with hands-on exercises.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(selectedCourse.modules || []).map((mod, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs"
                        >
                          <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-semibold text-slate-800">
                            {mod}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program Highlights and Action CTA */}
                  <div className="border-t border-slate-200 pt-8 bg-slate-50 -mx-8 -mb-10 p-8 sm:p-10 rounded-b-3xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl sm:text-3xl font-black text-[#0B1220]">
                            Admissions Open • Fast-Track & Regular Batches
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                            Verified Certification
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 font-medium">
                          Mode: Classroom & Online Live • 100% Practical & Placement Support
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          *Inclusive of all live training, hands-on projects, mentor review, and official certification.
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <a
                          href={`tel:+91${currentContact.phone}`}
                          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-bold px-6 py-4 rounded-2xl transition shadow-sm cursor-pointer"
                        >
                          <FaPhoneAlt className="text-xs" /> Talk to Counselor ({currentContact.formattedPhone})
                        </a>

                        <a
                          href={`https://wa.me/${currentContact.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to inquire about the ${selectedCourse.title} course`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-2xl transition shadow-md"
                        >
                          <FaWhatsapp className="text-base" /> WhatsApp
                        </a>

                        <a
                          href={currentContact.portalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-[#7C2D12] hover:bg-[#60230e] text-white font-bold px-8 py-4 rounded-2xl transition shadow-xl text-base hover:scale-105"
                        >
                          <span>Official Portal</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Compare other duration tracks under this domain */}
            <TrackComparisonSection
              courses={domainCourses}
              selectedDomain={selectedDomain}
              onSelectCourse={handleCourseSelect}
              activeSpecialization={activeSpecialization}
            />
          </div>
        )}

        {/* ==========================================
            HIRING PARTNERS STRIP (AUTHENTIC LOGOS & PROOF)
        ========================================== */}
        <HiringPartnersStrip className="mt-16" />

        {/* ==========================================
            WHY CHOOSE DIZITAL ADDA SKILLING
        ========================================== */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#7C2D12] flex items-center justify-center mx-auto text-2xl mb-5">
              <FaGraduationCap />
            </div>
            <h4 className="text-xl font-black text-[#0B1220]">
              Govt & Industry Recognized
            </h4>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Curriculum aligned with National Skill Qualification Framework (NSQF) and industry 4.0 tech standards.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#7C2D12] flex items-center justify-center mx-auto text-2xl mb-5">
              <FaBriefcase />
            </div>
            <h4 className="text-xl font-black text-[#0B1220]">
              100% Placement Support
            </h4>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Dedicated placement cell, resume critique, mock interview rounds, and direct hiring drive invitations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#7C2D12] flex items-center justify-center mx-auto text-2xl mb-5">
              <FaStar />
            </div>
            <h4 className="text-xl font-black text-[#0B1220]">
              1:1 Mentor Guidance
            </h4>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Direct weekly reviews and project consultations with senior practitioners working in top organizations.
            </p>
          </div>
        </section>
      </main>

      {/* ==========================================
          FREE CAREER COUNSELOR MODAL
      ========================================== */}
      {showCounselorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative border-2 border-[#D4A017]">
            <button
              onClick={() => setShowCounselorModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-xl"
            >
              ✕
            </button>

            {counselorSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
                  <FaCheckCircle />
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  Request Received!
                </h4>
                <p className="text-slate-600 text-sm mt-2">
                  Our Senior Career Counselor will contact you within 2 hours to guide your program selection.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCounselorSubmit}>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#7C2D12] flex items-center justify-center mx-auto text-xl mb-3">
                    <FaPhoneAlt />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">
                    Book Free Career Counseling
                  </h4>
                  <p className="text-slate-500 text-xs mt-1">
                    Get custom guidance on{" "}
                    {selectedCourse ? selectedCourse.title : "Digital Marketing"}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={counselorForm.name}
                      onChange={(e) =>
                        setCounselorForm({ ...counselorForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7C2D12] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9266500223"
                      value={counselorForm.phone}
                      onChange={(e) =>
                        setCounselorForm({ ...counselorForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7C2D12] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={counselorForm.email}
                      onChange={(e) =>
                        setCounselorForm({ ...counselorForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#7C2D12] text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#7C2D12] hover:bg-[#60230e] text-white font-bold py-3.5 rounded-xl transition shadow-lg mt-2 text-sm"
                  >
                    Request Free Callback
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

export default Skilling;
