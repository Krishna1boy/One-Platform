// models/Doctor.js
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define("Doctor", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    // specialization: DataTypes.STRING,
    password: DataTypes.STRING, // hashed
  });

  return Doctor;
};
