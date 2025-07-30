
import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveManagement = () => {
  const [form, setForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });
  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  const loadLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaves(res.data);
    } catch (err) {
      alert("Failed to load leave history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leaves", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Leave applied successfully");
      setForm({ type: "", fromDate: "", toDate: "", reason: "" });
      loadLeaves();
    } catch (err) {
      alert("Leave application failed");
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Fixed Header */}
      <div style={styles.headerFixed}>
        <h2 style={styles.header}>Leave Management</h2>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Leave Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Leave Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              style={styles.input}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Paid Leave">Paid Leave</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>From Date</label>
            <input
              type="date"
              value={form.fromDate}
              onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>To Date</label>
            <input
              type="date"
              value={form.toDate}
              onChange={(e) => setForm({ ...form, toDate: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Reason</label>
            <input
              type="text"
              placeholder="Reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Apply Leave</button>
        </form>

        {/* Leave History */}
        <h3 style={styles.sectionTitle}>Leave History</h3>
        {leaves.length === 0 ? (
          <p style={styles.noData}>No leave records found</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>From</th>
                  <th style={styles.th}>To</th>
                  <th style={styles.th}>Reason</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td style={styles.td}>{leave.type}</td>
                    <td style={styles.td}>{leave.fromDate}</td>
                    <td style={styles.td}>{leave.toDate}</td>
                    <td style={styles.td}>{leave.reason}</td>
                    <td style={styles.td}>{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;

// ------------------------
// Inline Styles
// ------------------------
const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4f8, #e8f0fe)",
    paddingTop: "80px",
    paddingBottom: "40px",
  },
  headerFixed: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "18px 30px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    zIndex: 999,
  },
  header: {
    margin: 0,
    fontSize: "24px",
    color: "#2e3a59",
  },
  content: {
    maxWidth: "900px",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    gridColumn: "span 2",
    padding: "12px",
    fontSize: "14px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  noData: {
    fontSize: "14px",
    textAlign: "center",
    color: "#777",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#e3f2fd",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "14px",
    borderBottom: "1px solid #ccc",
  },
  td: {
    padding: "10px 12px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    color: "#333",
  },
};

