require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const fs = require("fs");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ensure data folder and file exists
const dataPath = path.join(__dirname, "data");
const usersPath = path.join(dataPath, "users.json");

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}
if (!fs.existsSync(usersPath)) {
  fs.writeFileSync(usersPath, "[]");
}

// Routes
// Note: Frontend proxy rewrites /api/users to /users
app.use("/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Smart User System (Local JSON Mode) is running...");
});

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен (ЛОКАЛЬНО): http://localhost:${PORT}`);
  console.log(`Данные хранятся в: /data/users.json`);
});
