const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/feeSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Student schema
const studentSchema = new mongoose.Schema({
  studentName: String,
  parentName: String,
  feeSubmissionDate: Date,
  receiptPath: String,
});

const Student = mongoose.model('students', studentSchema);

// CORS middleware
app.use(cors(
    {
        origin: 'http://localhost:3000', // Update this to the address of your React app
      }
));

// File upload configuration using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware to handle form data
app.use(express.json());

// Route to handle student form submission
app.post('/api/students/add', upload.single('receipt'), async (req, res) => {
  const { studentName, parentName, feeSubmissionDate } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Receipt file is required' });
  }

  const newStudent = new Student({
    studentName,
    parentName,
    feeSubmissionDate,
    receiptPath: req.file.path,
  });

  try {
    await newStudent.save();
    res.status(201).json({ message: 'Student data submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save student data' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
