// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TeacherDashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", grade: "", section: "" });
//   const [attendanceForm, setAttendanceForm] = useState({ studentId: "", date: "", status: "Present" });
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [examForm, setExamForm] = useState({
//     studentId: "", subject: "", marksObtained: "", totalMarks: "", examDate: ""
//   });
//   const [examRecords, setExamRecords] = useState([]);

//   const token = localStorage.getItem("token");

//   const loadStudents = async () => {
//     const res = await axios.get("http://localhost:5000/api/students", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setStudents(res.data);
//   };

//   const loadAttendance = async () => {
//     const res = await axios.get("http://localhost:5000/api/attendance", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setAttendanceRecords(res.data);
//   };

//   const loadExams = async () => {
//     const res = await axios.get("http://localhost:5000/api/exams", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setExamRecords(res.data);
//   };

//   useEffect(() => {
//     loadStudents();
//     loadAttendance();
//     loadExams();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/students", form, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setForm({ name: "", email: "", grade: "", section: "" });
//     loadStudents();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/students/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     loadStudents();
//   };

//   const handleAttendanceSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/attendance", attendanceForm, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Attendance marked successfully");
//       setAttendanceForm({ studentId: "", date: "", status: "Present" });
//       loadAttendance();
//     } catch (err) {
//       alert("Failed to mark attendance");
//     }
//   };

//   const handleExamSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/exams", examForm, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Exam added");
//       setExamForm({ studentId: "", subject: "", marksObtained: "", totalMarks: "", examDate: "" });
//       loadExams();
//     } catch (err) {
//       alert("Failed to add exam");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
//       <h2>Teacher Dashboard</h2>
//       <button onClick={() => { localStorage.clear(); window.location.href = "/" }}>Logout</button>
//       <button onClick={() => window.location.href = "/finance"}>Go to Finance Page</button>

//       {/* Add Student */}
//       <h3>Add Student</h3>
//       <form onSubmit={handleAdd}>
//         <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//         <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
//         <input placeholder="Grade" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} />
//         <input placeholder="Section" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} />
//         <button type="submit">Add Student</button>
//       </form>

//       {/* Student List */}
//       <h3>Student List</h3>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr><th>Name</th><th>Email</th><th>Grade</th><th>Section</th><th>Action</th></tr>
//         </thead>
//         <tbody>
//           {students.map(s => (
//             <tr key={s.id}>
//               <td>{s.name}</td><td>{s.email}</td><td>{s.grade}</td><td>{s.section}</td>
//               <td><button onClick={() => handleDelete(s.id)}>Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Attendance Form */}
//       <h3>Mark Attendance</h3>
//       <form onSubmit={handleAttendanceSubmit}>
//         <select
//           value={attendanceForm.studentId}
//           onChange={(e) => setAttendanceForm({ ...attendanceForm, studentId: e.target.value })}
//           required
//         >
//           <option value="">Select Student</option>
//           {students.map(s => (
//             <option key={s.id} value={s.id}>{s.name}</option>
//           ))}
//         </select>
//         <input
//           type="date"
//           value={attendanceForm.date}
//           onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
//           required
//         />
//         <select
//           value={attendanceForm.status}
//           onChange={(e) => setAttendanceForm({ ...attendanceForm, status: e.target.value })}
//         >
//           <option value="Present">Present</option>
//           <option value="Absent">Absent</option>
//         </select>
//         <button type="submit">Mark Attendance</button>
//       </form>

//       {/* Attendance History */}
//       <h3>Attendance History</h3>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Student</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendanceRecords.map((record) => (
//             <tr key={record.id}>
//               <td>{record.date}</td>
//               <td>{record.Student?.name}</td>
//               <td>{record.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Exam Form */}
//       <h3>Add Exam Marks</h3>
//       <form onSubmit={handleExamSubmit}>
//         <select
//           value={examForm.studentId}
//           onChange={(e) => setExamForm({ ...examForm, studentId: e.target.value })}
//           required
//         >
//           <option value="">Select Student</option>
//           {students.map((s) => (
//             <option key={s.id} value={s.id}>{s.name}</option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Subject"
//           value={examForm.subject}
//           onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Marks Obtained"
//           value={examForm.marksObtained}
//           onChange={(e) => setExamForm({ ...examForm, marksObtained: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Total Marks"
//           value={examForm.totalMarks}
//           onChange={(e) => setExamForm({ ...examForm, totalMarks: e.target.value })}
//           required
//         />
//         <input
//           type="date"
//           value={examForm.examDate}
//           onChange={(e) => setExamForm({ ...examForm, examDate: e.target.value })}
//           required
//         />
//         <button type="submit">Add Exam</button>
//       </form>

//       {/* Exam Records Table */}
//       <h3>Exam Records</h3>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Student</th>
//             <th>Subject</th>
//             <th>Marks</th>
//             <th>Total</th>
//             <th>Percentage</th>
//           </tr>
//         </thead>
//         <tbody>
//           {examRecords.map((exam) => (
//             <tr key={exam.id}>
//               <td>{exam.examDate}</td>
//               <td>{exam.Student?.name}</td>
//               <td>{exam.subject}</td>
//               <td>{exam.marksObtained}</td>
//               <td>{exam.totalMarks}</td>
//               <td>{((exam.marksObtained / exam.totalMarks) * 100).toFixed(2)}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default TeacherDashboard;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const TeacherDashboard = () => {
//   const dashboardRef = useRef(null);
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", grade: "", section: "" });
//   const [attendanceForm, setAttendanceForm] = useState({ studentId: "", date: "", status: "Present" });
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [examForm, setExamForm] = useState({
//     studentId: "", subject: "", marksObtained: "", totalMarks: "", examDate: ""
//   });
//   const [examRecords, setExamRecords] = useState([]);
//   const token = localStorage.getItem("token");

//   const scrollToTop = () => {
//     dashboardRef.current.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const scrollToBottom = () => {
//     dashboardRef.current.scrollTo({ top: dashboardRef.current.scrollHeight, behavior: "smooth" });
//   };

//   const loadStudents = async () => {
//     const res = await axios.get("http://localhost:5000/api/students", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setStudents(res.data);
//   };

//   const loadAttendance = async () => {
//     const res = await axios.get("http://localhost:5000/api/attendance", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setAttendanceRecords(res.data);
//   };

//   const loadExams = async () => {
//     const res = await axios.get("http://localhost:5000/api/exams", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setExamRecords(res.data);
//   };

//   useEffect(() => {
//     loadStudents();
//     loadAttendance();
//     loadExams();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:5000/api/students", form, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setForm({ name: "", email: "", grade: "", section: "" });
//     loadStudents();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/students/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     loadStudents();
//   };

//   const handleAttendanceSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/attendance", attendanceForm, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Attendance marked successfully");
//       setAttendanceForm({ studentId: "", date: "", status: "Present" });
//       loadAttendance();
//     } catch (err) {
//       alert("Failed to mark attendance");
//     }
//   };

//   const handleExamSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/exams", examForm, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Exam added");
//       setExamForm({ studentId: "", subject: "", marksObtained: "", totalMarks: "", examDate: "" });
//       loadExams();
//     } catch (err) {
//       alert("Failed to add exam");
//     }
//   };

//   return (
//     <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       {/* Sticky Header */}
//       <div style={{
//         display: "flex", justifyContent: "space-between", alignItems: "center",
//         backgroundColor: "#3f51b5", padding: "10px 30px", color: "#fff",
//         position: "sticky", top: 0, zIndex: 100
//       }}>
//         <h2 style={{ margin: 0 }}>📘 Teacher Dashboard</h2>
//         <div>
//           <button onClick={() => { localStorage.clear(); window.location.href = "/" }}
//             style={{ background: "#e74c3c", color: "#fff", border: "none", marginRight: 7, padding: "6px 12px", borderRadius: 4 }}>Logout</button>
//           <button onClick={() => window.location.href = "/finance"}
//             style={{ background: "#3498db", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4 }}>Finance</button>
//         </div>
//       </div>

//       {/* Scrollable Dashboard Body */}
//       <div ref={dashboardRef} style={{
//         flex: 1,
//         overflowY: "scroll",
//         padding: "20px 30px",
//         backgroundColor: "#f4f6f9"
//       }}>
//         {/* Add Student */}
//         <h3>Add Student</h3>
//         <form onSubmit={handleAdd} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
//           <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//           <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
//           <input placeholder="Grade" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} />
//           <input placeholder="Section" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} />
//           <button type="submit" style={{ background: "#2ecc71", color: "#fff", padding: "6px 12px", border: "none", borderRadius: 4 }}>Add</button>
//         </form>

//         {/* Student List */}
//         <h3>Student List</h3>
//         <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 40 }}>
//           <thead style={{ backgroundColor: "#ecf0f1" }}>
//             <tr><th>Name</th><th>Email</th><th>Grade</th><th>Section</th><th>Action</th></tr>
//           </thead>
//           <tbody>
//             {students.map(s => (
//               <tr key={s.id}>
//                 <td>{s.name}</td><td>{s.email}</td><td>{s.grade}</td><td>{s.section}</td>
//                 <td>
//                   <button onClick={() => handleDelete(s.id)} style={{ background: "#c0392b", color: "#fff", border: "none", padding: "4px 8px", borderRadius: 4 }}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Mark Attendance */}
//         <h3>Mark Attendance</h3>
//         <form onSubmit={handleAttendanceSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
//           <select value={attendanceForm.studentId} onChange={e => setAttendanceForm({ ...attendanceForm, studentId: e.target.value })} required>
//             <option value="">Select Student</option>
//             {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//           </select>
//           <input type="date" value={attendanceForm.date} onChange={e => setAttendanceForm({ ...attendanceForm, date: e.target.value })} required />
//           <select value={attendanceForm.status} onChange={e => setAttendanceForm({ ...attendanceForm, status: e.target.value })}>
//             <option value="Present">Present</option>
//             <option value="Absent">Absent</option>
//           </select>
//           <button type="submit" style={{ background: "#2980b9", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4 }}>Mark</button>
//         </form>

//         {/* Attendance History */}
//         <h3>Attendance History</h3>
//         <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 40 }}>
//           <thead style={{ backgroundColor: "#ecf0f1" }}>
//             <tr><th>Date</th><th>Student</th><th>Status</th></tr>
//           </thead>
//           <tbody>
//             {attendanceRecords.map((r) => (
//               <tr key={r.id}>
//                 <td>{r.date}</td>
//                 <td>{r.Student?.name}</td>
//                 <td>{r.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Add Exam Marks */}
//         <h3>Add Exam Marks</h3>
//         <form onSubmit={handleExamSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
//           <select value={examForm.studentId} onChange={e => setExamForm({ ...examForm, studentId: e.target.value })} required>
//             <option value="">Select Student</option>
//             {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
//           </select>
//           <input type="text" placeholder="Subject" value={examForm.subject} onChange={e => setExamForm({ ...examForm, subject: e.target.value })} required />
//           <input type="number" placeholder="Marks" value={examForm.marksObtained} onChange={e => setExamForm({ ...examForm, marksObtained: e.target.value })} required />
//           <input type="number" placeholder="Total" value={examForm.totalMarks} onChange={e => setExamForm({ ...examForm, totalMarks: e.target.value })} required />
//           <input type="date" value={examForm.examDate} onChange={e => setExamForm({ ...examForm, examDate: e.target.value })} required />
//           <button type="submit" style={{ background: "#8e44ad", color: "#fff", padding: "6px 12px", border: "none", borderRadius: 4 }}>Add</button>
//         </form>

//         {/* Exam Records */}
//         <h3>Exam Records</h3>
//         <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 80 }}>
//           <thead style={{ backgroundColor: "#ecf0f1" }}>
//             <tr><th>Date</th><th>Student</th><th>Subject</th><th>Marks</th><th>Total</th><th>%</th></tr>
//           </thead>
//           <tbody>
//             {examRecords.map((e) => (
//               <tr key={e.id}>
//                 <td>{e.examDate}</td>
//                 <td>{e.Student?.name}</td>
//                 <td>{e.subject}</td>
//                 <td>{e.marksObtained}</td>
//                 <td>{e.totalMarks}</td>
//                 <td>{((e.marksObtained / e.totalMarks) * 100).toFixed(2)}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Scroll Buttons */}
//       <div style={{
//         position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 10
//       }}>
//         <button onClick={scrollToTop} style={{ background: "#555", color: "#fff", border: "none", borderRadius: "50%", padding: 10 }}>⬆</button>
//         <button onClick={scrollToBottom} style={{ background: "#555", color: "#fff", border: "none", borderRadius: "50%", padding: 10 }}>⬇</button>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;






import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const dashboardRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", grade: "", section: "" });
  const [attendanceForm, setAttendanceForm] = useState({ studentId: "", date: "", status: "Present" });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [examForm, setExamForm] = useState({
    studentId: "", subject: "", marksObtained: "", totalMarks: "", examDate: ""
  });
  const [examRecords, setExamRecords] = useState([]);
  const token = localStorage.getItem("token");

  // Shared styles
  const inputStyle = {
    padding: "6px 10px",
    borderRadius: 4,
    border: "1px solid #ccc",
    width: "90%",
    fontSize: "14px"
  };

  const selectStyle = {
    ...inputStyle ,
    //  width: "500px"
  };

  const buttonStyle = {
    background: "#2ecc71",
    color: "#fff",
    padding: "10px 10px",
    border: "none",
    borderRadius: 4,
    fontSize: "14px",
    width: "50%",
    cursor: "pointer"
  };

  const sectionContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "40px"
  };

  const sectionStyle = {
    flex: "1 1 500px", // Responsive side-by-side or stacked
    maxWidth: "100%"
  };

  // Scroll functions
  const scrollToTop = () => {
    dashboardRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    dashboardRef.current.scrollTo({ top: dashboardRef.current.scrollHeight, behavior: "smooth" });
  };

  // Data loading
  const loadStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(res.data);
  };

  const loadAttendance = async () => {
    const res = await axios.get("http://localhost:5000/api/attendance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAttendanceRecords(res.data);
  };

  const loadExams = async () => {
    const res = await axios.get("http://localhost:5000/api/exams", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExamRecords(res.data);
  };

  useEffect(() => {
    loadStudents();
    loadAttendance();
    loadExams();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/students", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ name: "", email: "", grade: "", section: "" });
    loadStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadStudents();
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/attendance", attendanceForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Attendance marked successfully");
      setAttendanceForm({ studentId: "", date: "", status: "Present" });
      loadAttendance();
    } catch (err) {
      alert("Failed to mark attendance");
    }
  };

  const handleExamSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/exams", examForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Exam added");
      setExamForm({ studentId: "", subject: "", marksObtained: "", totalMarks: "", examDate: "" });
      loadExams();
    } catch (err) {
      alert("Failed to add exam");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        backgroundColor: "skyblue", padding: "10px 30px", color: "black",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <h2 style={{ margin: 0 }}>Teacher Dashboard</h2>
        <div>
          <button onClick={() => window.location.href = "/finance"}
            style={{ background: "#3498db", color: "#fff", border: "none", marginRight: 7, padding: "6px 12px", borderRadius: 4 }}>Finance</button>
          <button onClick={() => { localStorage.clear(); window.location.href = "/" }}
            style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4 }}>Logout</button>
        </div>
      </div>

      {/* Main content */}
      <div ref={dashboardRef} style={{ flex: 1, overflowY: "auto", padding: "20px 30px", backgroundColor: "#f4f6f9" }}>
        
        {/* Add Student + Student List */}
        <div style={sectionContainerStyle}>
          <div style={sectionStyle}>
            <h3>Add Student</h3>
            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="Name" style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input placeholder="Email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              <input placeholder="Grade" style={inputStyle} value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} />
              <input placeholder="Section" style={inputStyle} value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} />
              <button type="submit" style={buttonStyle}>Add</button>
            </form>
          </div>

          <div style={sectionStyle}>
            <h3>Student List</h3>
            <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#ecf0f1" }}>
                <tr><th>Name</th><th>Email</th><th>Grade</th><th>Sec</th><th>Del</th></tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td><td>{s.email}</td><td>{s.grade}</td><td>{s.section}</td>
                    <td><button onClick={() => handleDelete(s.id)} style={{ background: "#c0392b", color: "#fff", border: "none", padding: "3px 6px", borderRadius: 4 }}>❌</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Section */}
        <div style={sectionContainerStyle}>
          <div style={sectionStyle}>
            <h3>Mark Attendance</h3>
            <form onSubmit={handleAttendanceSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <select value={attendanceForm.studentId} onChange={e => setAttendanceForm({ ...attendanceForm, studentId: e.target.value })} required style={selectStyle}>
                <option value="">Select Student</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input type="date" style={inputStyle} value={attendanceForm.date} onChange={e => setAttendanceForm({ ...attendanceForm, date: e.target.value })} required />
              <select value={attendanceForm.status} onChange={e => setAttendanceForm({ ...attendanceForm, status: e.target.value })} style={selectStyle}>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              <button type="submit" style={{ ...buttonStyle, background: "#2980b9" }}>Mark</button>
            </form>
          </div>

          <div style={sectionStyle}>
            <h3>Attendance History</h3>
            <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#ecf0f1" }}>
                <tr><th>Date</th><th>Student</th><th>Status</th></tr>
              </thead>
              <tbody>
                {attendanceRecords.map((r) => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>{r.Student?.name}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Exam Section */}
        <div style={sectionContainerStyle}>
          <div style={sectionStyle}>
            <h3>Add Exam Marks</h3>
            <form onSubmit={handleExamSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <select value={examForm.studentId} onChange={e => setExamForm({ ...examForm, studentId: e.target.value })} required style={selectStyle}>
                <option value="">Select Student</option>
                {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input type="text" placeholder="Subject" style={inputStyle} value={examForm.subject} onChange={e => setExamForm({ ...examForm, subject: e.target.value })} required />
              <input type="number" placeholder="Marks" style={inputStyle} value={examForm.marksObtained} onChange={e => setExamForm({ ...examForm, marksObtained: e.target.value })} required />
              <input type="number" placeholder="Total" style={inputStyle} value={examForm.totalMarks} onChange={e => setExamForm({ ...examForm, totalMarks: e.target.value })} required />
              <input type="date" style={inputStyle} value={examForm.examDate} onChange={e => setExamForm({ ...examForm, examDate: e.target.value })} required />
              <button type="submit" style={buttonStyle}>Add</button>
            </form>
          </div>

          <div style={sectionStyle}>
            <h3>Exam Records</h3>
            <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#ecf0f1" }}>
                <tr><th>Date</th><th>Student</th><th>Subject</th><th>Marks</th><th>Total</th><th>%</th></tr>
              </thead>
              <tbody>
                {examRecords.map((e) => (
                  <tr key={e.id}>
                    <td>{e.examDate}</td>
                    <td>{e.Student?.name}</td>
                    <td>{e.subject}</td>
                    <td>{e.marksObtained}</td>
                    <td>{e.totalMarks}</td>
                    <td>{((e.marksObtained / e.totalMarks) * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Scroll Buttons (optional) */}
      <div style={{
        position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 10
      }}>
        <button onClick={scrollToTop} style={{ background: "#555", color: "#fff", border: "none", borderRadius: "50%", padding: 10 }}>⬆</button>
        <button onClick={scrollToBottom} style={{ background: "#555", color: "#fff", border: "none", borderRadius: "50%", padding: 10 }}>⬇</button>
      </div>
    </div>
  );
};

export default TeacherDashboard;

