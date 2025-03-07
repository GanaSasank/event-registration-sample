require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route testing sample
app.get( "/", (req,res) => 
    {
            res.send("Hello, I am sample server for testing");
    }
);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in PORT ${PORT}`));