// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDocumentApproval = () => {
//   const [documents, setDocuments] = useState([]);
//   const token = localStorage.getItem("token");

//   const loadDocuments = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/documents/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDocuments(res.data);
//     } catch (err) {
//       console.error("Error loading documents", err);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/documents/${id}/status`, { status }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       loadDocuments();
//     } catch (err) {
//       alert("Failed to update status");
//     }
//   };

//   useEffect(() => {
//     loadDocuments();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Document Approvals</h2>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Title</th><th>Description</th><th>Employee</th><th>File</th><th>Status</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documents.map(doc => (
//             <tr key={doc.id}>
//               <td>{doc.title}</td>
//               <td>{doc.description}</td>
//               <td>{doc.User?.name || "Unknown"}</td>
//               <td><a href={`http://localhost:5000${doc.fileUrl}`} target="_blank" rel="noreferrer">View</a></td>
//               <td>{doc.status}</td>
//               <td>
//                 <button onClick={() => updateStatus(doc.id, "Approved")}>Approve</button>
//                 <button onClick={() => updateStatus(doc.id, "Rejected")}>Reject</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDocumentApproval;


import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDocumentApproval = () => {
  const [documents, setDocuments] = useState([]);
  const token = localStorage.getItem("token");

  const loadDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/documents/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch (err) {
      console.error("Error loading documents", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/documents/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadDocuments();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    loadDocuments();

    // Inject global styles for table formatting
    const globalCSS = `
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
        background-color: #fafafa;
      }
    `;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = globalCSS;
    document.head.appendChild(styleTag);
  }, []);

  const getStatusColor = (status) => {
    if (status === "Approved") return "#2e7d32";
    if (status === "Rejected") return "#c62828";
    return "#f9a825";
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
        <h2 style={styles.title}>Document Approvals</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Employee</th>
              <th>File</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.title}</td>
                <td>{doc.description}</td>
                <td>{doc.User?.name || "Unknown"}</td>
                <td>
                  <a
                    href={`http://localhost:5000${doc.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#2980b9", textDecoration: "underline" }}
                  >
                    View
                  </a>
                </td>
                <td style={{ color: getStatusColor(doc.status), fontWeight: "bold" }}>
                  {doc.status}
                </td>
                <td>
                  <button
                    onClick={() => updateStatus(doc.id, "Approved")}
                    style={{ ...styles.button, backgroundColor: "#2ecc71" }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(doc.id, "Rejected")}
                    style={{ ...styles.button, backgroundColor: "#e74c3c", marginLeft: 8 }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: "16px", textAlign: "center" }}>
                  No documents available.
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
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    padding: "30px",
    background: "linear-gradient(to right, #fce4ec, #e3f2fd)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    maxWidth: "1100px",
    borderCollapse: "collapse",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default AdminDocumentApproval;
