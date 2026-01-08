// import { useEffect, useState } from "react";
// import "../styles/dashboard.css";

// const API = "https://codingcloud.pythonanywhere.com";

// export default function Dashboard() {

//   const [stats, setStats] = useState({
//     faqs: 0,
//     testimonials: 0,
//     categories: 0,
//     courses: 0,
//     articles: 0,
//     modules: 0,
//     topics: 0
//   });

// const fetchCount = async (url) => {
//   const res = await fetch(url);
//   const data = await res.json();

//   // CASE 1: API returns array directly
//   if (Array.isArray(data)) {
//     return data.length;
//   }

//   // CASE 2: { data: [] }
//   if (Array.isArray(data?.data)) {
//     return data.data.length;
//   }

//   // CASE 3: { results: [] } (pagination)
//   if (Array.isArray(data?.results)) {
//     return data.results.length;
//   }

//   return 0;
// };


//   useEffect(() => {
//     const loadStats = async () => {
//       const [
//         faqs,
//         testimonials,
//         categories,
//         courses,
//         articles,
//         modules,
//         topics
//       ] = await Promise.all([
//         fetchCount(`${API}/faqs/`),
//         fetchCount(`${API}/testimonials/`),
//         fetchCount(`${API}/category/`),
//         fetchCount(`${API}/course/`),
//         fetchCount(`${API}/articles/`),
//         fetchCount(`${API}/modules/`),
//         fetchCount(`${API}/topics/`)
//       ]);

//       setStats({
//         faqs,
//         testimonials,
//         categories,
//         courses,
//         articles,
//         modules,
//         topics
//       });
//     };

//     loadStats();
//   }, []);

//   return (
//     <div className="page-wrapper dashboard">

//       <div className="welcome-banner">
//         <div>
//           <h3>Welcome back 👋</h3>
//           <p>Here’s what’s happening in your platform</p>
//         </div>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card blue">
//           <h4>{stats.courses}</h4>
//           <p>Courses</p>
//         </div>

//         <div className="stat-card purple">
//           <h4>{stats.categories}</h4>
//           <p>Categories</p>
//         </div>

//         <div className="stat-card green">
//           <h4>{stats.articles}</h4>
//           <p>Articles</p>
//         </div>

//         <div className="stat-card orange">
//           <h4>{stats.modules}</h4>
//           <p>Modules</p>
//         </div>

//         <div className="stat-card cyan">
//           <h4>{stats.topics}</h4>
//           <p>Topics</p>
//         </div>

//         <div className="stat-card pink">
//           <h4>{stats.testimonials}</h4>
//           <p>Testimonials</p>
//         </div>

//         <div className="stat-card dark">
//           <h4>{stats.faqs}</h4>
//           <p>FAQs</p>
//         </div>
//       </div>

//       <footer className="dashboard-footer">
//         © {new Date().getFullYear()} CodingCloud Admin Panel
//       </footer>

//     </div>
//   );
// }import { useEffect, useState } from "react";



// import "../styles/dashboard.css";
// import { useNavigate } from "react-router-dom";
// import { useEffect,useState } from "react";

// const API = "https://codingcloud.pythonanywhere.com";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     categories: 0,
//     courses: 0,
//     modules: 0,
//     topics: 0,
//     articles: 0,
//     testimonials: 0
//   });

//   const fetchCount = async (url) => {
//     const res = await fetch(url);
//     const data = await res.json();
//     return Array.isArray(data) ? data.length : data?.data?.length || 0;
//   };

//   useEffect(() => {
//     const loadStats = async () => {
//       const [
//         categories,
//         courses,
//         modules,
//         topics,
//         articles,
//         testimonials
//       ] = await Promise.all([
//         fetchCount(`${API}/category/`),
//         fetchCount(`${API}/course/`),
//         fetchCount(`${API}/modules/`),
//         fetchCount(`${API}/topics/`),
//         fetchCount(`${API}/articles/`),
//         fetchCount(`${API}/testimonials/`)
//       ]);

//       setStats({
//         categories,
//         courses,
//         modules,
//         topics,
//         articles,
//         testimonials
//       });
//     };

//     loadStats();
//   }, []);

//   return (
//     <div className="page-wrapper dashboard">
//       <h2 className="dashboard-title">Dashboard</h2>

//       <div className="dashboard-grid">

//         <StatCard
//           title="Categories"
//           value={stats.categories}
//           color="purple"
//           icon="📁"
//           to="/category"
//           navigate={navigate}
//         />

//         <StatCard
//           title="Courses"
//           value={stats.courses}
//           color="green"
//           icon="📘"
//           to="/course"
//           navigate={navigate}
//         />

//         <StatCard
//           title="Modules"
//           value={stats.modules}
//           color="orange"
//           icon="📦"
//           to="/module"
//           navigate={navigate}
//         />

//         <StatCard
//           title="Topics"
//           value={stats.topics}
//           color="blue"
//           icon="📚"
//           to="/topics"
//           navigate={navigate}
//         />

//         <StatCard
//           title="Articles"
//           value={stats.articles}
//           color="red"
//           icon="📄"
//           to="/articles"
//           navigate={navigate}
//         />

//         <StatCard
//           title="Testimonials"
//           value={stats.testimonials}
//           color="violet"
//           icon="💬"
//           to="/testimonials"
//           navigate={navigate}
//         />

//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, color, icon, to, navigate }) {
//   return (
//     <div
//       className="dashboard-card"
//       style={{ cursor: "pointer" }}
//       onClick={() => navigate(to)}
//     >
//       <div>
//         <p className="card-label">{title}</p>
//         <h3 className="card-value">{value}</h3>
//       </div>

//       <div className={`card-icon ${color}`}>
//         {icon}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const API = "https://codingcloud.pythonanywhere.com";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    banners: 0,
    categories: 0,
    courses: 0,
    modules: 0,
    topics: 0,
    articles: 0,
    testimonials: 0
  });

  const fetchCount = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return Array.isArray(data) ? data.length : data?.data?.length || 0;
  };

  useEffect(() => {
    const loadStats = async () => {
      const [
        banners,
        categories,
        courses,
        modules,
        topics,
        articles,
        testimonials
      ] = await Promise.all([
        fetchCount(`${API}/banners/`),
        fetchCount(`${API}/category/`),
        fetchCount(`${API}/course/`),
        fetchCount(`${API}/modules/`),
        fetchCount(`${API}/topics/`),
        fetchCount(`${API}/articles/`),
        fetchCount(`${API}/testimonials/`)
      ]);

      setStats({
        banners,
        categories,
        courses,
        modules,
        topics,
        articles,
        testimonials
      });
    };

    loadStats();
  }, []);

  return (
    <div className="page-wrapper dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-grid">

        <StatCard
          title="Banners"
          value={stats.banners}
          color="cyan"
          icon="🖼️"
          to="/banners"
          navigate={navigate}
        />

        <StatCard
          title="Categories"
          value={stats.categories}
          color="purple"
          icon="📁"
          to="/category"
          navigate={navigate}
        />

        <StatCard
          title="Courses"
          value={stats.courses}
          color="green"
          icon="📘"
          to="/course"
          navigate={navigate}
        />

        <StatCard
          title="Modules"
          value={stats.modules}
          color="orange"
          icon="📦"
          to="/module"
          navigate={navigate}
        />

        <StatCard
          title="Topics"
          value={stats.topics}
          color="blue"
          icon="📚"
          to="/topics"
          navigate={navigate}
        />

        <StatCard
          title="Articles"
          value={stats.articles}
          color="red"
          icon="📄"
          to="/articles"
          navigate={navigate}
        />

        <StatCard
          title="Testimonials"
          value={stats.testimonials}
          color="violet"
          icon="💬"
          to="/testimonials"
          navigate={navigate}
        />

      </div>
    </div>
  );
}

function StatCard({ title, value, color, icon, to, navigate }) {
  return (
    <div
      className="dashboard-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(to)}
    >
      <div>
        <p className="card-label">{title}</p>
        <h3 className="card-value">{value}</h3>
      </div>

      <div className={`card-icon ${color}`}>
        {icon}
      </div>
    </div>
  );
}
