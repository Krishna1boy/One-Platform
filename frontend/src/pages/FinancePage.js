// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FinancePage = () => {
//   const [fees, setFees] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({
//     studentId: "",
//     amountPaid: "",
//     paymentDate: "",
//     method: "Cash",
//   });

//   const token = localStorage.getItem("token");

//   const loadFees = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/fees", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFees(res.data);
//     } catch (err) {
//       alert("Could not load fee records.");
//       console.error(err);
//     }
//   };

//   const loadStudents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/students", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(res.data);
//     } catch (err) {
//       alert("Could not load student list.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/fees",
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Fee added successfully.");
//       setForm({ studentId: "", amountPaid: "", paymentDate: "", method: "Cash" });
//       loadFees();
//     } catch (err) {
//       alert("Error adding fee.");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadStudents();
//     loadFees();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Finance Page</h2>

//       <form onSubmit={handleSubmit}>
//         <select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} required>
//           <option value="">Select Student</option>
//           {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//         </select>
//         <input
//           type="number"
//           placeholder="Amount Paid"
//           value={form.amountPaid}
//           onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
//           required
//         />
//         <input
//           type="date"
//           value={form.paymentDate}
//           onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
//           required
//         />
//         <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
//           <option value="Cash">Cash</option>
//           <option value="UPI">UPI</option>
//           <option value="Card">Card</option>
//         </select>
//         <button type="submit">Add Payment</button>
//       </form>

//       <h3>Payment Records</h3>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr><th>Student</th><th>Amount</th><th>Method</th><th>Date</th></tr>
//         </thead>
//         <tbody>
//           {fees.map(fee => (
//             <tr key={fee.id}>
//               <td>{fee.Student?.name}</td>
//               <td>{fee.amountPaid}</td>
//               <td>{fee.method}</td>
//               <td>{fee.paymentDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FinancePage;


import React, { useEffect, useState } from "react";
import axios from "axios";

const FinancePage = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    amountPaid: "",
    paymentDate: "",
    method: "Cash",
  });

  const token = localStorage.getItem("token");

  const loadFees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFees(res.data);
    } catch (err) {
      alert("Could not load fee records.");
      console.error(err);
    }
  };

  const loadStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      alert("Could not load student list.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/fees", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Fee added successfully.");
      setForm({ studentId: "", amountPaid: "", paymentDate: "", method: "Cash" });
      loadFees();
    } catch (err) {
      alert("Error adding fee.");
      console.error(err);
    }
  };

  useEffect(() => {
    loadStudents();
    loadFees();
  }, []);

  const inputStyle = {
    padding: "8px",
    marginBottom: "10px",
    width: "80%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "14px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    width: "60%",
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto", background: "#f9f9f9" }}>
      
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#3498db",
          color: "#fff",
          padding: "15px 20px",
          zIndex: 1000,
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(215, 191, 191, 0.2)"
        }}
      >
        Finance Page
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              flex: "1 1 350px",
              minWidth: "300px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Add Payment</h3>

            <select
              style={inputStyle}
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              required
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Amount Paid"
              value={form.amountPaid}
              onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
              style={inputStyle}
              required
            />

            <input
              type="date"
              value={form.paymentDate}
              onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
              style={inputStyle}
              required
            />

            <select
              style={inputStyle}
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>

            <button type="submit" style={buttonStyle}>
              Add Payment
            </button>
          </form>

          {/* Table */}
          <div
            style={{
              flex: "2 1 600px",
              minWidth: "300px",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              overflowX: "auto",
            }}
          >
            <h3>Payment Records</h3>
            <table style={{ width: "100%", minWidth: "500px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#ecf0f1" }}>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>Student</th>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>Amount</th>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>Method</th>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.id}>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>{fee.Student?.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>{fee.amountPaid}</td>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>{fee.method}</td>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>{fee.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;

