import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaLightbulb, FaCheckCircle, FaUser, FaRegCommentDots } from "react-icons/fa";
import api from "../lib/api";

export default function AiMentorModal({ isOpen, onClose, courseTitle, lectureTitle }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Namaste! Main aapka Dizital Adda AI Mentor hoon 🤖. Is lecture ya course me aapko koi bhi doubt ho, aap bina kisi jhijhak ke yahan puch sakte hain!",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen) return null;

  const quickPrompts = [
    "💡 Is lecture ka concept aasan Hindi me samjhao",
    "🎯 Is topic par interview me kya pucha jata hai?",
    "📝 Is lecture ke key takeaway points batao",
    "🚀 Is concept ko live project me kaise apply karein?",
  ];

  const handleSend = async (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText("");
    setLoading(true);

    try {
      const res = await api.post("/api/ai/ask", {
        message: userMsg.text,
        courseTitle: courseTitle || "LMS Program",
        lectureTitle: lectureTitle || "Current Session",
      });

      const aiReply = {
        id: Date.now() + 1,
        sender: "ai",
        text: res.data?.reply || "Aapka doubt note ho gaya hai. Kripya apna sawal thoda aur detail me likhein.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Main aapka doubt samajh raha hoon. Kripya 1 second baad dobara puchiye!",
          time: "Just now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh] max-h-[640px] animate-in fade-in zoom-in-95 duration-200">
        {/* HEADER */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5A4BFF] text-white flex items-center justify-center text-lg font-bold shadow-sm">
              <FaRobot />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                  TSG AI Doubt Solver
                </h3>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Online 24/7
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80 truncate max-w-xs mt-0.5">
                {lectureTitle ? `Session: ${lectureTitle}` : courseTitle || "AI Learning Assistant"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* CHAT MESSAGES BODY */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "ai" && (
                <div className="w-7 h-7 rounded-lg bg-[#7C2D12] text-white flex items-center justify-center text-xs shrink-0 mt-1 shadow-xs">
                  <FaRobot />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#0B1220] text-white rounded-tr-none"
                    : "bg-white text-slate-800 border border-slate-200 rounded-tl-none whitespace-pre-line"
                }`}
              >
                <div>{m.text}</div>
                <div
                  className={`text-[9px] mt-1.5 text-right font-medium ${
                    m.sender === "user" ? "text-slate-400" : "text-slate-400"
                  }`}
                >
                  {m.time}
                </div>
              </div>

              {m.sender === "user" && (
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center text-xs shrink-0 mt-1 shadow-xs font-bold">
                  <FaUser />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-[#7C2D12] text-white flex items-center justify-center text-xs shrink-0">
                <FaRobot />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3.5 shadow-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#7C2D12] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#7C2D12] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#7C2D12] animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-xs text-slate-500 font-medium ml-1">AI Mentor thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* QUICK PROMPT CHIPS */}
        <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => handleSend(p)}
              className="whitespace-nowrap text-[11px] font-semibold text-slate-700 bg-white hover:bg-amber-50 hover:text-[#7C2D12] border border-slate-200 hover:border-amber-300 px-3 py-1.5 rounded-full transition cursor-pointer shadow-2xs shrink-0 disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* INPUT BAR */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Apna doubt type karein (e.g. Google ads me quality score kya hota hai?)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:bg-white focus:border-[#7C2D12] focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white p-2.5 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 shrink-0 shadow-sm"
          >
            <FaPaperPlane className="text-xs" />
            <span className="hidden sm:inline">Pucho</span>
          </button>
        </form>
      </div>
    </div>
  );
}
