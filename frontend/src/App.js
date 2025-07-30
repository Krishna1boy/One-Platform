import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import FinancePage from "./pages/FinancePage";
import DoctorAppointmentPage from "./pages/DoctorAppointmentPage";
import BookAppointment from "./pages/BookAppointment";
import LeaveManagement from "./pages/LeaveManagement";
import EmployeePayroll from "./pages/EmployeePayroll";
import AdminPayroll from "./pages/AdminPayroll";
import AdminLeaveApproval from "./pages/AdminLeaveApproval";
import EmployeeDocumentUpload from "./pages/EmployeeDocumentUpload";
import AdminDocumentApproval from "./pages/AdminDocumentApproval";
import InventoryPage from "./pages/InventoryPage";
import CRMPage from "./pages/CRMPage";
import AdminAppointmentPage from "./pages/AdminAppointmentPage"; // adjust path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={["Teacher"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        } />

        <Route path="/finance" element={
          <ProtectedRoute allowedRoles={["Teacher"]}>
            <FinancePage />
          </ProtectedRoute>
        } />

        <Route path="/doctor" element={
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/employee" element={
          <ProtectedRoute allowedRoles={["Employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />

        <Route path="/appointments" element={
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorAppointmentPage />
          </ProtectedRoute>
        } />

        <Route path="/book-appointment" element={
          <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
            <BookAppointment />
          </ProtectedRoute>
        } />

        <Route path="/employee/leaves" element={
          <ProtectedRoute allowedRoles={["Employee"]}>
            <LeaveManagement />
          </ProtectedRoute>
        } />

        <Route path="/employee/payroll" element={
          <ProtectedRoute allowedRoles={["Employee"]}>
            <EmployeePayroll />
          </ProtectedRoute>
        } />

        <Route path="/employee/documents" element={
          <ProtectedRoute allowedRoles={["Employee"]}>
            <EmployeeDocumentUpload />
          </ProtectedRoute>
        } />

        <Route path="/admin/payroll" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminPayroll />
          </ProtectedRoute>
        } />

        <Route path="/admin/leave-approvals" element={
          <ProtectedRoute allowedRoles={["Admin", "HR"]}>
            <AdminLeaveApproval />
          </ProtectedRoute>
        } />

        <Route path="/admin/document-approvals" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDocumentApproval />
          </ProtectedRoute>
        } />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Employee"]}>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crm"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Employee", "Sales"]}>
              <CRMPage />
            </ProtectedRoute>
          }
        />
                <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminAppointmentPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
