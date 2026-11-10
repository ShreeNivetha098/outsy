const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const planRoutes = require("./routes/planRoutes");


dotenv.config();
connectDB();

const app = express();

// CORS configuration - allow only frontend origin
const corsOptions = {
  origin: "http://localhost:3000", // React frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you need cookies/auth
};

app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Outsy API Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});