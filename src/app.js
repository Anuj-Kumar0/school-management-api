require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(cors());
app.use(express.json());

db.query(`
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
  if (err) {
    console.log("Table creation error:", err);
  } else {
    console.log("Schools table ready");
  }
});

app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.send("School Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});