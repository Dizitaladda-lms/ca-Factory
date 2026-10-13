import React, { useState } from "react";
import { MessageCircle, X, PhoneCall, Send, CheckCircle2 } from "lucide-react";

export default function FloatingHelpButton({
  phone = "+91 98765 43210",
  rawPhone = "9876543210",
  brandName = "CA Factory",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    level: "CA Foundation",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mobile) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({ name: "", mobile: "", level: "CA Foundation" });
    }, 2800);
  };

  return (
    <aside aria-label="Support & Counselling" className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#5A4BFF] hover:bg-[#4939E8] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          aria-label="Need Help? Talk to our CA Academic Counselor"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight pr-1">
            Talk to Expert
          </span>
        </button>
      )}

      {/* Popup Modal */}
      {isOpen && (
        <div className="w-[330px] sm:w-[360px] bg-white rounded-2xl shadow-2xl border border-[#EFEFEF] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 text-white relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
              aria-label="Close counselling modal"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">
                Senior Academic Counselor Online
              </span>
            </div>
            <h3 className="text-base font-bold">Have questions about your prep?</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Our experts can answer all your questions
            </p>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-[#1B2124]">Callback Request Received!</h4>
                <p className="text-xs text-[#757575]">
                  A senior {brandName} counselor will call you within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#757575]">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#5A4BFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#757575]">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#5A4BFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#757575]">Select Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#5A4BFF] bg-white text-[#1B2124]"
                  >
                    <option value="CA Foundation">CA Foundation</option>
                    <option value="CA Intermediate">CA Intermediate</option>
                    <option value="CA Final">CA Final</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs font-semibold rounded-[6px] shadow-sm transition flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request a Call Back</span>
                </button>
              </form>
            )}

            {/* Direct Phone Dial Button */}
            <div className="pt-2 border-t border-[#EFEFEF] text-center">
              <a
                href={`tel:${rawPhone}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1B2124] hover:text-[#5A4BFF] transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>or call us @ {phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
