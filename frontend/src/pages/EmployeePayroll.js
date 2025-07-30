
import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeePayroll = () => {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/payrolls/employee", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecords(res.data);
      } catch (err) {
        console.error("Failed to load salary records", err);
        alert("Error loading salary data");
      }
    };
    fetchPayroll();
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Fixed Header */}
      <div style={styles.headerFixed}>
        <h2 style={styles.header}>Salary Records</h2>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {records.length === 0 ? (
          <p style={styles.noData}>No salary records available</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td style={styles.td}>{r.datePaid}</td>
                    <td style={styles.td}>₹{r.amount}</td>
                    <td style={styles.td}>{r.remarks}</td>
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

export default EmployeePayroll;

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
  noData: {
    textAlign: "center",
    fontSize: "16px",
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

