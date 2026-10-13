import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../lib/api";
import {
  CA_LEVELS,
  CS_LEVELS,
  CA_BATCHES_DATA,
  getCaBatchStats,
} from "../data/caBatchesData";

// Components
import BatchesHeader from "../components/batches/BatchesHeader";
import HeroBannerCarousel from "../components/batches/HeroBannerCarousel";
import BatchesTitleSection from "../components/batches/BatchesTitleSection";
import BatchesTabBar from "../components/batches/BatchesTabBar";
import BatchesFilterBar from "../components/batches/BatchesFilterBar";
import BatchSectionRow from "../components/batches/BatchSectionRow";
import BatchCard from "../components/batches/BatchCard";
import BatchesFacultySection from "../components/batches/BatchesFacultySection";
import FreeResourcesSection from "../components/batches/FreeResourcesSection";
import BatchesBlogSection from "../components/batches/BatchesBlogSection";
import BatchesInfoAccordion from "../components/batches/BatchesInfoAccordion";
import BatchesFaqSection from "../components/batches/BatchesFaqSection";
import DownloadAppBanner from "../components/batches/DownloadAppBanner";
import FloatingHelpButton from "../components/batches/FloatingHelpButton";
import BatchesFooter from "../components/batches/BatchesFooter";

export default function CourseListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { level: urlLevel } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const BRAND_NAME = "CA Factory";

  // Exam state (CA vs CS)
  const initialExam = searchParams.get("exam")?.toLowerCase() === "cs" ? "cs" : "ca";
  const [activeExam, setActiveExam] = useState(initialExam);

  // Tab State (All | Foundation/CSEET | Inter/Executive | Final)
  const [activeTab, setActiveTab] = useState("all");

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Handwritten & PW Filter States
  const [filters, setFilters] = useState({
    mode: "all",
    deliveryMode: "",
    categoryType: "",
    paper: "",
    targetAttempt: "",
    group: "",
    subject: "",
    batchType: "",
    status: "",
    language: "",
    courseType: "",
  });

  // Data Loading & API State
  const [batches, setBatches] = useState(CA_BATCHES_DATA);
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize Exam and Tab with URL path/query
  useEffect(() => {
    const queryExam = searchParams.get("exam")?.toLowerCase();
    if (queryExam === "cs" || queryExam === "ca") {
      setActiveExam(queryExam);
    }

    if (urlLevel) {
      const matched = [...CA_LEVELS, ...CS_LEVELS].find(
        (l) => l.slug === urlLevel.toLowerCase()
      );
      if (matched) {
        setActiveTab(matched.id);
        return;
      }
    }

    const path = location.pathname.toLowerCase();
    if (path.includes("/foundation")) {
      setActiveTab("foundation");
      setActiveExam("ca");
    } else if (path.includes("/intermediate")) {
      setActiveTab("intermediate");
      setActiveExam("ca");
    } else if (path.includes("/final")) {
      setActiveTab("final");
      setActiveExam("ca");
    } else if (searchParams.get("tab")) {
      setActiveTab(searchParams.get("tab"));
    } else {
      setActiveTab("all");
    }
  }, [location.pathname, urlLevel, searchParams]);

  // Fetch batches from backend API with fallback
  const fetchBatches = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/courses");
      const apiCourses = response.data?.courses || response.data || [];
      if (Array.isArray(apiCourses) && apiCourses.length > 0) {
        // Map API fields if available, otherwise blend with CA batches
        const normalizedApi = apiCourses.map((c) => ({
          ...c,
          exam: (c.category || "").toLowerCase().includes("cs") ? "cs" : "ca",
          level: (c.category || c.level || "foundation").toLowerCase().includes("final")
            ? "final"
            : (c.category || c.level || "").toLowerCase().includes("inter")
            ? "intermediate"
            : "foundation",
          levelLabel: c.levelLabel || c.category || "CA Batch",
          title: c.title || c.name,
          mode: c.mode || "Online",
          deliveryMode: c.deliveryMode || (c.mode === "Offline" ? "Face to Face" : "Online Live"),
          categoryType: c.categoryType || (c.title?.toLowerCase().includes("combo") ? "Combo" : "Individual"),
          paper: c.paper || "All Papers",
          language: c.language || "Hinglish",
          price: c.price || 9999,
          originalPrice: c.originalPrice || Math.round((c.price || 9999) * 2),
        }));

        // Merge API batches with curated CA & CS batches to guarantee complete coverage
        const existingIds = new Set(normalizedApi.map((c) => String(c.id)));
        const combined = [
          ...normalizedApi,
          ...CA_BATCHES_DATA.filter((b) => !existingIds.has(String(b.id))),
        ];
        setBatches(combined);
      }
    } catch {
      // Fallback silently to rich CA_BATCHES_DATA
      setBatches(CA_BATCHES_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  // Handle Exam Toggle (CA <-> CS)
  const handleExamChange = (newExam) => {
    setActiveExam(newExam);
    setActiveTab("all");
    setSearchParams({ exam: newExam });
  };

  // Handle Tab Switch (Updates URL slug smoothly)
  const handleTabChange = (tabId, slug) => {
    setActiveTab(tabId);
    if (activeExam === "ca") {
      if (tabId === "all") {
        navigate("/courses", { replace: true });
      } else {
        navigate(`/ca/${slug}/batches`, { replace: true });
      }
    } else {
      if (tabId === "all") {
        navigate("/courses?exam=cs", { replace: true });
      } else {
        navigate(`/courses?exam=cs&tab=${tabId}`, { replace: true });
      }
    }
  };

  // Handle Filter Change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      mode: "all",
      deliveryMode: "",
      categoryType: "",
      paper: "",
      targetAttempt: "",
      group: "",
      subject: "",
      batchType: "",
      status: "",
      language: "",
      courseType: "",
    });
    setSearchTerm("");
  };

  // Count Active Filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.mode && filters.mode !== "all") count++;
    if (filters.deliveryMode) count++;
    if (filters.categoryType) count++;
    if (filters.paper) count++;
    if (filters.targetAttempt) count++;
    if (filters.group) count++;
    if (filters.subject) count++;
    if (filters.batchType) count++;
    if (filters.status) count++;
    if (filters.language) count++;
    if (filters.courseType) count++;
    return count;
  }, [filters]);

  // Filtered Batches List
  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      // 1. Exam Filter (CA vs CS)
      const batchExam = (b.exam || "ca").toLowerCase();
      if (batchExam !== activeExam) {
        return false;
      }

      // 2. Tab Level Filter
      if (activeTab !== "all" && b.level !== activeTab) {
        return false;
      }

      // 3. Search Query Filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = b.title?.toLowerCase().includes(query);
        const matchesSubject = b.subject?.toLowerCase().includes(query);
        const matchesFaculty = b.faculty?.toLowerCase().includes(query);
        const matchesLevel = b.levelLabel?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSubject && !matchesFaculty && !matchesLevel) {
          return false;
        }
      }

      // 4. Delivery Mode Filter (Face to Face, Online Live, Test Series, Exam Oriented)
      if (filters.deliveryMode) {
        const dMode = (b.deliveryMode || (b.mode === "Offline" ? "Face to Face" : "Online Live")).toLowerCase();
        if (dMode !== filters.deliveryMode.toLowerCase()) {
          return false;
        }
      }

      // 5. Category Filter (Individual vs Combo)
      if (filters.categoryType) {
        const catType = (b.categoryType || (b.isPack || b.title?.toLowerCase().includes("combo") ? "Combo" : "Individual")).toLowerCase();
        if (catType !== filters.categoryType.toLowerCase()) {
          return false;
        }
      }

      // 6. Paper Number Filter (Paper - 1, Paper - 2, etc.)
      if (filters.paper) {
        const paperStr = (b.paper || b.subject || "").toLowerCase();
        if (!paperStr.includes(filters.paper.toLowerCase())) {
          return false;
        }
      }

      // 7. Mode Filter (Online / Offline)
      if (filters.mode && filters.mode !== "all") {
        if (b.mode?.toLowerCase() !== filters.mode.toLowerCase()) {
          return false;
        }
      }

      // 8. Target Attempt Filter
      if (filters.targetAttempt) {
        if (
          !b.targetAttempt?.includes(filters.targetAttempt) &&
          b.attempt !== filters.targetAttempt
        ) {
          return false;
        }
      }

      // 9. Group Filter
      if (filters.group) {
        if (b.group !== filters.group) {
          return false;
        }
      }

      // 10. Subject Filter
      if (filters.subject) {
        if (!b.subject?.toLowerCase().includes(filters.subject.toLowerCase())) {
          return false;
        }
      }

      // 11. Batch Type Filter (Paid / Free)
      if (filters.batchType) {
        if (b.batchType?.toLowerCase() !== filters.batchType.toLowerCase()) {
          return false;
        }
      }

      // 12. Status Filter (Ongoing / Upcoming)
      if (filters.status) {
        if (b.status?.toLowerCase() !== filters.status.toLowerCase()) {
          return false;
        }
      }

      // 13. Language Filter (Hinglish / English)
      if (filters.language) {
        if (b.language?.toLowerCase() !== filters.language.toLowerCase()) {
          return false;
        }
      }

      // 14. Course Type Filter (Regular / Fastrack / Pro)
      if (filters.courseType) {
        if (b.courseType?.toLowerCase() !== filters.courseType.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [batches, activeExam, activeTab, searchTerm, filters]);

  // Derived Level-wise Slices for CA
  const foundationBatches = useMemo(
    () => filteredBatches.filter((b) => b.level === "foundation"),
    [filteredBatches]
  );
  const intermediateBatches = useMemo(
    () => filteredBatches.filter((b) => b.level === "intermediate"),
    [filteredBatches]
  );
  const finalBatches = useMemo(
    () => filteredBatches.filter((b) => b.level === "final"),
    [filteredBatches]
  );

  // Derived Level-wise Slices for CS
  const cseetBatches = useMemo(
    () => filteredBatches.filter((b) => b.level === "cseet"),
    [filteredBatches]
  );
  const csExecutiveBatches = useMemo(
    () => filteredBatches.filter((b) => b.level === "executive"),
    [filteredBatches]
  );
  const csFinalBatches = useMemo(
    () => filteredBatches.filter((b) => b.level === "cs-final"),
    [filteredBatches]
  );

  // Dynamic Batch Stats for Title Section
  const batchStats = useMemo(() => getCaBatchStats(batches), [batches]);

  // Current active tabs array based on selected exam
  const currentTabs = activeExam === "cs" ? CS_LEVELS : CA_LEVELS;

  // SEO Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": activeExam === "cs" ? "CS Courses" : "CA Courses",
        "item": `${window.location.origin}/courses?exam=${activeExam}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Batches",
        "item": window.location.href,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#1B2124] flex flex-col antialiased">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* A) STICKY HEADER (80px height, logo, All Courses mega menu, auth dropdown, 4px scroll progress bar) */}
      <BatchesHeader brandName={BRAND_NAME} />

      {/* B) HERO BANNER CAROUSEL (Inside white card with card shadow) */}
      <HeroBannerCarousel brandName={BRAND_NAME} />

      {/* C) TITLE SECTION (Background image, breadcrumbs, H1, dynamic database batch count description) */}
      <BatchesTitleSection brandName={BRAND_NAME} exam={activeExam} stats={batchStats} />

      {/* D) STICKY TAB BAR + SEARCH (Exam Switcher CA/CS + Tabs + Rotating Search Placeholder) */}
      <BatchesTabBar
        tabs={currentTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        exam={activeExam}
        onExamChange={handleExamChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* E) FILTER BAR (Toggle Online/Offline, Delivery Mode, Category, Paper, Dropdown chips, Side panel trigger) */}
      <BatchesFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* F & G) COURSE SECTIONS (Foundation, Intermediate, Final or CSEET, Executive, Professional blocks) */}
      <main className="flex-1 bg-[#FFFFFF]">
        {/* If All is selected: Show each level section in order */}
        {activeTab === "all" ? (
          activeExam === "ca" ? (
            <>
              <BatchSectionRow
                title="Foundation CA Courses"
                subtitle="Build rock-solid conceptual fundamentals with complete 4-paper ICAI preparation."
                levelKey="foundation"
                batches={foundationBatches}
                isLoading={isLoading}
                onViewAll={(lvl) => handleTabChange(lvl, "foundation")}
              />

              <BatchSectionRow
                title="Intermediate CA Courses"
                subtitle="Master both groups with 6-paper New ICAI Scheme, integrated DPPs and mock tests."
                levelKey="intermediate"
                batches={intermediateBatches}
                isLoading={isLoading}
                onViewAll={(lvl) => handleTabChange(lvl, "intermediate")}
              />

              <BatchSectionRow
                title="Final CA Courses"
                subtitle="Pinnacle mastery in Financial Reporting, AFM, Direct Tax, and Indirect Tax."
                levelKey="final"
                batches={finalBatches}
                isLoading={isLoading}
                onViewAll={(lvl) => handleTabChange(lvl, "final")}
              />
            </>
          ) : (
            <>
              <BatchSectionRow
                title="CSEET Programs"
                subtitle="Kickstart your Company Secretary career with full 4-paper ICSI syllabus preparation."
                levelKey="cseet"
                batches={cseetBatches}
                isLoading={isLoading}
                onViewAll={(lvl) => handleTabChange(lvl, "cseet")}
              />

              <BatchSectionRow
                title="CS Executive Batches"
                subtitle="Master Company Law, Jurisprudence, and Corporate Tax with top CS faculties."
                levelKey="executive"
                batches={csExecutiveBatches}
                isLoading={isLoading}
                onViewAll={(lvl) => handleTabChange(lvl, "executive")}
              />

              <BatchSectionRow
                title="CS Professional (Final) Batches"
                subtitle="Governance, ESG, Corporate Restructuring, and secretarial audit compliance."
                levelKey="cs-final"
                batches={csFinalBatches}
                isLoading={isLoading}
                onViewAll={(lvl) => handleTabChange(lvl, "cs-final")}
              />
            </>
          )
        ) : (
          /* Single Selected Level View */
          <div className="py-8">
            <div className="edtech-container">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
                    {currentTabs.find((t) => t.id === activeTab)?.label || "Course Batches"}
                  </h2>
                  <p className="text-xs md:text-sm text-[#757575] mt-1">
                    Showing {filteredBatches.length} active batches for your selection.
                  </p>
                </div>
              </div>

              {filteredBatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBatches.map((batch) => (
                    <BatchCard key={batch.id} course={batch} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <h3 className="text-lg font-bold text-[#1B2124]">No Batches Match Your Filters</h3>
                  <p className="text-xs text-[#757575] mt-1 max-w-sm mx-auto">
                    Try resetting your filter parameters or search term to discover available batches.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-4 px-5 py-2 bg-[#5A4BFF] text-white text-xs font-semibold rounded-[6px] cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Global Empty State if All Tab has 0 results across all levels */}
        {activeTab === "all" && filteredBatches.length === 0 && !isLoading && (
          <div className="edtech-container py-20 text-center">
            <div className="p-8 max-w-md mx-auto bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
              <h3 className="text-lg font-bold text-[#1B2124]">No Batches Found</h3>
              <p className="text-xs text-[#757575]">
                No batches match "{searchTerm}" with the currently selected filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2 bg-[#5A4BFF] text-white text-xs font-semibold rounded-[6px] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* 3 DEDICATED SECTIONS FROM HANDWRITTEN PAPER: */}
        {/* 1. FACULTY SECTION (Subject-wise CA & CS Mentors) */}
        <BatchesFacultySection brandName={BRAND_NAME} />

        {/* 2. FREE RESOURCES SECTION (Notes, Video, Mock Test, PYQ) */}
        <FreeResourcesSection brandName={BRAND_NAME} />

        {/* 3. BLOG CATEGORIES SECTION (CA Foundation, Inter, Final, CSEET, Executive, Professional, etc.) */}
        <BatchesBlogSection brandName={BRAND_NAME} />

        {/* H) INFO ACCORDION SECTION (Features, Level-wise overviews, Comparison tables with #c2e0f4 header) */}
        <BatchesInfoAccordion brandName={BRAND_NAME} />

        {/* I) FAQ SECTION (Centered H2, animated accordion, FAQPage schema) */}
        <BatchesFaqSection brandName={BRAND_NAME} />

        {/* J) DOWNLOAD APP BANNER (3 tick points, app store buttons) */}
        <DownloadAppBanner brandName={BRAND_NAME} studentCount="1,50,000+" />
      </main>

      {/* K) FLOATING HELP BUTTON (Bottom-right popup with callback request & phone) */}
      <FloatingHelpButton
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        rawPhone="9876543210"
      />

      {/* L) FOOTER (Multi-column links, offline centres, social icons, copyright) */}
      <BatchesFooter
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        email="support@cafactory.in"
      />
    </div>
  );
}