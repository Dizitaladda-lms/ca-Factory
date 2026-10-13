import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import { CA_LEVELS, CA_BATCHES_DATA, getCaBatchStats } from "../data/caBatchesData";

// Components
import BatchesHeader from "../components/batches/BatchesHeader";
import HeroBannerCarousel from "../components/batches/HeroBannerCarousel";
import BatchesTitleSection from "../components/batches/BatchesTitleSection";
import BatchesTabBar from "../components/batches/BatchesTabBar";
import BatchesFilterBar from "../components/batches/BatchesFilterBar";
import BatchSectionRow from "../components/batches/BatchSectionRow";
import BatchesInfoAccordion from "../components/batches/BatchesInfoAccordion";
import BatchesFaqSection from "../components/batches/BatchesFaqSection";
import DownloadAppBanner from "../components/batches/DownloadAppBanner";
import FloatingHelpButton from "../components/batches/FloatingHelpButton";
import BatchesFooter from "../components/batches/BatchesFooter";

export default function CourseListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { level: urlLevel } = useParams();

  const BRAND_NAME = "CA Factory";

  // Tab State
  const [activeTab, setActiveTab] = useState("all");

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Filter States
  const [filters, setFilters] = useState({
    mode: "all",
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

  // Synchronize Tab with URL path (e.g. /ca/foundation/batches or location.state)
  useEffect(() => {
    if (urlLevel) {
      const matched = CA_LEVELS.find((l) => l.slug === urlLevel.toLowerCase());
      if (matched) {
        setActiveTab(matched.id);
        return;
      }
    }

    const path = location.pathname.toLowerCase();
    if (path.includes("/foundation")) {
      setActiveTab("foundation");
    } else if (path.includes("/intermediate")) {
      setActiveTab("intermediate");
    } else if (path.includes("/final")) {
      setActiveTab("final");
    } else {
      setActiveTab("all");
    }
  }, [location.pathname, urlLevel]);

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
          level: (c.category || c.level || "foundation").toLowerCase().includes("final")
            ? "final"
            : (c.category || c.level || "").toLowerCase().includes("inter")
            ? "intermediate"
            : "foundation",
          levelLabel: c.levelLabel || c.category || "CA Batch",
          title: c.title || c.name,
          mode: c.mode || "Online",
          language: c.language || "Hinglish",
          price: c.price || 9999,
          originalPrice: c.originalPrice || Math.round((c.price || 9999) * 2),
        }));

        // Merge API batches with curated CA batches to guarantee complete coverage
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

  // Handle Tab Switch (Updates URL slug smoothly)
  const handleTabChange = (tabId, slug) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      navigate("/courses", { replace: true });
    } else {
      navigate(`/ca/${slug}/batches`, { replace: true });
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
      // Tab Level Filter
      if (activeTab !== "all" && b.level !== activeTab) {
        return false;
      }

      // Search Query Filter
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

      // Mode Filter (Online / Offline)
      if (filters.mode && filters.mode !== "all") {
        if (b.mode?.toLowerCase() !== filters.mode.toLowerCase()) {
          return false;
        }
      }

      // Target Attempt Filter
      if (filters.targetAttempt) {
        if (!b.targetAttempt?.includes(filters.targetAttempt) && b.attempt !== filters.targetAttempt) {
          return false;
        }
      }

      // Group Filter
      if (filters.group) {
        if (b.group !== filters.group) {
          return false;
        }
      }

      // Subject Filter
      if (filters.subject) {
        if (!b.subject?.toLowerCase().includes(filters.subject.toLowerCase())) {
          return false;
        }
      }

      // Batch Type Filter (Paid / Free)
      if (filters.batchType) {
        if (b.batchType?.toLowerCase() !== filters.batchType.toLowerCase()) {
          return false;
        }
      }

      // Status Filter (Ongoing / Upcoming)
      if (filters.status) {
        if (b.status?.toLowerCase() !== filters.status.toLowerCase()) {
          return false;
        }
      }

      // Language Filter (Hinglish / English)
      if (filters.language) {
        if (b.language?.toLowerCase() !== filters.language.toLowerCase()) {
          return false;
        }
      }

      // Course Type Filter (Regular / Fastrack / Pro)
      if (filters.courseType) {
        if (b.courseType?.toLowerCase() !== filters.courseType.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [batches, activeTab, searchTerm, filters]);

  // Derived Level-wise Slices for Sections
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

  // Dynamic Batch Stats for Title Section
  const batchStats = useMemo(() => getCaBatchStats(batches), [batches]);

  // SEO Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "CA Courses",
        "item": `${window.location.origin}/courses`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "CA Batches",
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

      {/* C) TITLE SECTION (Background image, breadcrumb, H1, dynamic database batch count description) */}
      <BatchesTitleSection brandName={BRAND_NAME} stats={batchStats} />

      {/* D) STICKY TAB BAR + SEARCH (Tabs: All | Foundation | Intermediate | Final with rotating placeholder) */}
      <BatchesTabBar
        tabs={CA_LEVELS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* E) FILTER BAR (Toggle Online/Offline, Dropdown chips, Side panel trigger) */}
      <BatchesFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* F & G) COURSE SECTIONS (Foundation, Intermediate, Final blocks with Batch Cards) */}
      <main className="flex-1 bg-[#FFFFFF]">
        {/* If All is selected: Show each level section in order */}
        {activeTab === "all" ? (
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
          /* Single Selected Level View */
          <div className="py-8">
            <div className="edtech-container">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
                    {activeTab === "foundation"
                      ? "Foundation CA Courses"
                      : activeTab === "intermediate"
                      ? "Intermediate CA Courses"
                      : "Final CA Courses"}
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
                    className="mt-4 px-5 py-2 bg-[#5A4BFF] text-white text-xs font-semibold rounded-[6px]"
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
                className="px-5 py-2 bg-[#5A4BFF] text-white text-xs font-semibold rounded-[6px]"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

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