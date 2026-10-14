import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
  FaTelegram,
} from "react-icons/fa6";

export default function BatchesFooter({
  brandName = "CS Factory",
  phone = "+91 98765 43210",
  email = "support@cafactory.in",
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-contact" className="bg-slate-950 text-white pt-14 pb-8 border-t-4 border-[#5A4BFF]">
      <div className="edtech-container">
        {/* Top Grid: 5 Columns + Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info (2 Columns on large) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="CS Factory Home">
              <div className="bg-white rounded-xl px-3 py-1.5 inline-flex items-center shadow-sm hover:opacity-95 transition">
                <img
                  src="/logo.png"
                  alt="CS Factory Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              India's premier digital learning platform dedicated to Company Secretary (CS) and
              Chartered Accountancy (CA) aspirants. Engineered with top-rank faculty, rigorous ICSI & ICAI curriculum coverage, daily
              DPPs, and comprehensive mock test series to guide you through all levels.
            </p>

            {/* Social Icons (Facebook, Instagram, YouTube, LinkedIn, X, Telegram) */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5A4BFF] text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5A4BFF] text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5A4BFF] text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <FaYoutube className="w-3.5 h-3.5" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5A4BFF] text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
              <a
                href="#twitter"
                aria-label="X Twitter"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5A4BFF] text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#telegram"
                aria-label="Telegram"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5A4BFF] text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <FaTelegram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-white transition">Our Faculty</Link>
              </li>
              <li>
                <a href="#footer-contact" className="hover:text-white transition">Contact Us</a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition">Careers</a>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white transition">Updates & News</Link>
              </li>
              <li>
                <Link to="/verify-certificate" className="hover:text-white transition">Verify Certificate</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Offline Centres */}
          <div className="space-y-3" id="offline-centres">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Offline Centres
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Delhi (South Extension)</li>
              <li>Delhi (Laxmi Nagar)</li>
              <li>Jaipur (Tonk Road)</li>
              <li>Ahmedabad (Navrangpura)</li>
              <li>Pune (Prestige Point)</li>
              <li>Bengaluru (Jayanagar)</li>
            </ul>
          </div>

          {/* Column 3: Popular Exams */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Popular Exams
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/ca/foundation/batches" className="hover:text-white transition">CA Foundation</Link>
              </li>
              <li>
                <Link to="/ca/intermediate/batches" className="hover:text-white transition">CA Intermediate (G1)</Link>
              </li>
              <li>
                <Link to="/ca/intermediate/batches" className="hover:text-white transition">CA Intermediate (G2)</Link>
              </li>
              <li>
                <Link to="/ca/final/batches" className="hover:text-white transition">CA Final (FR & AFM)</Link>
              </li>
              <li>
                <Link to="/ca/final/batches" className="hover:text-white transition">CA Final (DT & IDT)</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition">All CA Batches</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div id="footer-contact" className="space-y-3 scroll-mt-24">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Connect With Us
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-500 mr-1.5 font-semibold">Tel:</span>
                <a href={`tel:${phone}`} className="hover:text-white transition font-medium text-slate-300">{phone}</a>
              </li>
              <li>
                <span className="text-slate-500 mr-1.5 font-semibold">Email:</span>
                <a href={`mailto:${email}`} className="hover:text-white transition font-medium text-slate-300">{email}</a>
              </li>
              <li className="pt-1 text-slate-400">
                <span className="text-slate-500 font-semibold block">Headquarters:</span>
                <span>Team CS Factory Hub, New Delhi - 110048</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Free Learning Resources Link Grid */}
        <div className="py-8 border-b border-slate-800">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
            Free CA Learning Resources
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs text-slate-400">
            <a href="#rtp" className="hover:text-white transition">ICAI RTPs Solved</a>
            <a href="#mtp" className="hover:text-white transition">ICAI MTP Series</a>
            <a href="#suggested" className="hover:text-white transition">Suggested Answers</a>
            <a href="#amendments" className="hover:text-white transition">Tax Amendments 2026</a>
            <a href="#charts" className="hover:text-white transition">Formula & Summary Charts</a>
            <a href="#case-laws" className="hover:text-white transition">Corporate Law Case Briefs</a>
          </div>
        </div>

        {/* Bottom Row: Privacy Policy | Terms of Use | Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-300 transition">Terms of Use</a>
            <span>•</span>
            <a href="#disclaimer" className="hover:text-slate-300 transition">ICAI Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
