import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Route imports
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import vendorRoutes from "./routes/vendor.js";
import userRoutes from "./routes/user.js";

/* ── Initialise app ── */
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ── Global middleware ── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ── API routes ── */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);

/* ── Health check ── */
app.get("/", (_req, res) => {
  res.json({ message: "Event Management System API is running." });
});

/* ── Error handler (must be last) ── */
app.use(errorHandler);

/* ── Start server ── */
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
