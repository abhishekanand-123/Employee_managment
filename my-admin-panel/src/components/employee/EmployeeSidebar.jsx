import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function EmployeeSidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/employee/dashboard", icon: "mdi-view-dashboard", label: "Dashboard" },
    { path: "/employee/leave/add", icon: "mdi-plus-circle", label: "Add Leave" },
    { path: "/employee/leave/requests", icon: "mdi-format-list-bulleted", label: "My Leave Requests" },
    { path: "/employee/leave/calendar", icon: "mdi-calendar", label: "Calendar" },
  ];

  return (
    <nav className="sidebar sidebar-offcanvas employee-sidebar" id="employee-sidebar">
      <ul className="nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li className="nav-item" key={item.path}>
              <Link
                className={`nav-link ${isActive ? "active" : ""}`}
                to={item.path}
              >
                <i className={`mdi ${item.icon} menu-icon`}></i>
                <span className="menu-title">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
