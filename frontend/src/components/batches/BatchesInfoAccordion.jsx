import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function BatchesInfoAccordion({ brandName = "CA Factory" }) {
  // State for which accordion section is expanded
  const [expandedSections, setExpandedSections] = useState({
    features: true,
    foundationIntro: false,
    foundationTable: false,
    interIntro: false,
    interTable: false,
    finalIntro: false,
    finalTable: false,
  });

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="py-12 bg-white border-b border-[#EFEFEF]">
      <div className="edtech-container max-w-4xl">
        {/* Section Heading & Intro */}
        <div className="text-center md:text-left mb-8 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
            Explore More Information About CA Batches
          </h2>
          <p className="text-sm text-[#757575] leading-relaxed">
            Preparing for the Chartered Accountancy examination requires structured daily discipline,
            relentless conceptual clarity, and rigorous answer-writing technique. At{" "}
            <strong className="text-[#1B2124]">{brandName}</strong>, our curriculum is engineered
            around the latest ICAI guidelines to help you navigate every stage of your CA journey
            with expert faculty guidance and uncompromised consistency.
          </p>
        </div>

        {/* Accordion Blocks */}
        <div className="space-y-4">
          {/* 1. Features of [MY BRAND] CA Online Coaching */}
          <div className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => toggleSection("features")}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <span className="text-sm md:text-base font-bold text-[#1B2124]">
                1. Features of {brandName} CA Online Coaching
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7B7F86] transition-transform duration-200 ${
                  expandedSections.features ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="p-5 border-t border-[#EFEFEF]">
              <div
                className={`relative transition-all duration-300 ${
                  expandedSections.features ? "" : "max-h-12 overflow-hidden"
                }`}
              >
                <p className="text-xs md:text-sm text-[#757575] leading-relaxed mb-3">
                  Every batch at {brandName} is packed with academic tools and accountability
                  systems engineered to maximize student retention and pass percentages:
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs md:text-sm text-[#3D3D3D]">
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Experienced All-India Faculty Panel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>100% Full ICAI Syllabus Coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Live Interactive + Unlimited Recorded Backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Comprehensive Colored Notes & Daily Practice DPPs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Dedicated In-App Doubt Resolution Engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Weekly Practice Exams with Step-by-Step Marking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Offline Centre Study Support & Library Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>1-on-1 Academic Mentorship & Personalised Counselling</span>
                  </li>
                  <li className="flex items-center gap-2 md:col-span-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>24/7 Multi-Device Flexible Access on Mobile & Web</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => toggleSection("features")}
                className="mt-2 text-xs font-semibold text-[#5A4BFF] hover:underline"
              >
                {expandedSections.features ? "Show less" : "... Show more"}
              </button>
            </div>
          </div>

          {/* 2. Online Coaching for CA Foundation */}
          <div className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => toggleSection("foundationIntro")}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <span className="text-sm md:text-base font-bold text-[#1B2124]">
                2. Online Coaching for CA Foundation
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7B7F86] transition-transform duration-200 ${
                  expandedSections.foundationIntro ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="p-5 border-t border-[#EFEFEF]">
              <div
                className={`relative transition-all duration-300 ${
                  expandedSections.foundationIntro ? "" : "max-h-12 overflow-hidden"
                }`}
              >
                <p className="text-xs md:text-sm text-[#757575] leading-relaxed mb-3">
                  CA Foundation serves as the stepping stone into professional accountancy. Our Foundation
                  batches are specifically tailored for Class 12 appearing and passed students,
                  bridging high-school accounts with ICAI standards:
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-[#3D3D3D]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Complete coverage of Paper 1 (Accounting) and Paper 2 (Business Laws) with regular writing practice.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Zero-to-hero Quantitative Aptitude shortcut classes designed specifically for non-math students.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Business Economics real-life case studies and MCQs solving sessions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Chapter-wise ICAI Module & Revision Test Papers (RTP) thoroughly solved in class.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Full syllabus All-India Simulated Mock Tests under actual exam time pressure.</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => toggleSection("foundationIntro")}
                className="mt-2 text-xs font-semibold text-[#5A4BFF] hover:underline"
              >
                {expandedSections.foundationIntro ? "Show less" : "... Show more"}
              </button>
            </div>
          </div>

          {/* 3. Popular CA Foundation Batches (Table) */}
          <div className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => toggleSection("foundationTable")}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <span className="text-sm md:text-base font-bold text-[#1B2124]">
                3. Popular CA Foundation Batches (Comparison Table)
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7B7F86] transition-transform duration-200 ${
                  expandedSections.foundationTable ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="p-5 border-t border-[#EFEFEF]">
              <div
                className={`relative transition-all duration-300 overflow-x-auto ${
                  expandedSections.foundationTable ? "" : "max-h-20 overflow-hidden"
                }`}
              >
                <table className="w-full border-collapse border-2 border-black text-xs md:text-sm text-center">
                  <thead>
                    <tr className="bg-[#c2e0f4] text-[#1B2124] border-b-2 border-black">
                      <th className="border-2 border-black p-2.5 font-bold">Batch Name</th>
                      <th className="border-2 border-black p-2.5 font-bold">Medium</th>
                      <th className="border-2 border-black p-2.5 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/foundation/batches" className="hover:underline">
                          CA Foundation Rankers Pro Batch
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        Comprehensive 4-Paper foundation mastery with 550+ live hours and DPPs.
                      </td>
                    </tr>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/foundation/batches" className="hover:underline">
                          CA Foundation Fastrack Booster
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        60-Days intensive revision with previous 10-year question solving.
                      </td>
                    </tr>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/foundation/batches" className="hover:underline">
                          CA Foundation English Pro
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">English</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        100% English delivered lectures for South India and NRI students.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => toggleSection("foundationTable")}
                className="mt-2 text-xs font-semibold text-[#5A4BFF] hover:underline"
              >
                {expandedSections.foundationTable ? "Show less" : "... Show more"}
              </button>
            </div>
          </div>

          {/* 4. Online Coaching for CA Intermediate */}
          <div className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => toggleSection("interIntro")}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <span className="text-sm md:text-base font-bold text-[#1B2124]">
                4. Online Coaching for CA Intermediate
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7B7F86] transition-transform duration-200 ${
                  expandedSections.interIntro ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="p-5 border-t border-[#EFEFEF]">
              <div
                className={`relative transition-all duration-300 ${
                  expandedSections.interIntro ? "" : "max-h-12 overflow-hidden"
                }`}
              >
                <p className="text-xs md:text-sm text-[#757575] leading-relaxed mb-3">
                  CA Intermediate is the crucial pivot where practical accounting depth and statutory
                  compliance come into full play under ICAI New Scheme (6 Papers across Group 1 & 2):
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-[#3D3D3D]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Advanced Accounting standards (AS) with step-by-step practical balance sheet formatting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Corporate & Other Laws analytical legal language answer-writing practice.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Direct Taxation & GST combined curriculum with live tax portal returns simulation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Cost & Management Accounting decision-making techniques and formula mnemonics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Auditing and Ethics memory charts & Financial Management capital budgeting deep dive.</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => toggleSection("interIntro")}
                className="mt-2 text-xs font-semibold text-[#5A4BFF] hover:underline"
              >
                {expandedSections.interIntro ? "Show less" : "... Show more"}
              </button>
            </div>
          </div>

          {/* 5. Popular CA Intermediate Batches (Table) */}
          <div className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => toggleSection("interTable")}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <span className="text-sm md:text-base font-bold text-[#1B2124]">
                5. Popular CA Intermediate Batches (Comparison Table)
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7B7F86] transition-transform duration-200 ${
                  expandedSections.interTable ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="p-5 border-t border-[#EFEFEF]">
              <div
                className={`relative transition-all duration-300 overflow-x-auto ${
                  expandedSections.interTable ? "" : "max-h-20 overflow-hidden"
                }`}
              >
                <table className="w-full border-collapse border-2 border-black text-xs md:text-sm text-center">
                  <thead>
                    <tr className="bg-[#c2e0f4] text-[#1B2124] border-b-2 border-black">
                      <th className="border-2 border-black p-2.5 font-bold">Batch Name</th>
                      <th className="border-2 border-black p-2.5 font-bold">Medium</th>
                      <th className="border-2 border-black p-2.5 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/intermediate/batches" className="hover:underline">
                          CA Inter Both Groups Master Pack
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        Complete 6-paper curriculum with 900+ hours live, DPPs and RTP solving.
                      </td>
                    </tr>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/intermediate/batches" className="hover:underline">
                          CA Inter Group 1 Foundation-to-Pro
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        Specialized focus on Adv Accounting, Corporate Laws and Comprehensive Tax.
                      </td>
                    </tr>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/intermediate/batches" className="hover:underline">
                          CA Inter Group 2 Specialist Batch
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        Costing, Auditing Standards (SAs) and Financial Management & Strategic Mgmt.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => toggleSection("interTable")}
                className="mt-2 text-xs font-semibold text-[#5A4BFF] hover:underline"
              >
                {expandedSections.interTable ? "Show less" : "... Show more"}
              </button>
            </div>
          </div>

          {/* 6. Online Coaching for CA Final */}
          <div className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => toggleSection("finalIntro")}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <span className="text-sm md:text-base font-bold text-[#1B2124]">
                6. Online Coaching for CA Final
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7B7F86] transition-transform duration-200 ${
                  expandedSections.finalIntro ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="p-5 border-t border-[#EFEFEF]">
              <div
                className={`relative transition-all duration-300 ${
                  expandedSections.finalIntro ? "" : "max-h-12 overflow-hidden"
                }`}
              >
                <p className="text-xs md:text-sm text-[#757575] leading-relaxed mb-3">
                  CA Final is the pinnacle of the qualification requiring executive-level financial analysis
                  and statutory mastery:
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-[#3D3D3D]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Financial Reporting (FR): Exhaustive Ind AS coverage with global IFRS case comparisons.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Advanced Financial Management (AFM): Forex risk, derivatives & M&A valuation models.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Advanced Auditing, Assurance & Professional Ethics with actual reporting case studies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Direct Tax & International Taxation: Transfer pricing & cross-border treaties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5A4BFF] font-bold">•</span>
                    <span>Indirect Tax Laws: Customs, GST appellate disputes & litigation strategies.</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => toggleSection("finalIntro")}
                className="mt-2 text-xs font-semibold text-[#5A4BFF] hover:underline"
              >
                {expandedSections.finalIntro ? "Show less" : "... Show more"}
              </button>
            </div>
          </div>

          {/* 7. Popular CA Final Batches (Table) */}
          <div className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-white shadow-xs">
            <button
              type="button"
              onClick={() => toggleSection("finalTable")}
              className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition"
            >
              <span className="text-sm md:text-base font-bold text-[#1B2124]">
                7. Popular CA Final Batches (Comparison Table)
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7B7F86] transition-transform duration-200 ${
                  expandedSections.finalTable ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="p-5 border-t border-[#EFEFEF]">
              <div
                className={`relative transition-all duration-300 overflow-x-auto ${
                  expandedSections.finalTable ? "" : "max-h-20 overflow-hidden"
                }`}
              >
                <table className="w-full border-collapse border-2 border-black text-xs md:text-sm text-center">
                  <thead>
                    <tr className="bg-[#c2e0f4] text-[#1B2124] border-b-2 border-black">
                      <th className="border-2 border-black p-2.5 font-bold">Batch Name</th>
                      <th className="border-2 border-black p-2.5 font-bold">Medium</th>
                      <th className="border-2 border-black p-2.5 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/final/batches" className="hover:underline">
                          CA Final Financial Reporting (FR) Masterclass
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        Complete Ind AS mastery with AIR 3 faculty and ICAI modules solved.
                      </td>
                    </tr>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/final/batches" className="hover:underline">
                          CA Final AFM Mastery Batch
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        Foreign exchange, derivatives and portfolio corporate valuation models.
                      </td>
                    </tr>
                    <tr className="border-b-2 border-black hover:bg-slate-50">
                      <td className="border-2 border-black p-2.5 font-semibold text-[#5A4BFF]">
                        <Link to="/ca/final/batches" className="hover:underline">
                          CA Final DT & IDT Pro Combo
                        </Link>
                      </td>
                      <td className="border-2 border-black p-2.5">Hinglish</td>
                      <td className="border-2 border-black p-2.5 text-left">
                        Direct Tax and GST amended under latest Finance Act with case laws.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => toggleSection("finalTable")}
                className="mt-2 text-xs font-semibold text-[#5A4BFF] hover:underline"
              >
                {expandedSections.finalTable ? "Show less" : "... Show more"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
