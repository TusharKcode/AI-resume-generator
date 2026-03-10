import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import db from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import resumeRoutes from "./routes/resumeRoutes.js"

dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/resume", resumeRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("AI resume generator backend is running.");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});