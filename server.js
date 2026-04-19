import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";

import registerRoute from "./routes/registerRoute.js";
import contactRoute from "./routes/contactRoute.js";
import jobRoute from "./routes/jobRoute.js";
import meetingRoute from "./routes/meetingRoute.js";

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files (VERY IMPORTANT for resumes)
app.use("/uploads", express.static("uploads"));

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   ROUTES
========================= */
app.use("/api", registerRoute);
app.use("/api", contactRoute);
app.use("/api", jobRoute);
app.use("/api", meetingRoute);

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

/* =========================
   SERVER
========================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
