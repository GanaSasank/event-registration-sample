import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Define Schema and Model
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { 
    type: String, 
    required: true, 
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Ensures only 10-digit numbers
      },
      message: "Phone number must be a 10-digit numeric value.",
    },
  },
  message: { type: String, required: true },
});

const Registration = mongoose.model("Registration", registrationSchema);

// API Route to Handle Form Submission
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number. It must be a 10-digit number." });
    }

    const newRegistration = new Registration({ name, email, phone, message });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form. Try again." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
