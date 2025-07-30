// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Admin", // default role
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", form);
//       alert(res.data.message);
//       navigate("/"); // Redirect to login after registration
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Register</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         /><br /><br />
//         <select name="role" value={form.role} onChange={handleChange}>
//           <option value="Admin">Admin</option>
//           <option value="Teacher">Teacher</option>
//           <option value="Doctor">Doctor</option>
//           <option value="Employee">Employee</option>
//         </select><br /><br />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  // 🔥 Styles
  const outerContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe, #f0f4f8)",
    fontFamily: "'Poppins', sans-serif",
  };

  const card = {
    width: "100%",
    maxWidth: "420px",
    padding: "40px 30px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
    color: "#1e293b",
  };

const title = {
  fontSize: "22px", // was 26px
  fontWeight: "600",
  textAlign: "center",
  marginBottom: "25px",
  color: "#4f46e5",
};


  const inputContainer = {
    position: "relative",
    marginBottom: "25px",
  };

const input = {
  width: "90%",
  padding: "14px", // was 14px
  marginBottom: "22px",
  borderRadius: "10px",
  border: "1px solidrgb(156, 190, 232)",
  backgroundColor: "#f9fafb",
  fontSize: "14px", // was 15px
  outline: "none",
};

const floatingLabel = (value) => ({
  position: "absolute",
  left: "14px",
  top: value ? "-10px" : "13px",
  fontSize: value ? "16px" : "17px", // reduced both
  color: value ? "#4f46e5" : "#64748b",
  background: "#ffffff",
  padding: "0 4px",
  transition: "all 0.2s ease",
  pointerEvents: "none",
});


  const select = {
    ...input,
    appearance: "none",
    backgroundColor: "#f9fafb",
  };

const button = {
  width: "100%",
  padding: "12px", // was 14px
  fontSize: "15px", // was 16px
  backgroundColor: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
  transition: "all 0.3s ease",
};


  const errorBox = {
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div style={outerContainer}>
      <div style={card}>
        <h2 style={title}>Create Your Account</h2>
        {error && <div style={errorBox}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={inputContainer}>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              style={input}
            />
            <label style={floatingLabel(form.name)}>Full Name</label>
          </div>

          {/* Email Field */}
          <div style={inputContainer}>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              style={input}
            />
            <label style={floatingLabel(form.email)}>Email Address</label>
          </div>

          {/* Password Field */}
          <div style={inputContainer}>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              style={input}
            />
            <label style={floatingLabel(form.password)}>Password</label>
          </div>

          {/* Role Select */}
          <div style={inputContainer}>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              style={select}
            >
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Doctor">Doctor</option>
              <option value="Employee">Employee</option>
            </select>
            <label style={floatingLabel(form.role)}>Select Role</label>
          </div>

          {/* Button */}
          <button type="submit" style={button}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

