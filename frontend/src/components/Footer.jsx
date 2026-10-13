import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-32 bg-[#0B1220] text-white mt-auto border-t-4 border-[#D4A017]">
      <div className="max-w-[1800px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ORGANIZATION */}
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              CA FACTORY
            </h2>
            <div className="w-20 h-1 bg-[#D4A017] mt-4"></div>
            <p className="mt-6 text-gray-300 leading-8 text-sm">
              India's premier learning destination for Chartered Accountancy (CA) and Company Secretary (CS) examinations. Selection Hoga Yahi Se!
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://dizitaladda.com"
                target="_blank"
                rel="noreferrer"
                className="border border-slate-600 px-4 py-2 rounded-md hover:bg-[#1E293B] text-xs transition"
              >
                Website
              </a>
              <a
                href="#"
                className="border border-slate-600 px-4 py-2 rounded-md hover:bg-[#1E293B] text-xs transition"
              >
                Facebook
              </a>
              <a
                href="#"
                className="border border-slate-600 px-4 py-2 rounded-md hover:bg-[#1E293B] text-xs transition"
              >
                Instagram
              </a>
              <a
                href="#"
                className="border border-slate-600 px-4 py-2 rounded-md hover:bg-[#1E293B] text-xs transition"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-2xl font-bold text-[#D4A017]">Quick Links</h3>
            <div className="mt-6 space-y-3 text-sm">
              <Link to="/" className="block text-gray-300 hover:text-[#D4A017] transition">
                Home
              </Link>
              <Link to="/courses" className="block text-gray-300 hover:text-[#D4A017] transition">
                Explore Courses
              </Link>
              <Link to="/academic" className="block text-gray-300 hover:text-[#D4A017] transition">
                Academic Programs
              </Link>
              <Link to="/entrance" className="block text-gray-300 hover:text-[#D4A017] transition">
                Entrance Batches
              </Link>
              <Link to="/competition" className="block text-gray-300 hover:text-[#D4A017] transition">
                Govt Competition
              </Link>
              <Link to="/skilling" className="block text-gray-300 hover:text-[#D4A017] transition">
                Skilling & AI Programs
              </Link>
              <Link to="/placement" className="block text-gray-300 hover:text-[#D4A017] transition">
                100% Placement Track
              </Link>
              <Link to="/blogs" className="block text-gray-300 hover:text-[#D4A017] transition">
                Articles & Blogs
              </Link>
              <Link to="/verify-certificate" className="block text-gray-300 hover:text-[#D4A017] transition">
                Verify Certificate
              </Link>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div>
            <h3 className="text-2xl font-bold text-[#D4A017]">Contact Information</h3>
            <div className="mt-6 space-y-4 text-gray-300 text-sm">
              <p>Greater Kailash II, New Delhi - 110048</p>
              <p>+91 9876543210</p>
              <p>support@vikshitbharat2047.in</p>
              <p>www.vikshitbharat2047.in</p>
            </div>
          </div>

          {/* HEADQUARTERS & GOOGLE MAPS */}
          <div>
            <h3 className="text-2xl font-bold text-[#D4A017]">Headquarters</h3>
            <div className="mt-6 bg-[#1E293B] border border-slate-700 rounded-md p-6">
              <h4 className="text-lg font-bold text-white">New Delhi, India</h4>
              <p className="mt-2 text-gray-400 text-xs">CA Factory Headquarters</p>
              <a
                href="https://maps.google.com/?q=2nd+Floor+Spacetime+Management+Pvt+Ltd+Design+House+behind+Savitri+Cinema+Complex+Greater+Kailash+II+Chittaranjan+Park+New+Delhi+110048"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-5 bg-[#D4A017] text-black px-5 py-2.5 rounded-md font-bold text-xs hover:opacity-90 transition shadow-md"
              >
                View On Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-xs text-center sm:text-left gap-4">
          <div>
            © 2026 CA Factory • All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[#D4A017] font-medium">
            <Link to="/about" className="hover:underline">About Us</Link>
            <span>•</span>
            <Link to="/courses" className="hover:underline">Programs</Link>
            <span>•</span>
            <Link to="/login" className="hover:underline">Portal Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
