const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");

const Exam = sequelize.define("Exam", {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marksObtained: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalMarks: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  examDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

Exam.belongsTo(Student);
Student.hasMany(Exam);

module.exports = Exam;
