const express = require('express');
const mongoose = require('mongoose');
const Attendance = require('./attendencemodal'); // Import the attendance model
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");



// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: "*" }));
dotenv.config();



// Connect to MongoDB (Replace with your connection string)
mongoose.connect(process.env.STAGING_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// POST route to save attendance
app.post('/attendance', async (req, res) => {
    const { date, timeslot, rollnoofstudentpresent } = req.body;
    console.log(req.body);

    if (!date || !timeslot || !rollnoofstudentpresent) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newAttendance = new Attendance({
            date,
            timeslot,
            rollnoofstudentpresent,
        });

        await newAttendance.save();
        res.status(201).json({ message: 'Attendance saved successfully', data: newAttendance });
        console.log('Attendance saved successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error saving attendance', error });
    }
});

// GET route to retrieve attendance by date and timeslot
app.get('/attendance', async (req, res) => {
    const { date, timeslot } = req.query;

    if (!date || !timeslot) {
        return res.status(400).json({ message: 'Date and timeslot are required' });
    }

    try {
        const attendance = await Attendance.findOne({ date, timeslot });

        if (!attendance) {
            return res.status(404).json({ message: 'No attendance record found for the given date and timeslot' });
        }

        res.status(200).json({ data: attendance });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendance', error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
