require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.send("School Management API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});