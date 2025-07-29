
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // includes id, role, etc.
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// module.exports = verifyToken;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Safely fetch user info but extract only what you need
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "role", "email"], // ✅ Add/remove as needed
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Attach only plain object, not Sequelize instance
    req.user = user.toJSON(); // 🔥 Important!
    
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;