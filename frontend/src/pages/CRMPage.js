// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CRMPage = () => {
//   const [clients, setClients] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", phone: "" });
//   const token = localStorage.getItem("token");

//   const loadClients = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/clients", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClients(res.data);
//     } catch (err) {
//       console.error("Failed to fetch clients", err);
//     }
//   };

//   const handleAddClient = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/clients",
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setForm({ name: "", email: "", phone: "" });
//       loadClients();
//     } catch (err) {
//       alert("Error adding client");
//     }
//   };

//   useEffect(() => {
//     loadClients();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Customer / Client Management</h2>

//       <div style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Client Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Phone"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//         />
//         <button onClick={handleAddClient}>Add Client</button>
//       </div>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr><th>Name</th><th>Email</th><th>Phone</th></tr>
//         </thead>
//         <tbody>
//           {clients.map((client) => (
//             <tr key={client.id}>
//               <td>{client.name}</td>
//               <td>{client.email}</td>
//               <td>{client.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CRMPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const CRMPage = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const token = localStorage.getItem("token");

  const loadClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };

  const handleAddClient = async () => {
    try {
      await axios.post("http://localhost:5000/api/clients", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", email: "", phone: "" });
      loadClients();
    } catch (err) {
      alert("Error adding client");
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Customer / Client Management</h2>

        <div style={styles.formContainer}>
          <input
            type="text"
            placeholder="Client Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={styles.input}
          />
          <button onClick={handleAddClient} style={styles.button}>
            Add Client
          </button>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    overflowY: "auto",
    padding: "30px 20px",
    background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "30px",
  },
  formContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "40px",
  },
  input: {
    padding: "10px 14px",
    width: "200px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
  },
};

// Inject global table styles
const globalCSS = `
  table, th, td {
    border: 1px solid #ddd;
  }

  th, td {
    padding: 12px;
    font-size: 14px;
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

// Inject full-page scroll CSS
const baseCSS = `
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: auto;
  }
`;

const baseStyleTag = document.createElement("style");
baseStyleTag.innerHTML = baseCSS;
document.head.appendChild(baseStyleTag);

export default CRMPage;


