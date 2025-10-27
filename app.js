const express = require("express");
const mongoose = require("mongoose");
const Student = require("./studentModel");

const app = express();
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect("mongodb+srv://juttumanikanta52:TrkLsHSgqa%216xcw@dt.eexll2a.mongodb.net/studentdb?retryWrites=true&w=majority&appName=dt")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

/**
 * CREATE Student
 */
app.post("/students", async(req, res, next) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: "Student created", student });
    } catch (err) {
        next(err); // Pass to error handler
    }
});

/**
 * READ All Students
 */
app.get("/students", async(req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        next(err);
    }
});

/**
 * READ Student by ID
 */
app.get("/students/:id", async(req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
});

/**
 * UPDATE Student by ID
 */
app.put("/students/:id", async(req, res, next) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        );
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ message: "Student updated", student });
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE Student by ID
 */
app.delete("/students/:id", async(req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ message: "Student deleted" });
    } catch (err) {
        next(err);
    }
});

/**
 * ✅ Global Error Handler
 */
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: "Validation failed", details: err.errors });
    }

    if (err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));