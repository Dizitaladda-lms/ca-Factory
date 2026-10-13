import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Sparkles, Newspaper, Calendar } from "lucide-react";
import { BLOG_CATEGORIES } from "../../data/caBatchesData";

export default function BatchesBlogSection({ brandName = "CA Factory" }) {
  const featuredArticles = [
    {
      title: "ICAI New Scheme 2026: Paper-Wise Weightage & 90-Day Strategy",
      category: "Exam Update",
      date: "Oct 12, 2026",
      readTime: "5 min read",
      slug: "icai-new-scheme-2026-strategy",
      desc: "Complete breakdown of 30% MCQ negative marking, self-paced online modules (SPOM), and articleship stipend guidelines.",
    },
    {
      title: "How to Clear CA Foundation in First Attempt: AIR 1 Proven Schedule",
      category: "CA Foundation",
      date: "Oct 10, 2026",
      readTime: "7 min read",
      slug: "clear-ca-foundation-first-attempt",
      desc: "Daily 6-hour timetable, Law answer-writing templates, and Quantitative Aptitude calculator shortcuts.",
    },
    {
      title: "CS Executive Both Groups: Best Sequence for Company Law & Tax",
      category: "Executive",
      date: "Oct 08, 2026",
      readTime: "6 min read",
      slug: "cs-executive-company-law-tax-strategy",
      desc: "Expert tips on drafting secretarial resolutions, SEBI LODR compliance cases, and GST practical questions.",
    },
  ];

  return (
    <section className="py-14 bg-slate-50/70 border-t border-[#EFEFEF]">
      <div className="edtech-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold rounded-full mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Exam Insights & Strategy</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
              CA & CS Exam Updates & Study Strategy
            </h2>
            <p className="text-xs md:text-sm text-[#757575] mt-1.5 max-w-2xl">
              Stay ahead with real-time ICAI & ICSI notifications, syllabus changes, topper answer sheet reviews, and career guidance.
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A4BFF] hover:underline self-start md:self-auto"
          >
            <span>Browse All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Handwritten Blog Categories Bar */}
        <div className="mb-8">
          <p className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
            Explore By Exam Category:
          </p>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/blogs?category=${cat.slug}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#5A4BFF] text-[#3D3D3D] hover:text-white border border-[#EFEFEF] hover:border-[#5A4BFF] shadow-2xs whitespace-nowrap transition"
              >
                {cat.label} ({cat.count})
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow p-5 flex flex-col justify-between hover:border-[#5A4BFF]/50 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#757575] mb-2 font-medium">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-[#1B2124] group-hover:text-[#5A4BFF] transition-colors leading-snug line-clamp-2 mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#757575] line-clamp-3 mb-4">
                  {article.desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#EFEFEF] pt-3 text-xs">
                <span className="text-[#757575] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#7B7F86]" />
                  {article.date}
                </span>
                <Link
                  to={`/blog/${article.slug}`}
                  className="font-bold text-[#5A4BFF] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
