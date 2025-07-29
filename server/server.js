// // server/server.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const sequelize = require('./config/db');
// const authRoutes = require("./routes/authRoutes");
// const studentRoutes = require("./routes/studentRoutes");
// const Attendance = require("./models/Attendance");
// const Exam = require("./models/Exam"); // Add this at the top
// const Fee = require("./models/Fee");
// const patientRoutes = require("./routes/patientRoutes");
// const doctorRoutes = require("./routes/doctorRoutes");
// const appointmentRoutes = require("./routes/appointmentRoutes");
// const Appointment = require("./models/Appointment"); // ✅ Must import
// // const employeeRoutes = require('./routes/employeeRoutes'); // Import the routes
// const leaveRoutes = require('./routes/leaveRoutes');
// const payrollRoutes = require("./routes/payrollRoutes");
// const userRoutes = require("./routes/userRoutes");
// const documentRoutes = require("./routes/documentRoutes");


// dotenv.config();
// const app = express();

// const adminRoutes = require("./routes/adminRoutes");
// const Student = require("./models/Student");
// const attendanceRoutes = require("./routes/attendanceRoutes");
// const examRoutes = require("./routes/examRoutes");
// const feeRoutes = require("./routes/feeRoutes");


// app.use(cors());
// app.use(express.json());


// // Routes
// app.use('/api/auth', authRoutes);

// app.use("/api/admin", adminRoutes);

// app.use("/api/students", studentRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/exams", examRoutes);
// app.use("/api/fees", feeRoutes);
// app.use("/api/patients", patientRoutes);
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/appointments", appointmentRoutes);
// // app.use('/api/employees', employeeRoutes); // Use the routes
// app.use('/api/leaves', leaveRoutes);
// app.use("/api/payrolls", payrollRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/uploads", express.static("uploads"));


// // DB Sync & Start Server
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('MySQL DB connected');
//     app.listen(process.env.PORT, () =>
//       console.log(`Server running on port ${process.env.PORT}`)
//     );
//   })
//   .catch(err => console.error('DB connection error:', err));
// app.listen(5000, () => console.log("Server running on port 5000"));
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();

// Models (Make sure models are imported before syncing)
require("./models/Attendance");
require("./models/Exam");
require("./models/Fee");
require("./models/Appointment");
require("./models/Student");
require("./models/Document"); // Include Document model to establish associations

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const examRoutes = require("./routes/examRoutes");
const feeRoutes = require("./routes/feeRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
// const employeeRoutes = require('./routes/employeeRoutes'); // Uncomment if needed
const leaveRoutes = require('./routes/leaveRoutes');
const payrollRoutes = require("./routes/payrollRoutes");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");
const inventoryRoutes = require('./routes/inventoryRoutes');
const crmRoutes = require("./routes/crmRoutes");


// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));



// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
// app.use('/api/employees', employeeRoutes); // Enable if employee module is active
app.use('/api/leaves', leaveRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/clients", crmRoutes);


// DB Sync & Server Start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('MySQL DB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
