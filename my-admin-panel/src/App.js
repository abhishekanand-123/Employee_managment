import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ChartJs from "./pages/charts/ChartJs";
import BasicElements from "./pages/forms/BasicElements";
import BasicTable from "./pages/tables/BasicTable";
import Register from "./pages/samples/Register";
import Login from "./pages/samples/Login";
import Buttons from "./pages/ui-features/Buttons";
import Dropdowns from "./pages/ui-features/Dropdowns";
import Typography from "./pages/ui-features/Typography";
import AddEmployee from "./pages/employees/AddEmployee";
import EmployeeList from "./pages/employees/EmployeeList";
import EditEmployee from "./pages/employees/EditEmployee";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import Attendance from "./pages/attendance/Attendance";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes (without admin layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Employee Routes (without admin layout) */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        {/* Admin Routes (with admin layout) */}
        <Route path="/*" element={
      <div className="container-scroller">

        {/* Top Navbar */}
        <Navbar />

        <div className="container-fluid page-body-wrapper">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Panel */}
          <div className="main-panel">
            <div className="content-wrapper">

              {/* ALL ROUTES MUST BE IN ONE <Routes> */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chartjs" element={<ChartJs />} />
                <Route path="/basic-elements" element={<BasicElements />} />
                <Route path="/tables/basic-table" element={<BasicTable />} />
                <Route path="/ui-features/buttons" element={<Buttons />} />
                <Route path="/ui-features/dropdowns" element={<Dropdowns />} />
                <Route path="/ui-features/typography" element={<Typography />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path="/edit-employee/:id" element={<EditEmployee />} />
                <Route path="/attendance" element={<Attendance />} />

              </Routes>


            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
