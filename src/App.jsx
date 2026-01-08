import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";

import Dashboard from "./pages/Dashboard";
import Banners from "./pages/Banners";
import Testimonials from "./pages/Testimonials";
import Courses from "./pages/Courses";
import "./styles/Layout.css";
import "./styles/sidebar.css";
import "./styles/dashboard.css";
import "./styles/table.css";
import "./styles/theme.css";
import Category from "./pages/Category";
import Articles from "./pages/Articles";
import Modules from "./pages/Modules";
import Topics from "./pages/Topics";



export default function App() {
  return (
    <Routes>

      {/* All pages inside Layout */}
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/category" element={<Category />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/module" element={<Modules />} />

        <Route path="/topics" element={<Topics />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

    </Routes>
  );
}













// import { Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./pages/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Banners from "./pages/Banners";
// import Testimonials from "./pages/Testimonials";
// import Courses from "./pages/Courses";

// export default function App() {
//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <div style={{ marginLeft: "240px", padding: "20px", width: "100%" }}>
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/banners" element={<Banners />} />
//           <Route path="/testimonials" element={<Testimonials />} />
//                     <Route path="/course" element={<Courses />} />


//           {/* Redirect / to dashboard */}
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }
