// studentModel.js
const mongoose = require("mongoose");

// Define schema with validation
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Age must be at least 18"],
        max: [30, "Age must not exceed 30"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    branch: {
        type: String,
        required: [true, "Branch is required"]
    },
    rollNo: {
        type: Number,
        unique: true,
        required: [true, "Roll number is required"]
    }
});

// Create model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;