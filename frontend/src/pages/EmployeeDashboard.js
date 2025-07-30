// import React from "react";
// import { Link } from "react-router-dom";

// const EmployeeDashboard = () => {
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Employee Dashboard</h2>
//       <button onClick={handleLogout}>Logout</button>

//       <h3>Welcome, Employee!</h3>

//       <ul style={{ lineHeight: "2em" }}>
//         <li><Link to="/employee/leaves">📆 Leave Management</Link></li>
//         <li><Link to="/employee/payroll">💰 Payroll & Salary</Link></li>
//         <li><Link to="/employee/documents">📂 Document Management</Link></li>
//         <li><Link to="/employee/projects">📋 Project & Task Tracker</Link></li>
//         <li><Link to="/inventory">📦 Inventory & Asset Log</Link></li>
//         <li><Link to="/crm">🧩 CRM / Client Info</Link></li>        
//       </ul>
//     </div>
//   );
// };

// export default EmployeeDashboard;
// EmployeeDashboard.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EmployeeDashboard = () => {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : {};
  const employeeName = decoded.name || "Employee";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Sticky Header */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}> Employee Dashboard</h1>
        <div style={styles.headerRight}>
          <span style={styles.clock}>{time}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <h2 style={styles.welcomeText}>Welcome, {employeeName} 👋</h2>
        <p style={styles.welcomeSubText}>Use the cards below to navigate your workspace efficiently.</p>
      </div>

      {/* Grid Cards Section */}
      <div style={styles.grid}>
        <Link to="/employee/leaves" style={styles.card}>
          <div style={styles.cardIcon}>📆</div>
          <h3 style={styles.cardTitle}>Leave Management</h3>
          <p style={styles.cardDesc}>Apply & manage leaves</p>
        </Link>

        <Link to="/employee/payroll" style={styles.card}>
          <div style={styles.cardIcon}>💰</div>
          <h3 style={styles.cardTitle}>Payroll</h3>
          <p style={styles.cardDesc}>View salary & payslips</p>
        </Link>

        <Link to="/employee/documents" style={styles.card}>
          <div style={styles.cardIcon}>📂</div>
          <h3 style={styles.cardTitle}>Documents</h3>
          <p style={styles.cardDesc}>View/download documents</p>
        </Link>

        {/* <Link to="/employee/projects" style={styles.card}>
          <div style={styles.cardIcon}>📋</div>
          <h3 style={styles.cardTitle}>Projects</h3>
          <p style={styles.cardDesc}>Track tasks and deadlines</p>
        </Link> */}

        <Link to="/inventory" style={styles.card}>
          <div style={styles.cardIcon}>📦</div>
          <h3 style={styles.cardTitle}>Inventory</h3>
          <p style={styles.cardDesc}>Asset tracking system</p>
        </Link>

        <Link to="/crm" style={styles.card}>
          <div style={styles.cardIcon}>🧩</div>
          <h3 style={styles.cardTitle}>CRM</h3>
          <p style={styles.cardDesc}>Manage client info</p>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

// ---------------------
// Styles
// ---------------------
const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(to right, #e3f2fd, #ffffff)",
    minHeight: "100vh",
    paddingBottom: "40px"
  },
  header: {
    position: "sticky",
    top: -10,
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    borderBottom: "1px solid #ddd",
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    flex: 1,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  clock: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1565c0",
  },
  logoutBtn: {
    backgroundColor: "#c62828",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
  },
  welcomeSection: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "20px",
  },
  welcomeText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  welcomeSubText: {
    fontSize: "14px",
    color: "#555",
    marginTop: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    padding: "0 40px",
    marginTop: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    textAlign: "center",
    textDecoration: "none",
    color: "#2c3e50",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease",
  },
  cardIcon: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  cardDesc: {
    fontSize: "14px",
    color: "#555",
  },
};

