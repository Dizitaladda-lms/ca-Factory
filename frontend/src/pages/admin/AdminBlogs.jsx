import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCheck,
  FaTimes,
  FaBookOpen,
  FaFileAlt,
  FaExternalLinkAlt,
  FaSave,
  FaArrowLeft,
  FaMagic,
  FaCopy,
  FaCheckCircle,
  FaCode,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import RichArticleEditor from "../../components/admin/RichArticleEditor";
import api from "../../lib/api";

const CATEGORIES = [
  "CA Foundation",
  "CA Inter",
  "CA Final",
  "CS Executive",
  "CS Professional",
];

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "CA Foundation",
    meta_title: "",
    meta_description: "",
    keywords: "",
    publisher: "Dizital Adda",
    author_name: "Dr. Gulshan Kumar",
    author_role: "Founder & Master Trainer, Dizital Adda",
    read_time: "7 min read",
    featured_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    summary: "",
    content: "",
    tags: "",
    schema_markup: "",
    is_published: true,
    status: "published", scheduled_at: "",
    faqs: [
      { question: "", answer: "" }
    ],
    focus_keyword: "", secondary_keywords: [], canonical_url: "", robots_index: true, robots_follow: true,
    og_title: "", og_description: "", og_image: "", twitter_title: "", twitter_description: "", twitter_image: "",
    featured_image_alt: "", author_bio: "", reviewer_name: "", reviewer_credentials: "", content_type: "article", language: "en",
    course_id: "",
    translation_key: "",
  });

  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  // ── AI Blog Generator State ──────────────────────────────
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiTopic, setAiTopic]         = useState("");
  const [aiPromptVisible, setAiPromptVisible] = useState(false);
  const [aiResponseText, setAiResponseText]   = useState("");
  const [aiParseError, setAiParseError]       = useState("");
  const [promptCopied, setPromptCopied]       = useState(false);


  const fetchAdminBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/blogs/admin/all");
      if (res.data?.success) {
        setBlogs(res.data.blogs || []);
      }
    } catch (err) {
      console.error("Failed to load admin blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBlogs();
  }, []);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // ── AI Prompt Builder ────────────────────────────────────
  const buildAiPrompt = () => {
    const topic = aiTopic.trim() || "How to Build a Successful Career in AI & Digital Marketing in 2026";
    return `You are the Lead SEO Content Specialist for "Dizital Adda" (https://dizitaladda.com), a premier digital skills and career transformation institute in India specializing in AI & Prompt Engineering, Digital Marketing, Data Analytics, Cyber Security, and Full Stack Development.

TASK:
Write a high-ranking, 100% human-tone, comprehensive SEO blog article formatted EXACTLY to fit our internal "SEO Admin Portal" form fields.

--------------------------------------------------
OUTPUT FORMAT (Provide all 9 fields strictly in this structure):
--------------------------------------------------

### 1. ARTICLE TITLE:
[Catchy, keyword-focused, under 65 characters, without quotes]

### 2. URL SLUG:
[Clean, lower-case, hyphenated slug, e.g., how-to-learn-digital-marketing-roadmap]

### 3. CATEGORY:
[Choose one: AI & Prompt Engineering | Digital Marketing | Data Analytics & Science | Cyber Security | Career & Placement Guides | Full Stack Web Development | Competitive & Academic Prep]

### 4. META TITLE:
[Max 60 characters, includes target keyword + " | Dizital Adda"]

### 5. META DESCRIPTION:
[140-155 characters engaging summary with a clear call-to-action]

### 6. FOCUS KEYWORDS:
[8 to 12 comma-separated high-intent search keywords]

### 7. PUBLISHER:
Dizital Adda

### 8. ARTICLE BODY (Rich HTML for Quill Editor - 1200 to 1600 words):
- Use <h2> for all primary section headers and <h3> for sub-points. (DO NOT use <h1> inside the body).
- Tone: Empathetic, professional, practical industry-first voice suited for Indian learners, freshers & working professionals.
- Must include:
  a) Hook / Relatable Problem Statement (e.g., skill obsolescence, career stagnancy, high-paying tech demand).
  b) Science/Industry-backed explanation of core tools, technologies & career frameworks.
  c) Clear Step-by-Step roadmap/process with bullet points or numbered steps.
  d) Comparative HTML Table (Clean <table> with <thead> and <tbody> comparing tools, salaries, or pathways).
  e) Natural Program Recommendations: Seamlessly mention Dizital Adda programs (Gen AI & Prompt Engineering, Digital Marketing Mastery, Data Analytics & Science, Cyber Security, Full Stack Development).
  f) FAQs Section: 4 to 5 common reader questions with clear, actionable answers.

### 9. JSON-LD SCHEMA (Ready to paste into Schema box):
[Generate valid JSON-LD code containing an "@context": "https://schema.org" object or array with "FAQPage" schema corresponding to the FAQs in the article, and an "Article" or "HowTo" schema].

--------------------------------------------------
TOPIC / FOCUS KEYWORD:
${topic}
--------------------------------------------------`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(buildAiPrompt()).then(() => {
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 3000);
    });
  };

  // ── AI Response Parser ───────────────────────────────────
  const parseAiResponse = () => {
    setAiParseError("");
    const text = aiResponseText.trim();
    if (!text) { setAiParseError("Please paste the AI-generated response first."); return; }

    const extract = (label, nextLabel) => {
      const re = new RegExp(`###\\s*${label}[^\\n]*\\n([\\s\\S]*?)(?=###\\s*${nextLabel}|$)`, "i");
      const m = text.match(re);
      return m ? m[1].trim() : "";
    };

    const title       = extract("1\\. ARTICLE TITLE:", "2\\.");
    const slug        = extract("2\\. URL SLUG:", "3\\.");
    const category    = extract("3\\. CATEGORY:", "4\\.");
    const metaTitle   = extract("4\\. META TITLE:", "5\\.");
    const metaDesc    = extract("5\\. META DESCRIPTION:", "6\\.");
    const keywords    = extract("6\\. FOCUS KEYWORDS:", "7\\.");
    const publisher   = extract("7\\. PUBLISHER:", "8\\.");
    const content     = extract("8\\. ARTICLE BODY[^:]*:", "9\\.");
    let schemaRaw     = extract("9\\. JSON-LD SCHEMA[^:]*:", "$");

    if (!title || !content) {
      setAiParseError("Could not parse response. Make sure you copied the full AI output including all ### sections.");
      return;
    }

    // Clean up JSON-LD schema (remove markdown code fences if present)
    schemaRaw = schemaRaw.replace(/^```(json)?/i, "").replace(/```$/i, "").trim();

    // Parse category — match to known categories
    const matchedCat = CATEGORIES.find(c =>
      category.toLowerCase().includes(c.toLowerCase().slice(0, 8))
    ) || CATEGORIES[0];

    // Extract FAQs from content HTML if possible
    const faqs = [];
    const faqMatches = content.matchAll(/<h3>(?:Q:?\s*)?(.*?)<\/h3>\s*<p>(.*?)<\/p>/gi);
    for (const match of faqMatches) {
      if (match[1] && match[2]) {
        faqs.push({
          question: match[1].replace(/<[^>]+>/g, "").trim(),
          answer: match[2].replace(/<[^>]+>/g, "").trim()
        });
      }
    }

    // Extract summary hook from first paragraph of content
    const firstP = content.match(/<p>(.*?)<\/p>/i);
    const summary = firstP ? firstP[1].replace(/<[^>]+>/g, "").trim().slice(0, 220) : metaDesc;

    setFormData(prev => ({
      ...prev,
      title: title.replace(/^["']|["']$/g, ""),
      slug: slug.replace(/^\//, "").trim(),
      category: matchedCat,
      meta_title: metaTitle.slice(0, 60),
      meta_description: metaDesc.slice(0, 160),
      keywords: keywords,
      publisher: publisher || "Dizital Adda",
      summary: summary,
      content: content,
      schema_markup: schemaRaw,
      tags: keywords.split(",").slice(0, 5).join(", "),
      faqs: faqs.length > 0 ? faqs : prev.faqs,
    }));

    setAiPanelOpen(false);
    setAiResponseText("");
    showToast("✅ All 9 fields imported successfully! Review and publish.");
  };



  // Auto-generate slug from title
  const handleTitleChange = (val) => {
    const updated = { ...formData, title: val };
    if (!editingBlogId) {
      updated.slug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      updated.meta_title = `${val.slice(0, 45)} | Dizital Adda`;
    }
    setFormData(updated);
  };

  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setFormData({
      title: "",
      slug: "",
    category: "CA Foundation",
      meta_title: "",
      meta_description: "",
      keywords: "",
      publisher: "Dizital Adda",
      author_name: "Dr. Gulshan Kumar",
      author_role: "Founder & Master Trainer, Dizital Adda",
      read_time: "7 min read",
      featured_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      summary: "",
      content: `<h2>Section 1: The Core Industry Challenge</h2>\n<p>Explain the critical industry context, tools, or pain points here...</p>\n\n<h2>Section 2: Step-by-Step Strategic Roadmap</h2>\n<p>Detail the methodology, active frameworks, and practical milestones...</p>\n\n<h2>Section 3: Practical Industry Comparison</h2>\n<p>Include comparison insights or career deliverables...</p>`,
      tags: "AI, Career, Roadmap",
      schema_markup: "",
      is_published: true,
      status: "draft", scheduled_at: "",
      faqs: [
        { question: "What is the expected career growth in this field?", answer: "Professionals in this track consistently see strong compensation jumps of 40% to 100% within 12 to 18 months." }
      ],
      focus_keyword: "", secondary_keywords: [], canonical_url: "", robots_index: true, robots_follow: true,
      og_title: "", og_description: "", og_image: "", twitter_title: "", twitter_description: "", twitter_image: "",
      featured_image_alt: "", author_bio: "", reviewer_name: "", reviewer_credentials: "", content_type: "article", language: "en",
      course_id: "",
      translation_key: "",
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "CA Foundation",
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
      keywords: blog.keywords || "",
      publisher: blog.publisher || "Dizital Adda",
      author_name: blog.author_name || "Dr. Gulshan Kumar",
      author_role: blog.author_role || "Dizital Adda Faculty",
      read_time: blog.read_time || "7 min read",
      featured_image: blog.featured_image || "",
      summary: blog.summary || "",
      content: blog.content || "",
      schema_markup: typeof blog.schema_markup === "object" ? JSON.stringify(blog.schema_markup, null, 2) : (blog.schema_markup || ""),
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : (blog.tags || ""),
      is_published: blog.is_published !== undefined ? blog.is_published : true,
      status: blog.status || (blog.is_published ? "published" : "draft"), scheduled_at: blog.scheduled_at ? new Date(blog.scheduled_at).toISOString().slice(0, 16) : "",
      faqs: Array.isArray(blog.faqs) && blog.faqs.length > 0 ? blog.faqs : [{ question: "", answer: "" }],
      focus_keyword: blog.focus_keyword || "", secondary_keywords: blog.secondary_keywords || [], canonical_url: blog.canonical_url || "",
      robots_index: blog.robots_index !== false, robots_follow: blog.robots_follow !== false,
      og_title: blog.og_title || "", og_description: blog.og_description || "", og_image: blog.og_image || "",
      twitter_title: blog.twitter_title || "", twitter_description: blog.twitter_description || "", twitter_image: blog.twitter_image || "",
      featured_image_alt: blog.featured_image_alt || "", author_bio: blog.author_bio || "", reviewer_name: blog.reviewer_name || "",
      reviewer_credentials: blog.reviewer_credentials || "", content_type: blog.content_type || "article", language: blog.language || "en",
      course_id: blog.course_id || "",
      translation_key: blog.translation_key || "",
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      const res = await api.delete(`/api/blogs/${id}`);
      if (res.data?.success) {
        showToast("Blog deleted successfully.");
        fetchAdminBlogs();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete blog.");
    }
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }],
    });
  };

  const handleRemoveFaq = (idx) => {
    const updated = formData.faqs.filter((_, i) => i !== idx);
    setFormData({ ...formData, faqs: updated });
  };

  const handleFaqChange = (idx, field, value) => {
    const updated = [...formData.faqs];
    updated[idx][field] = value;
    setFormData({ ...formData, faqs: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please provide both Title and Content Body.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        is_published: formData.status === "published",
        scheduled_at: formData.scheduled_at ? new Date(formData.scheduled_at).toISOString() : null,
        tags: typeof formData.tags === "string" ? formData.tags.split(",").map(s => s.trim()).filter(Boolean) : formData.tags,
        faqs: formData.faqs.filter(f => f.question.trim() && f.answer.trim()),
      };

      if (editingBlogId) {
        await api.put(`/api/blogs/${editingBlogId}`, payload);
        showToast("Blog updated successfully!");
      } else {
        await api.post("/api/blogs", payload);
        showToast("Blog published successfully!");
      }

      setIsFormOpen(false);
      fetchAdminBlogs();
    } catch (err) {
      console.error("Save error:", err);
      alert(err.response?.data?.message || "Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchCat = selectedCategory === "All" || b.category === selectedCategory;
    const matchSearch =
      !search.trim() ||
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.slug?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const seoText = (formData.content || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const seoWords = seoText ? seoText.split(" ").length : 0;
  const focus = (formData.focus_keyword || "").trim().toLowerCase();
  const firstParagraph = (formData.content || "").match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1]?.replace(/<[^>]+>/g, " ").toLowerCase() || "";
  const seoChecks = [
    ["Focus keyword in title", Boolean(focus && formData.title.toLowerCase().includes(focus))],
    ["Focus keyword in URL slug", Boolean(focus && formData.slug.toLowerCase().includes(focus.replace(/\s+/g, "-")))],
    ["Focus keyword in meta description", Boolean(focus && formData.meta_description.toLowerCase().includes(focus))],
    ["Focus keyword in first paragraph", Boolean(focus && firstParagraph.includes(focus))],
    ["Featured image alt text", Boolean(formData.featured_image_alt)],
    ["At least 600 words", seoWords >= 600],
    ["Internal link", /href=["']\/(?!\/)/i.test(formData.content)],
    ["External reference", /href=["']https?:\/\//i.test(formData.content)],
    ["Readable meta title (50–60 chars)", formData.meta_title.length >= 50 && formData.meta_title.length <= 60],
    ["Meta description (150–160 chars)", formData.meta_description.length >= 150 && formData.meta_description.length <= 160],
  ];
  const seoScore = Math.round((seoChecks.filter(([, passed]) => passed).length / seoChecks.length) * 100);

  return (
    <AdminLayout title="Blog & Article Manager" subtitle="Create, edit and publish blog articles for the public site">
      <div className="flex-1">
        {/* TOAST NOTIFICATION */}
        {notification && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-700 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce">
            <FaCheck />
            <span>{notification}</span>
          </div>
        )}

        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
              <FaBookOpen />
              <span>SEO Content & Editorial Management</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0B1220] tracking-tight mt-1">
              Blog & Article Manager
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage high-ranking SEO blogs, dynamic Auto-TOC headings, and Schema.org metadata.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/blogs"
              target="_blank"
              className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition"
            >
              <FaExternalLinkAlt />
              <span>View Public Blog</span>
            </Link>

            <button
              onClick={() => {
                setAiPanelOpen(true);
                setAiPromptVisible(false);
                setAiParseError("");
              }}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-md cursor-pointer"
            >
              <FaMagic className="text-amber-200" />
              <span>AI SEO Writer</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="bg-[#0B1220] hover:bg-[#7C2D12] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-md"
            >
              <FaPlus />
              <span>Create New Article</span>
            </button>
          </div>
        </div>

        {/* CONTROLS (SEARCH & CATEGORY FILTER) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 w-full sm:w-80 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <FaSearch className="text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or slug..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500">Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ARTICLES TABLE */}
        <div className="mt-6 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-slate-500 font-semibold text-sm">
              Loading articles...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              <FaFileAlt className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-slate-700">No blog articles match your criteria.</p>
              <button
                onClick={handleOpenCreate}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:underline"
              >
                + Write a new article now
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="bg-[#0B1220] text-white uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Article Title</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Author</th>
                    <th className="py-4 px-4 text-center">Reads</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredBlogs.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 max-w-sm">
                        <div className="font-bold text-slate-900 line-clamp-1">
                          {b.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          /blog/{String(b.category || "blog").toLowerCase().replace(/[^a-z0-9]+/g, "-")}/{b.slug}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                          {b.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {b.author_name}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-900">
                        {(b.views || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            (b.status || (b.is_published ? "published" : "draft")) === "published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {(b.status || (b.is_published ? "published" : "draft")).replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(b.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        <Link
                          to={`/blog/${String(b.category || "blog").toLowerCase().replace(/[^a-z0-9]+/g, "-")}/${b.slug}`}
                          target="_blank"
                          className="inline-flex p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                          title="View Live Article"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                          title="Edit Article"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Article"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CREATE / EDIT MODAL DRAWER */}
        {/* ========================================================= */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-3xl bg-white h-full overflow-y-auto p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-[#0B1220]">
                      {editingBlogId ? "Edit Blog Article" : "Create New SEO Blog Article"}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Strict formatting: H2/H3 for Auto-TOC, Meta Title under 60 chars, and high-intent keywords.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAiPanelOpen(true);
                        setAiPromptVisible(false);
                        setAiParseError("");
                      }}
                      className="bg-amber-100 border border-amber-300 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <FaMagic className="text-amber-700" />
                      <span>Auto-fill with AI</span>
                    </button>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>
                </div>

                <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Title & Slug */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Blog Title (H1 Equivalent) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Gen AI & Prompt Engineering: 2026 Roadmap"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {formData.title.length}/65 chars (Optimal for Google SERP)
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        URL Slug (kebab-case) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. prompt-engineering-gen-ai-career-roadmap-2026"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Category & Read Time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        value={formData.read_time}
                        onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                        placeholder="e.g. 7 min read"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Meta Title & Meta Description */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Meta Title (Google Snippet)
                      </label>
                      <input
                        type="text"
                        value={formData.meta_title}
                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                        placeholder="Max 60 chars | Dizital Adda"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {formData.meta_title.length}/60 chars
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Keywords (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        placeholder="8-12 search terms (e.g. prompt engineering, llm, rag)"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Meta Description (140 – 160 chars)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      placeholder="Concise summary with a compelling call-to-action for Google search result snippets..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                    <span className="text-[10px] text-slate-400 block">
                      {formData.meta_description.length}/160 chars
                    </span>
                  </div>

                  <section aria-labelledby="blog-seo-fields" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-4">
                    <h3 id="blog-seo-fields" className="text-sm font-black text-slate-900">Search and social metadata</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <label className="text-xs font-bold">Focus keyword<input value={formData.focus_keyword} onChange={(e) => setFormData({ ...formData, focus_keyword: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Secondary keywords<input value={Array.isArray(formData.secondary_keywords) ? formData.secondary_keywords.join(", ") : formData.secondary_keywords} onChange={(e) => setFormData({ ...formData, secondary_keywords: e.target.value.split(",").map((word) => word.trim()).filter(Boolean) })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold sm:col-span-2">Canonical URL<input type="url" value={formData.canonical_url} onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Open Graph title<input value={formData.og_title} onChange={(e) => setFormData({ ...formData, og_title: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Open Graph image URL<input value={formData.og_image} onChange={(e) => setFormData({ ...formData, og_image: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Twitter title<input value={formData.twitter_title} onChange={(e) => setFormData({ ...formData, twitter_title: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Twitter image URL<input value={formData.twitter_image} onChange={(e) => setFormData({ ...formData, twitter_image: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Featured image alt text<input value={formData.featured_image_alt} onChange={(e) => setFormData({ ...formData, featured_image_alt: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Reviewed by<input value={formData.reviewer_name} onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Reviewer credentials<input value={formData.reviewer_credentials} onChange={(e) => setFormData({ ...formData, reviewer_credentials: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Content type<select value={formData.content_type} onChange={(e) => setFormData({ ...formData, content_type: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal"><option value="article">Article</option><option value="exam_update">Exam Update</option><option value="study_notes">Study Notes</option><option value="result_announcement">Result Announcement</option><option value="syllabus_change">Syllabus Change</option><option value="success_story">Success Story</option><option value="study_plan">Study Plan</option></select></label>
                      <label className="text-xs font-bold">Language<select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal"><option value="en">English</option><option value="hi">Hindi</option></select></label>
                      <label className="text-xs font-bold">Translation group key<input value={formData.translation_key} onChange={(e) => setFormData({ ...formData, translation_key: e.target.value })} placeholder="Use same key for English/Hindi pair" className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                      <label className="text-xs font-bold">Linked LMS course ID<input type="number" min="1" value={formData.course_id} onChange={(e) => setFormData({ ...formData, course_id: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 font-normal" /></label>
                    </div>
                    <div className="flex flex-wrap gap-5 text-xs font-semibold">
                      <label className="flex items-center gap-2"><input type="checkbox" checked={formData.robots_index} onChange={(e) => setFormData({ ...formData, robots_index: e.target.checked })} />Allow indexing</label>
                      <label className="flex items-center gap-2"><input type="checkbox" checked={formData.robots_follow} onChange={(e) => setFormData({ ...formData, robots_follow: e.target.checked })} />Allow link following</label>
                    </div>
                    <div className="rounded-xl bg-white p-3" aria-live="polite">
                      <div className="flex justify-between text-xs font-bold"><span>SEO checklist</span><span>{seoScore}/100 · {seoWords} words</span></div>
                      <ul className="mt-2 grid gap-1 sm:grid-cols-2 text-[11px] text-slate-600">{seoChecks.map(([label, passed]) => <li key={label}>{passed ? "✓" : "•"} {label}</li>)}</ul>
                    </div>
                  </section>

                  {/* Author Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        placeholder="e.g. Dr. Gulshan Kumar"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Author Role / Bio
                      </label>
                      <input
                        type="text"
                        value={formData.author_role}
                        onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                        placeholder="e.g. Founder & Master Trainer, Dizital Adda"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Featured Image URL */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.featured_image}
                      onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                  </div>

                  {/* Excerpt / Summary Hook */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Article Summary / Hook
                    </label>
                    <textarea
                      rows={2}
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Immediate hook addressing the reader's real career pain point..."
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                  </div>

                  {/* Rich Article Body Editor (WYSIWYG + HTML + Image & Table Support) */}
                  <div>
                    <RichArticleEditor
                      value={formData.content}
                      onChange={(newContent) => setFormData((prev) => ({ ...prev, content: newContent }))}
                      placeholder="Write your article insights here with full rich text formatting..."
                    />
                  </div>

                  {/* Dynamic FAQs Builder */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-bold text-slate-800">
                        Frequently Asked Questions (For FAQPage Schema)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="text-[11px] font-bold text-amber-800 hover:underline"
                      >
                        + Add Question
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 relative">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                            placeholder={`Question #${idx + 1}...`}
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                            placeholder="Concise answer..."
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                          />
                          {formData.faqs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(idx)}
                              className="text-[10px] text-red-500 font-bold hover:underline"
                            >
                              Remove Question
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Field 9: JSON-LD Schema (Optional Override) */}
                  <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <FaCode className="text-amber-600" />
                        <span>Field #9: Custom JSON-LD Schema Markup (Optional)</span>
                      </label>
                      <span className="text-[10px] text-slate-400">FAQPage / Article / HowTo Schema</span>
                    </div>
                    <textarea
                      rows={4}
                      value={formData.schema_markup || ""}
                      onChange={(e) => setFormData({ ...formData, schema_markup: e.target.value })}
                      placeholder="Paste JSON-LD Schema (e.g. FAQPage, BlogPosting) or leave empty for auto-generation"
                      className="w-full px-3.5 py-2 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Leave empty to auto-generate valid Google-compliant BlogPosting + FAQPage + BreadcrumbList JSON-LD on save.
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="text-xs font-bold text-slate-700">Editorial status
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5">
                        <option value="draft">Draft</option><option value="in_review">In review</option><option value="scheduled">Scheduled</option><option value="published">Published</option><option value="archived">Archived</option>
                      </select>
                    </label>
                    {formData.status === "scheduled" && <label className="text-xs font-bold text-slate-700">Publish at
                      <input required type="datetime-local" value={formData.scheduled_at} onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5" />
                    </label>}
                  </div>
                </form>
              </div>

              {/* MODAL FOOTER ACTIONS */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="blog-form"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold flex items-center gap-2 transition shadow-lg disabled:opacity-50"
                >
                  <FaSave />
                  <span>{saving ? "Saving..." : editingBlogId ? "Update Article" : "Publish Article"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* AI BLOG GENERATOR MODAL */}
        {/* ========================================================= */}
        {aiPanelOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
              {/* Header */}
              <div className="bg-[#0B1220] p-6 text-white flex items-center justify-between border-b-2 border-amber-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                    <FaMagic className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white">AI SEO Content Generator</h3>
                    <p className="text-xs text-amber-200">1-Click Prompt Builder & Auto-Fill All 9 Fields</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiPanelOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs">
                {/* STEP 1: Enter Topic */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B1220] text-amber-400 font-bold flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span className="font-bold text-slate-800 text-xs">Enter Your Topic / Target Keyword:</span>
                  </div>
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. How to Become a Full Stack AI Developer in 6 Months (or 'Saffron Benefits for Glowing Skin')"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition cursor-pointer shadow-sm"
                    >
                      {promptCopied ? <FaCheckCircle className="text-emerald-300" /> : <FaCopy />}
                      <span>{promptCopied ? "Prompt Copied to Clipboard!" : "Copy SEO Prompt for ChatGPT / Claude"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAiPromptVisible(!aiPromptVisible)}
                      className="text-slate-600 hover:text-slate-900 px-3 py-2 font-semibold underline"
                    >
                      {aiPromptVisible ? "Hide Prompt" : "Preview Prompt"}
                    </button>
                  </div>
                </div>

                {/* Optional Prompt Preview */}
                {aiPromptVisible && (
                  <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap border border-slate-700">
                    {buildAiPrompt()}
                  </div>
                )}

                {/* STEP 2: Paste AI Response */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B1220] text-amber-400 font-bold flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span className="font-bold text-slate-800 text-xs">
                      Paste the Complete Output from ChatGPT / Claude / Gemini:
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={aiResponseText}
                    onChange={(e) => {
                      setAiResponseText(e.target.value);
                      setAiParseError("");
                    }}
                    placeholder="Paste the full AI reply here starting with: ### 1. ARTICLE TITLE ... and ### 9. JSON-LD SCHEMA"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0B1220]"
                  />
                  {aiParseError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                      {aiParseError}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setAiPanelOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={parseAiResponse}
                  disabled={!aiResponseText.trim()}
                  className="bg-[#0B1220] hover:bg-[#7C2D12] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaMagic className="text-amber-400" />
                  <span>Parse & Auto-Fill All Form Fields</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
