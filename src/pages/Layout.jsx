import Sidebar from "../pages/Sidebar";
import { Outlet } from "react-router-dom";
import '../styles/layouts.css'
export default function Layout() {
  return (
    <div className="layout-wrapper">
      <Sidebar />

      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
