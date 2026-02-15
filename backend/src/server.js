require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const adminRoutes = require("./routes/adminRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express(); // ✅ HARUS sebelum app.use()

// middleware
app.use(
  cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "rahasia-banget",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

// routes
app.use("/api/data", dataRoutes);
app.use("/api/admin", adminRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend jalan 🚀");
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
