import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-header">
        <h2 className="logo">Admin Panel</h2>
      </div>

      {/* MENU */}
      <ul className="menu">
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/banners">Banners</NavLink>
        </li>

        <li>
          <NavLink to="/testimonials">Testimonials</NavLink>
        </li>

        <li>
          <NavLink to="/course">Courses</NavLink>
        </li>

        <li>
          <NavLink to="/category">Category</NavLink>
        </li>

        <li>
          <NavLink to="/articles">Articles</NavLink>
        </li>

        <li>
          <NavLink to="/module">Modules</NavLink>
        </li>

        <li>
          <NavLink to="/topics">Topics</NavLink>
        </li>
      </ul>
    </aside>
  );
}
