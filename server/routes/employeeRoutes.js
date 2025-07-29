const express = require('express');
const router = express.Router();
const Employee = require("../models/Employee");

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Add a new employee
router.post('/', async (req, res) => {
  try {
    const { name, email, position, salary } = req.body;
    const newEmployee = await Employee.create({ name, email, position, salary });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

module.exports = router;
