import { useEffect, useState } from "react";
import api from "../lib/api";
import BatchCard from "./batches/BatchCard";

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/api/courses")
      .then((response) => {
        if (!active) return;
        const rows = response.data?.courses || response.data || [];
        setCourses(Array.isArray(rows) ? rows : []);
      })
      .catch(() => {
        if (active) setError("Courses could not be loaded right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 px-6 py-20">
      <h1 className="mb-12 text-center text-4xl font-bold">Popular Courses</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : error ? (
        <p role="alert" className="text-center text-red-600">{error}</p>
      ) : courses.length ? (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => <BatchCard key={course.id || course.course_id} course={course} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500">No published courses are available yet.</p>
      )}
    </section>
  );
}
