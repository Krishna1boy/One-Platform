
import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  const loadAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/doctor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      alert("Could not load appointments");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadAppointments();
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadAppointments();

    // Inject global table styles once when component mounts
    const styleTag = document.createElement("style");
    styleTag.textContent = globalCSS;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag); // Clean up on unmount
    };
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}> My Appointments</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patientName}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{a.reason}</td>
                  <td>{a.status}</td>
                  <td>
                    <button onClick={() => updateStatus(a.id, "Completed")}>✔</button>
                    <button onClick={() => updateStatus(a.id, "Cancelled")}>✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentPage;

// ---------------------
// Inline Style Objects
// ---------------------
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f7fa, #b2dfdb)",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    justifyContent: "center",
    paddingTop: "15vh",
    paddingBottom: "40px",
    boxSizing: "border-box",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "30px",
    width: "90%",
    maxWidth: "1000px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#00695c",
    marginBottom: "25px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
};

// ---------------------
// Global CSS for table
// ---------------------
const globalCSS = `
  table, th, td {
    border: 1px solid #ddd;
  }

  th {
    background-color: #b2dfdb;
    color: #004d40;
    padding: 12px;
    font-size: 14px;
  }

  td {
    padding: 12px;
    font-size: 14px;
    color: #333;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #e0f2f1;
  }

  button {
    margin: 0 4px;
    padding: 6px 10px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
  }

  button:first-of-type {
    background-color: #2e7d32; /* green */
  }

  button:last-of-type {
    background-color: #c62828; /* red */
  }

  button:hover {
    opacity: 0.85;
  }
`;


