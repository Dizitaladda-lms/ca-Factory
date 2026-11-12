import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCog,
  FaLock,
  FaSignOutAlt,
  FaSave,
  FaCheckCircle,
  FaShieldAlt,
  FaEnvelope,
  FaPhone,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function Settings() {
  const navigate = useNavigate();

  // Notification state
  const [notification, setNotification] = useState(null);
  const showNotification = (type, msg) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4500);
  };

  // Profile State
  const [profile, setProfile] = useState({
    name: "System Admin",
    email: "admin@dizitaladda.com",
    phone: "+919266500223",
    role: "admin",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Load User Data from localStorage or API
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.email) {
      setProfile({
        name: storedUser.name || "System Admin",
        email: storedUser.email || "admin@dizitaladda.com",
        phone: storedUser.phone || "+919266500223",
        role: storedUser.role || "admin",
      });
    }
  }, []);

  // Handle Profile Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    try {
      setSavingProfile(true);
      const res = await api.put("/api/admin/update-profile", {
        name: profile.name.trim(),
        phone: profile.phone?.trim() || null,
      });

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...storedUser, name: profile.name.trim(), phone: profile.phone?.trim() };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showNotification("success", res.data?.message || "Admin profile updated successfully! 🚀");
    } catch (error) {
      console.error("Profile update error:", error);
      showNotification("error", error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Handle Password Update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword) {
      alert("Please enter both current and new password.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }

    try {
      setUpdatingPassword(true);
      const res = await api.put("/api/admin/update-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      showNotification("success", res.data?.message || "Password updated successfully! 🔐");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password update error:", error);
      showNotification("error", error.response?.data?.message || "Failed to update password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out from the Admin Console?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <AdminLayout
      title="Admin Account & Security Settings ⚙️"
      subtitle="Manage your administrative credentials, update personal contact profile, change passwords, and terminate active sessions."
    >
      {/* NOTIFICATION */}
      {notification && (
        <div
          className={
            "mb-6 p-4 rounded-xl flex items-center gap-3 border shadow-xs transition-all " +
            (notification.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-red-50 border-red-300 text-red-800")
          }
        >
          <FaCheckCircle className="text-lg shrink-0" />
          <span className="font-semibold text-sm">{notification.msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ============================================================ */}
        {/* CARD 1: PROFILE INFORMATION */}
        {/* ============================================================ */}
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-[#0B1220] text-white py-3.5 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
              <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
                <FaUserCog className="text-[#D4A017]" />
                <span>Admin Profile Information</span>
              </h3>
              <span className="text-[11px] font-bold text-orange-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">
                Super Admin
              </span>
            </div>

            <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#D4A017] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address (Primary Login ID)
                </label>
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Authoritative email linked to superadmin privileges.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="tel"
                    placeholder="+91 92665 00223"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 p-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#D4A017] focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] font-bold text-xs py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <FaSave className="text-[#D4A017]" />
                  <span>{savingProfile ? "Saving Profile..." : "Save Profile Changes 💾"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CARD 2: PASSWORD UPDATE */}
        {/* ============================================================ */}
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-[#0B1220] text-white py-3.5 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
              <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
                <FaLock className="text-[#D4A017]" />
                <span>Security & Password Update</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">
                Bcrypt 256-Bit
              </span>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    placeholder="Enter current password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-10 p-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#D4A017] focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    {showCurrentPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    placeholder="Enter new password (min 6 characters)"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pr-10 p-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#D4A017] focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    {showNewPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#D4A017] focus:outline-none transition"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="w-full bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] font-bold text-xs py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <FaKey className="text-[#D4A017]" />
                  <span>{updatingPassword ? "Updating Password..." : "Update Password 🔐"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CARD 3: SESSION LOGOUT & SECURITY ACTIONS */}
      {/* ============================================================ */}
      <div className="mt-8 bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-[#0B1220] text-white py-3.5 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
          <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
            <FaShieldAlt className="text-[#D4A017]" />
            <span>Active Session & Portal Termination</span>
          </h3>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            Active Session
          </span>
        </div>

        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-[#0B1220] text-sm">
              Logged in as: {profile.email}
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
              Terminating your administrative session will revoke authentication tokens from this browser and require password verification upon re-entry.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 px-6 rounded-lg transition flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Log Out of Admin Console 🚪</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
