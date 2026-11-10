const express = require("express");
const cors = require("cors");

const app = express();

// CORS configuration - allow only frontend origin
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Outsy API Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Errors thrown in any route end up here (Express 5 forwards async errors too)
app.use((err, req, res, next) => {
  // Bad input caught by Mongoose (schema rules, malformed ids, duplicate names)
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: "That record already exists" });
  }

  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

module.exports = app;
