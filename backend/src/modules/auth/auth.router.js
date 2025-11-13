// src/modules/auth/auth.router.js
const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
const { verifyToken, authorizeRoles } = require("../../middlewares/authMiddleware");

// 🔹 Register
router.post("/register", controller.register);

// 🔹 Login
router.post("/login", controller.login);

// 🔹 Get Profile (token wajib)
router.get("/me", verifyToken, controller.getProfile);

// 🔹 Endpoint buat test role HELPER
router.get("/helper-only", verifyToken, authorizeRoles("HELPER"), (req, res) => {
  res.json({
    message: "Halo Helper!",
    user: req.user,
  });
});

// src/modules/auth/auth.router.js
router.get("/user-only", verifyToken, authorizeRoles("USER"), (req, res) => {
  res.json({ message: "Halo User!", user: req.user });
});
module.exports = router;
