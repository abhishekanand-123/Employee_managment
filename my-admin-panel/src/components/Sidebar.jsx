import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">

        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="typcn typcn-device-desktop menu-icon"></i>
            <span className="menu-title">Dashboard</span>
            <div className="badge badge-danger">new</div>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <i className="typcn typcn-document-text menu-icon"></i>
            <span className="menu-title">UI Elements</span>
            <i className="menu-arrow"></i>
          </a>

          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/ui-features/buttons">
                  Buttons
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ui-features/dropdowns">
                  Dropdowns
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ui-features/typography">
                  Typography
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#employee-menu"
            aria-expanded="false"
            aria-controls="employee-menu"
          >
            <i className="typcn typcn-user-add-outline menu-icon"></i>
            <span className="menu-title">Employee</span>
            <i className="menu-arrow"></i>
          </a>

          <div className="collapse" id="employee-menu">
            <ul className="nav flex-column sub-menu">

              <li className="nav-item">
                <Link className="nav-link" to="/add-employee">
                  Add Employee
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/employee-list">
                  Employee List
                </Link>
              </li>

            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#form-elements"
            aria-expanded="false"
            aria-controls="form-elements"
          >
            <i className="typcn typcn-film menu-icon"></i>
            <span className="menu-title">Form Elements</span>
            <i className="menu-arrow"></i>
          </a>

          <div className="collapse" id="form-elements">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/basic-elements">
                  Basic Elements
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#charts"
            aria-expanded="false"
            aria-controls="charts"
          >
            <i className="typcn typcn-chart-pie-outline menu-icon"></i>
            <span className="menu-title">Charts</span>
            <i className="menu-arrow"></i>
          </a>

          <div className="collapse" id="charts">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/chartjs">
                  ChartJs
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#tables"
            aria-expanded="false"
            aria-controls="tables"
          >
            <i className="typcn typcn-th-small-outline menu-icon"></i>
            <span className="menu-title">Tables</span>
            <i className="menu-arrow"></i>
          </a>

          <div className="collapse" id="tables">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/tables/basic-table">
                  Basic Table
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#icons"
            aria-expanded="false"
            aria-controls="icons"
          >
            <i className="typcn typcn-compass menu-icon"></i>
            <span className="menu-title">Icons</span>
            <i className="menu-arrow"></i>
          </a>

          <div className="collapse" id="icons">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="#">Font Awesome</a>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#auth"
            aria-expanded="false"
            aria-controls="auth"
          >
            <i className="typcn typcn-user-add-outline menu-icon"></i>
            <span className="menu-title">User Pages</span>
            <i className="menu-arrow"></i>
          </a>

          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="#">Blank Page</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">404</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">500</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="typcn typcn-mortar-board menu-icon"></i>
            <span className="menu-title">Documentation</span>
          </a>
        </li>

      </ul>
    </nav>
  );
}
