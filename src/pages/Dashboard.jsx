import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="page-wrapper">

      {/* Hero */}
      <div className="welcome-banner">
        <div>
          <h4>
            Welcome back, <span>John</span> 👋
          </h4>
          <p>Your performance summary for today</p>
        </div>

        <button className="primary-btn">View Report</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <i className="bx bx-trending-up icon"></i>
          <h5>Sales Today</h5>
          <h2>₹ 12,450</h2>
          <span className="badge success">+72%</span>
        </div>

        <div className="stat-card">
          <i className="bx bx-user icon"></i>
          <h5>New Users</h5>
          <h2>48</h2>
          <span className="badge info">+18%</span>
        </div>

        <div className="stat-card">
          <i className="bx bx-cart icon"></i>
          <h5>Orders</h5>
          <h2>112</h2>
          <span className="badge warning">+9%</span>
        </div>

        <div className="stat-card">
          <i className="bx bx-time-five icon"></i>
          <h5>Pending Tasks</h5>
          <h2>07</h2>
          <span className="badge danger">-3%</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Sneat Admin Panel
      </footer>

    </div>
  );
}




// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <div className="layout-wrapper layout-content-navbar">
//       <div className="layout-container">

//         {/* Sidebar */}
//         <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">

//           <div className="app-brand demo">
//             <Link to="/dashboard" className="app-brand-link">
//               <span className="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
//             </Link>
//           </div>

//           <div className="menu-inner-shadow"></div>

//           <ul className="menu-inner py-1">

//             <li className="menu-item active">
//               <Link to="/dashboard" className="menu-link">
//                 <i className="menu-icon tf-icons bx bx-home-circle"></i>
//                 <div>Dashboard</div>
//               </Link>
//             </li>

//             <li className="menu-item">
//               <Link to="/bed" className="menu-link">
//                 <i className="menu-icon tf-icons bx bx-bed"></i>
//                 <div>Bed</div>
//               </Link>
//             </li>

//           </ul>
//         </aside>
//         {/* /Sidebar */}

//         {/* Page */}
//         <div className="layout-page">

//           {/* Navbar */}
//           <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached bg-navbar-theme">

//             <div className="navbar-nav-right d-flex align-items-center">

//               <div className="nav-item d-flex align-items-center">
//                 <i className="bx bx-search fs-4 lh-0"></i>
//                 <input
//                   type="text"
//                   className="form-control border-0 shadow-none"
//                   placeholder="Search..."
//                 />
//               </div>

//               <ul className="navbar-nav flex-row align-items-center ms-auto">
//                 <li className="nav-item">
//                   <img
//                     src="/assets/img/avatars/1.png"
//                     alt="user"
//                     className="w-px-40 h-auto rounded-circle"
//                   />
//                 </li>
//               </ul>

//             </div>
//           </nav>
//           {/* /Navbar */}

//           {/* Content */}
//           <div className="content-wrapper">
//             <div className="container-xxl flex-grow-1 container-p-y">

//               <div className="row">
//                 <div className="col-lg-8 mb-4 order-0">
//                   <div className="card">
//                     <div className="card-body">
//                       <h5 className="card-title text-primary">Congratulations John! 🎉</h5>
//                       <p>You have done 72% more sales today.</p>
//                       <Link className="btn btn-sm btn-outline-primary">View Badges</Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>

//             <footer className="content-footer footer bg-footer-theme">
//               <div className="container-xxl py-2">
//                 © {new Date().getFullYear()} Sneat Admin Panel
//               </div>
//             </footer>
//           </div>
//           {/* /Content */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
