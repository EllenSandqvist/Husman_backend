import express from "express";
import cors from "cors";
import recipesRouter from "./routes/recipes.js";

const app = express();

// CORS configuration
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-specific-url.com"]
    : ["http://localhost:5173", "https://your-specific-url.com"];
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
// Import routes
app.use("/api/recipes", recipesRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
