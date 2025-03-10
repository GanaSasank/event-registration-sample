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
  name: String,
  email: String,
  phone: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

// API Route to Handle Form Submission
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newRegistration = new Registration({ name, email, phone });
    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form. Try again." });
  }
});

// Simple Route for Testing
app.get("/", (req, res) => {
  res.send("Hello, Backend is running and connected to MongoDB!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
