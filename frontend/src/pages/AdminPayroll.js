// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminPayroll = () => {
//   const [employees, setEmployees] = useState([]);
//   const [form, setForm] = useState({
//     userId: "",
//     amount: "",
//     datePaid: "",
//     remarks: "",
//   });
//   const [records, setRecords] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     loadEmployees();
//     loadPayrolls();
//   }, []);

//   const loadEmployees = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users?role=Employee", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployees(res.data);
//     } catch (err) {
//       console.error("Error loading employees", err);
//     }
//   };

//   const loadPayrolls = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/payrolls", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRecords(res.data);
//     } catch (err) {
//       console.error("Error loading payroll records", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/payrolls", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Salary record added");
//       setForm({ userId: "", amount: "", datePaid: "", remarks: "" });
//       loadPayrolls();
//     } catch (err) {
//       alert("Error adding salary");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Admin Payroll Management</h2>

//       <form onSubmit={handleSubmit}>
//         <select
//           required
//           value={form.userId}
//           onChange={(e) => setForm({ ...form, userId: e.target.value })}
//         >
//           <option value="">Select Employee</option>
//           {employees.map((emp) => (
//             <option key={emp.id} value={emp.id}>
//               {emp.name} ({emp.email})
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           placeholder="Amount"
//           value={form.amount}
//           onChange={(e) => setForm({ ...form, amount: e.target.value })}
//           required
//         />
//         <input
//           type="date"
//           value={form.datePaid}
//           onChange={(e) => setForm({ ...form, datePaid: e.target.value })}
//           required
//         />
//         <input
//           placeholder="Remarks"
//           value={form.remarks}
//           onChange={(e) => setForm({ ...form, remarks: e.target.value })}
//         />
//         <button type="submit">Add Salary</button>
//       </form>

//       <h3>All Salary Records</h3>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Employee</th>
//             <th>Email</th>
//             <th>Date Paid</th>
//             <th>Amount</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map((r) => (
//             <tr key={r.id}>
//               <td>{r.User?.name}</td>
//               <td>{r.User?.email}</td>
//               <td>{r.datePaid}</td>
//               <td>₹{r.amount}</td>
//               <td>{r.remarks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPayroll;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPayroll = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    amount: "",
    datePaid: "",
    remarks: "",
  });
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadEmployees();
    loadPayrolls();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users?role=Employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees", err);
    }
  };

  const loadPayrolls = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payrolls", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error loading payroll records", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/payrolls", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Salary record added");
      setForm({ userId: "", amount: "", datePaid: "", remarks: "" });
      loadPayrolls();
    } catch (err) {
      alert("Error adding salary");
      console.error(err);
    }
  };

  return (
    
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}> Admin Payroll Management</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            required
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            style={styles.input}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            style={styles.input}
          />

          <input
            type="date"
            value={form.datePaid}
            onChange={(e) => setForm({ ...form, datePaid: e.target.value })}
            required
            style={styles.input}
          />

          <input
            placeholder="Remarks"
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1e7e34")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Add Salary
          </button>
        </form>
      </div>

      <div style={styles.tableWrapper}>
        <h3 style={{ marginBottom: "10px", textAlign: "center" }}>All Salary Records</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Date Paid</th>
              <th>Amount</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, index) => (
              <tr key={r.id} style={{ backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff" }}>
                <td>{r.User?.name}</td>
                <td>{r.User?.email}</td>
                <td>{r.datePaid}</td>
                <td>₹{r.amount}</td>
                <td>{r.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🌿 Styles
const styles = {
  page: {
    background: "linear-gradient(to right, #e8f5e9, #e3f2fd)",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    marginBottom: "30px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  tableWrapper: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
};

export default AdminPayroll;


