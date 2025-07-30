// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
//   const token = localStorage.getItem("token");

//   const loadUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users:", err.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/admin/users", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setForm({ name: "", email: "", password: "", role: "Employee" });
//       loadUsers(); // refresh list
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add user");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       loadUsers(); // refresh list
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
//       <h2>Admin Dashboard</h2>
//       <button onClick={() => { localStorage.clear(); window.location.href = "/" }}>Logout</button>
//       <button onClick={() => window.location.href = "/book-appointment"}>
//       Book New Appointment
//       </button>
//       <Link to="/admin/payroll">Manage Salaries</Link>
//       <Link to="/admin/leave-approvals">
//        <button>Review Leave Requests</button>
//       </Link>
//       <Link to="/admin/document-approvals">Document Approvals</Link>
//       <Link to="/inventory">Inventory</Link>
//       <Link to="/crm">CRM</Link>
//       <Link to="/admin/appointments">📅 Manage Appointments</Link>




//       <h3>Add New User</h3>
//       <form onSubmit={handleAddUser}>
//         <input name="name" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//         <input name="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
//         <input name="password" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
//         <select name="role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
//           <option>Admin</option>
//           <option>Teacher</option>
//           <option>Doctor</option>
//           <option>Employee</option>
//         </select>
//         <button type="submit">Add User</button>
//       </form>

//       <h3>All Users</h3>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(u => (
//             <tr key={u.id}>
//               <td>{u.name}</td>
//               <td>{u.email}</td>
//               <td>{u.role}</td>
//               <td><button onClick={() => handleDelete(u.id)}>Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
    
//   );
  
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err.response?.data?.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/users", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", email: "", password: "", role: "Employee" });
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Admin Dashboard</h2>
        <div style={styles.nav}>
          <Link to="/admin/payroll"><button style={btnStyle("#8e44ad")}>Salaries</button></Link>
          <Link to="/admin/leave-approvals"><button style={btnStyle("#2980b9")}>Leaves</button></Link>
          <Link to="/admin/document-approvals"><button style={btnStyle("#16a085")}>Docs</button></Link>
          <Link to="/inventory"><button style={btnStyle("#d35400")}>Inventory</button></Link>
          <Link to="/crm"><button style={btnStyle("#f39c12")}>CRM</button></Link>
          <Link to="/admin/appointments"><button style={btnStyle("#2ecc71")}>Appointments</button></Link>
          <button style={btnStyle("#e74c3c")} onClick={() => { localStorage.clear(); window.location.href = "/" }}>Logout</button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h3 style={styles.sectionTitle}>➕ Add New User</h3>
          <form onSubmit={handleAddUser} style={styles.form}>
            <input style={styles.input} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input style={styles.input} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <select style={styles.input} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option>Admin</option>
              <option>Teacher</option>
              <option>Doctor</option>
              <option>Employee</option>
            </select>
            <button style={btnStyle("#27ae60")} type="submit">Add User</button>
          </form>
        </div>

        <div style={styles.tableSection}>
          <h3 style={styles.sectionTitle}>📋 All Users</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead style={{ background: "#34495e", color: "#fff" }}>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="4" style={styles.td}>No users found.</td></tr>
                ) : (
                  users.map(u => (
                    <tr key={u.id}>
                      <td style={styles.td}>{u.name}</td>
                      <td style={styles.td}>{u.email}</td>
                      <td style={styles.td}>{u.role}</td>
                      <td style={styles.td}>
                        <button style={btnStyle("#c0392b")} onClick={() => handleDelete(u.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ====================
// 💅 CSS-IN-JS Styles
// ====================
const styles = {
  page: {
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: {
    background: "#1abc9c",
    padding: "12px 20px",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  title: {
    margin: 0,
    fontSize: "20px",
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    background: "#ecf0f1",
    padding: "30px",
  },
  formContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "450px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    marginBottom: "40px",
  },
  sectionTitle: {
    color: "#2c3e50",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  tableSection: {
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    background: "#34495e",
    color: "#fff",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};

// 💡 Button style generator
const btnStyle = (bg) => ({
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  transition: "background 0.2s",
});

export default AdminDashboard;


