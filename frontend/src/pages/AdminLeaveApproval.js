// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminLeaveApproval = () => {
//   const [leaves, setLeaves] = useState([]);
//   const token = localStorage.getItem("token");

// const fetchLeaves = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/api/leaves/all", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setLeaves(res.data);
//   } catch (err) {
//     console.error("Failed to fetch all leaves", err);
//   }
// };

//   const updateStatus = async (id, status) => {
//     await axios.put(`http://localhost:5000/api/leaves/${id}/status`, { status }, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     fetchLeaves();
//   };

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Leave Approval</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr><th>Employee</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Actions</th></tr>
//         </thead>
//         <tbody>
//           {leaves.map(leave => (
//             <tr key={leave.id}>
//             <td>{leave.User?.name || "Unknown"}</td>
//               <td>{leave.fromDate}</td>
//               <td>{leave.toDate}</td>
//               <td>{leave.reason}</td>
//               <td>{leave.status}</td>
//               <td>
//                 <button onClick={() => updateStatus(leave.id, "Approved")}>Approve</button>
//                 <button onClick={() => updateStatus(leave.id, "Rejected")}>Reject</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminLeaveApproval;



import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error("Failed to fetch all leaves", err);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/leaves/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchLeaves();
  };

  useEffect(() => {
    fetchLeaves();

    // Inject global styles for table formatting
    const globalTableStyle = `
      table, th, td {
        border: 1px solid #ccc;
      }
      th, td {
        padding: 12px;
      }
      thead {
        background-color: #f1f1f1;
      }
      tbody tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalTableStyle;
    document.head.appendChild(styleSheet);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return { color: "#2e7d32", fontWeight: "bold" };
      case "Rejected":
        return { color: "#c62828", fontWeight: "bold" };
      default:
        return { color: "#f57c00", fontWeight: "bold" };
    }
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-y: auto;
        }
      `}</style>

      <div style={styles.container}>
        <h2 style={styles.title}>Leave Approval Panel</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.User?.name || "Unknown"}</td>
                <td>{leave.fromDate}</td>
                <td>{leave.toDate}</td>
                <td>{leave.reason}</td>
                <td style={getStatusStyle(leave.status)}>{leave.status}</td>
                <td>
                  <button
                    style={{ ...styles.button, backgroundColor: "#4CAF50" }}
                    onClick={() => updateStatus(leave.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: "#f44336", marginLeft: 10 }}
                    onClick={() => updateStatus(leave.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {leaves.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                  No leave requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    overflowY: "auto",
    fontFamily: "Segoe UI, sans-serif",
  },
  container: {
    padding: "30px",
    background: "linear-gradient(to right, #e3f2fd, #e8f5e9)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    maxWidth: "1000px",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    textAlign: "center",
  },
  button: {
    padding: "8px 12px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default AdminLeaveApproval;
