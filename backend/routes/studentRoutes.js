const express = require('express');
const multer = require('multer');
const Student = require('../models/Student');
const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Add Student
router.post('/add', upload.single('receipt'), async (req, res) => {
  try {
    const { studentName, parentName, feeSubmissionDate } = req.body;
    const receipt = req.file ? req.file.path : '';

    const newStudent = new Student({
      studentName,
      parentName,
      feeSubmissionDate,
      receipt,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
