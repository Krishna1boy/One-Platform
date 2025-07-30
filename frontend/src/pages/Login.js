// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       console.log("Login Success:", res.data);

//       const { token, user } = res.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("userRole", user.role);

//       switch (user.role) {
//         case "Admin":
//           navigate("/admin");
//           break;
//         case "Doctor":
//           navigate("/doctor");
//           break;
//         case "Teacher":
//           navigate("/teacher");
//           break;
//         case "Employee":
//           navigate("/employee");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err) {
//       console.error("Login Error:", err.response);
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <br /><br />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // ✅ Include your external styles

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);

      // Route user by role
      switch (user.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Doctor":
          navigate("/doctor");
          break;
        case "Teacher":
          navigate("/teacher");
          break;
        case "Employee":
          navigate("/employee");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Toggle theme
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="page-container">
      {/* 🌙 Theme Toggle */}
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* 🔐 Login Form */}
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      {/* 📄 Info Section */}
      <div className="content-with-padding">
        <h1>Welcome to All in One Management Platform</h1>
        <p>
          All in One Management Platform is a secure, role-based platform designed to empower educators,
          medical professionals, and employees. Whether you're managing classes,
          handling appointments, or working in admin, we make your digital workspace
          smarter, simpler, and more personalized.
        </p>

        <p>
          With All in One Management Platform, you get:
          <ul>
            <li>🔐 Safe & secure login</li>
            <li>📊 Intelligent dashboards</li>
            <li>🧩 Role-specific access and tools</li>
            <li>🌙 Light & dark mode for your comfort</li>
          </ul>
        </p>

        <p>
          Log in today and experience the future of connected workspaces.
        </p>
      </div>
    </div>
  );
}

export default Login;

