const mongoose = require('mongoose');

// Define the attendance schema
const attendanceSchema = new mongoose.Schema({
    date: { type: String, required: true },       // e.g., "2024-09-29"
    timeslot: { type: String, required: true },   // e.g., "09:00 AM - 10:00 AM"
    rollnoofstudentpresent: { type: [String], required: true },  // Array of roll numbers
}, { timestamps: true });

// Create the attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
