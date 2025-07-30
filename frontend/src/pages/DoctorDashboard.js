// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DoctorDashboard = () => {
//   const [patients, setPatients] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     age: "",
//     gender: "Male",
//     contact: "",
//     address: "",
//   });

//   const token = localStorage.getItem("token");

//   const loadPatients = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/patients", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPatients(res.data);
//     } catch (err) {
//       console.error("Failed to load patients", err);
//     }
//   };

//   useEffect(() => {
//     loadPatients();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/patients", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setForm({ name: "", age: "", gender: "Male", contact: "", address: "" });
//       loadPatients();
//     } catch (err) {
//       console.error("Failed to add patient", err);
//       alert("Error adding patient");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
//       <h2>Doctor Dashboard</h2>
//       <button onClick={() => { localStorage.clear(); window.location.href = "/" }}>Logout</button>
//       <button onClick={() => window.location.href = "/appointments"}>
//         View Appointments
//       </button>

//       <h3>Add Patient</h3>
//       <form onSubmit={handleAdd}>
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Age"
//           value={form.age}
//           onChange={(e) => setForm({ ...form, age: e.target.value })}
//           required
//         />
//         <select
//           value={form.gender}
//           onChange={(e) => setForm({ ...form, gender: e.target.value })}
//         >
//           <option>Male</option>
//           <option>Female</option>
//           <option>Other</option>
//         </select>
//         <input
//           placeholder="Contact"
//           value={form.contact}
//           onChange={(e) => setForm({ ...form, contact: e.target.value })}
//         />
//         <input
//           placeholder="Address"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//         />
//         <button type="submit">Add Patient</button>
//       </form>

//       <h3>Patient List</h3>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((p) => (
//             <tr key={p.id}>
//               <td>{p.name}</td>
//               <td>{p.age}</td>
//               <td>{p.gender}</td>
//               <td>{p.contact}</td>
//               <td>{p.address}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DoctorDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  const loadPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (err) {
      console.error("Failed to load patients", err);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/patients", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", age: "", gender: "Male", contact: "", address: "" });
      loadPatients();
    } catch (err) {
      console.error("Failed to add patient", err);
      alert("Error adding patient");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🩺 Doctor Dashboard</h1>
        <div>
          <button
            style={styles.headerBtn}
            onClick={() => (window.location.href = "/appointments")}
          >
            View Appointments
          </button>
          <button
            style={styles.headerBtn}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <section style={{ ...styles.card, ...styles.formCard }}>
          <h2 style={styles.sectionTitle}>Add New Patient</h2>
          <form onSubmit={handleAdd} style={styles.form}>
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
              style={styles.input}
            />
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              style={styles.input}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              placeholder="Contact Number"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              style={styles.input}
            />
            <button type="submit" style={styles.submitBtn}>
              Add Patient
            </button>
          </form>
        </section>

        <section style={{ ...styles.card, ...styles.tableCard }}>
          <h2 style={styles.sectionTitle}>Patient List</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.contact}</td>
                    <td>{p.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// Styles
const styles = {
  pageWrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #e0f7fa, #b2dfdb)",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  header: {
    position: "sticky",
    top: 0,
    width: "97%",
    backgroundColor: "#00695c",
    color: "#fff",
    padding: "14px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: 0,
    fontSize: "22px",
  },
  headerBtn: {
    marginLeft: "10px",
    padding: "8px 14px",
    backgroundColor: "#00796b",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "0.2s ease",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "25px 30px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    marginBottom: "35px",
  },
  formCard: {
    width: "480px",
    maxWidth: "95%",
    textAlign: "center",
  },
  tableCard: {
    width: "100%",
    maxWidth: "1000px",
  },
  sectionTitle: {
    marginBottom: "20px",
    fontSize: "20px",
    color: "#004d40",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
  },
  input: {
    padding: "10px 14px",
    fontSize: "14px",
    border: "1px solid #b0bec5",
    borderRadius: "6px",
    width: "100%",
    boxSizing: "border-box",
  },
  submitBtn: {
    padding: "10px 16px",
    backgroundColor: "#388e3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
    width: "50%",
    transition: "background 0.3s ease",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    backgroundColor: "#fff",
  },
};

// Global CSS
const globalCSS = `
  table, th, td {
    border: 1px solid #e0e0e0;
  }

  th, td {
    padding: 14px;
    font-size: 14px;
    color: #333;
  }

  thead {
    background-color: #b2dfdb;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #e0f2f1;
  }
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = globalCSS;
document.head.appendChild(styleTag);

export default DoctorDashboard;


