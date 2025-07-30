import React, { useState, useEffect } from "react";
import axios from "axios";

const BookAppointment = () => {
  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: "",
    reason: "",
  });
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("token");

  const loadDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users?role=Doctor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error("Error loading doctors", err);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/api/appointments", {
      patientName: form.patientName,
      date: form.date,
      time: form.time,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Appointment booked");
    setForm({ patientName: "", date: "", time: "" });
  } catch (err) {
    console.error("Error booking appointment", err.response?.data || err.message);
    alert("Error booking appointment");
  }
};


  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Patient Name"
          value={form.patientName}
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          required
        />
        {/* <select
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select> */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <textarea
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookAppointment;
