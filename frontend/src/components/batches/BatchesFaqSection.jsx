import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function BatchesFaqSection({ brandName = "CA Factory" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Which batch is best for CA?",
      answer: `The best batch depends on your preparation stage. For beginners starting after Class 12, the CA Foundation Rankers Pro Batch provides complete 4-paper foundation with full live interactive guidance. For CA Intermediate, our Both Groups Master Pack covers all 6 papers under the New ICAI Scheme with integrated DPPs and mock exams. If you have already completed syllabus once and need rapid score acceleration, the 75-Days Fastrack Supercharger batch is ideal.`,
    },
    {
      question: "How can I enroll in your CA online courses?",
      answer: `Enrolling is instantaneous and 100% digital. Browse the batch of your choice on this page, click "Buy Now" or "Select Plan", choose your preferred payment mode (UPI, Debit/Credit Card, Net Banking or No-Cost EMI), and complete checkout. Your course will be immediately activated in your student dashboard, granting instant access to live lectures, study materials, and the doubt engine.`,
    },
    {
      question: "Can I pass CA Inter in 40 days?",
      answer: `While clearing CA Intermediate from scratch in 40 days is extremely challenging due to the vast depth of 6 heavy papers, students who have already covered the syllabus at least once can successfully pass by enrolling in our intensive Fastrack Booster batches. A disciplined 12-14 hours daily study schedule focused exclusively on high-weightage ICAI modules, Revision Test Papers (RTP), and step-by-step writing evaluation can turn the odds decisively in your favor.`,
    },
    {
      question: "Is CA harder than IAS?",
      answer: `Both qualifications demand extraordinary dedication but test different skill sets. UPSC (IAS) has an extremely broad syllabus spanning history, geography, governance, ethics, and current affairs with subjective essay-style evaluations and interview stages. Chartered Accountancy (CA), on the other hand, demands surgical precision, technical computational mastery of tax statutes, advanced accounting standards (Ind AS), and auditing ethics. CA features an open-entry system but enforces strict single-digit passing cutoffs at Intermediate and Final stages.`,
    },
    {
      question: "Is CA harder than IIT?",
      answer: `IIT JEE focuses heavily on high-speed conceptual problem-solving in Physics, Chemistry, and Advanced Mathematics for entry into undergraduate engineering, where the primary filter is competitive rank percentiles. Chartered Accountancy is a marathon professional career journey that combines rigorous academic papers with mandatory articleship training under a practicing CA. Both are premier examinations with distinct intellectual requirements—neither is inherently easier.`,
    },
  ];

  // FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 bg-[#F8FAFC]">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="edtech-container max-w-4xl">
        <div className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow p-6 md:p-10">
          {/* Centered Heading */}
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-semibold">
              <span>Got Doubts?</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
              CA Online Coaching 2026-27 FAQ
            </h2>
            <p className="text-xs md:text-sm text-[#757575]">
              Everything you need to know about {brandName} batches, ICAI syllabus, and preparation
              strategies.
            </p>
          </div>

          {/* Animated Accordion Q&A */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#EFEFEF] rounded-lg overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="text-sm md:text-base font-bold text-[#1B2124] pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7B7F86] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#5A4BFF]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 md:px-5 border-t border-[#EFEFEF] bg-slate-50/50">
                      <p className="text-xs md:text-sm text-[#757575] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
