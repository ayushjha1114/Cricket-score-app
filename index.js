import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/match", matchRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
