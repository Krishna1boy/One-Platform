// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminAppointmentPage = () => {
//   const token = localStorage.getItem("token");
//   const [appointments, setAppointments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [form, setForm] = useState({
//     patientName: "",
//     doctorId: "",
//     date: "",
//     time: "",
//     reason: "",
//   });

//   const loadAppointments = async () => {
//     const res = await axios.get("http://localhost:5000/api/appointments/all", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setAppointments(res.data);
//   };

//   const loadDoctors = async () => {
//     const res = await axios.get("http://localhost:5000/api/users?role=Doctor", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setDoctors(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/appointments", form, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     alert("Appointment scheduled.");
//     setForm({ patientName: "", doctorId: "", date: "", time: "", reason: "" });
//     loadAppointments();
//   };

//   useEffect(() => {
//     loadDoctors();
//     loadAppointments();
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>📅 Admin Appointments</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Patient Name"
//           value={form.patientName}
//           onChange={(e) => setForm({ ...form, patientName: e.target.value })}
//           required
//         />
//         <select
//           value={form.doctorId}
//           onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
//           required
//         >
//           <option value="">Select Doctor</option>
//           {doctors.map((d) => (
//             <option key={d.id} value={d.id}>
//               {d.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="date"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />
//         <input
//           type="time"
//           value={form.time}
//           onChange={(e) => setForm({ ...form, time: e.target.value })}
//           required
//         />
//         <input
//           placeholder="Reason"
//           value={form.reason}
//           onChange={(e) => setForm({ ...form, reason: e.target.value })}
//         />
//         <button type="submit">Schedule</button>
//       </form>

//       <h3>All Appointments</h3>
//       <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Doctor</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Reason</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((a) => (
//             <tr key={a.id}>
//               <td>{a.patientName}</td>
//               <td>{a.Doctor?.name}</td>
//               <td>{a.date}</td>
//               <td>{a.time}</td>
//               <td>{a.reason}</td>
//               <td>{a.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminAppointmentPage;


import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointmentPage = () => {
  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  const loadAppointments = async () => {
    const res = await axios.get("http://localhost:5000/api/appointments/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAppointments(res.data);
  };

  const loadDoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/users?role=Doctor", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDoctors(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/appointments", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Appointment scheduled.");
    setForm({ patientName: "", doctorId: "", date: "", time: "", reason: "" });
    loadAppointments();
  };

  useEffect(() => {
    loadDoctors();
    loadAppointments();
  }, []);

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

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Admin Appointments</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              placeholder="Patient Name"
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              required
              style={styles.input}
            />
            <select
              value={form.doctorId}
              onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
              required
              style={styles.input}
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
              style={styles.input}
            />
            <input
              placeholder="Reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              style={styles.input}
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1e7e34")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
            >
              Schedule Appointment
            </button>
          </form>
        </div>

        <div style={styles.tableWrapper}>
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>All Appointments</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patientName}</td>
                  <td>{a.Doctor?.name}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>{a.reason}</td>
                  <td>{a.status}</td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                    No appointments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ✨ CSS-in-JS Styles
const styles = {
  wrapper: {
    height: "100vh",
    overflowY: "auto",
    fontFamily: "Segoe UI, sans-serif",
  },
  page: {
    background: "linear-gradient(to right, #fce4ec, #f3e5f5)",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "550px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "12px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  tableWrapper: {
    width: "100%",
    maxWidth: "950px",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
};

export default AdminAppointmentPage;
