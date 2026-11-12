import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaUserGraduate,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaBookOpen,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

function AddStudent() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    student_id: `DIZ-STU-${Math.floor(1000 + Math.random() * 9000)}`,
    password: "",
    name: "",
    email: "",
    phone: "",
    course_id: "",
    course: "",
    batch: "Online Live Interactive",
    teacher_id: "",
    teacher: "",
    status: "Active",
  });

  useEffect(() => {
    // Fetch courses
    api
      .get("/api/courses")
      .then((res) => {
        const list = res.data?.courses || (Array.isArray(res.data) ? res.data : []);
        setCourses(list);
      })
      .catch((err) => console.error("Error fetching courses:", err));

    // Fetch teachers
    api
      .get("/api/teachers")
      .then((res) => {
        const list = res.data?.teachers || (Array.isArray(res.data) ? res.data : []);
        setTeachers(list);
      })
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "course_id") {
        const selected = courses.find((c) => String(c.id) === String(value) || c.course_id === value);
        if (selected) {
          updated.course = selected.title;
        }
      }
      if (name === "teacher_id") {
        const selected = teachers.find((t) => String(t.id) === String(value));
        if (selected) {
          updated.teacher = selected.name;
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setNotification({ type: "error", message: "Name, email, and password are required." });
      return;
    }

    if (!formData.course_id) {
      setNotification({ type: "error", message: "Please select a course to enroll the student." });
      return;
    }

    try {
      setLoading(true);
      setNotification(null);

      const payload = {
        student_id: formData.student_id,
        password: formData.password,
        name: formData.name,
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone,
        course_id: formData.course_id,
        course: formData.course,
        batch: formData.batch,
        teacher_id: formData.teacher_id || null,
        teacher: formData.teacher || null,
        status: formData.status,
      };

      const res = await api.post("/api/students", payload);

      setNotification({
        type: "success",
        message: "Student credentials created and course enrolled successfully! ✅",
      });

      setTimeout(() => {
        navigate("/admin/students");
      }, 1200);
    } catch (error) {
      console.error("Add student error:", error);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Failed to create student account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      title="Create Student Credentials & Enroll 👨‍🎓"
      subtitle="Issue student credentials, assign them to their course, and grant immediate student portal access."
    >
      <div className="max-w-4xl mx-auto py-6">
        <button
          onClick={() => navigate("/admin/students")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Student Roster</span>
        </button>

        {notification && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border shadow-sm ${
              notification.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <FaCheckCircle />
            <span className="font-semibold text-sm">{notification.message}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8"
        >
          {/* Section: Basic Identity */}
          <div>
            <h3 className="text-lg font-black text-[#0B1220] mb-4 flex items-center gap-2">
              <FaUserGraduate className="text-[#7C2D12]" />
              <span>Student Account Credentials</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Student Roll / ID
                </label>
                <input
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  required
                  placeholder="e.g. DIZ-STU-1024"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Portal Login Password *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter student login password"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address (Login Username) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 9266500223"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Account Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                >
                  <option value="Active">Active (Full Portal & Video Access)</option>
                  <option value="Inactive">Inactive / Suspended</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section: Course Allotment */}
          <div>
            <h3 className="text-lg font-black text-[#0B1220] mb-4 flex items-center gap-2">
              <FaBookOpen className="text-[#7C2D12]" />
              <span>Course Allotment & Batch Details</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Enrolled Course *
                </label>
                <select
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                >
                  <option value="">-- Choose Course from Database --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration || "Self-Paced"})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  The student will immediately see this course and all associated lectures in their student portal.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Training Mode / Batch
                </label>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                >
                  <option value="Online Live Interactive">Online Live Interactive Batch</option>
                  <option value="Offline Classroom Training">Offline Classroom Batch (Delhi Campus)</option>
                  <option value="Weekend Special Batch">Weekend Professional Batch</option>
                  <option value="Self-Paced Recorded">Self-Paced Recorded Track</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Assigned Mentor / Teacher (Optional)
                </label>
                <select
                  name="teacher_id"
                  value={formData.teacher_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7C2D12]"
                >
                  <option value="">-- Assign Senior Faculty --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.specialization || "Faculty"})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              className="px-6 py-3.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-[#0B1220] hover:bg-slate-900 text-[#D4A017] font-black transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Creating Credentials..." : "Create Credentials & Enroll Student"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddStudent;
