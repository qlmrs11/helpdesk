// src/modules/auth/auth.service.js
const prisma = require("../../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret123";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1d";

// REGISTER
exports.register = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) throw new Error("Email sudah terdaftar");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "USER",
      department: data.department || null,   // ⬅ SIMPAN DEPARTMENT
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
  };
};

// LOGIN
exports.login = async (data) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) throw new Error("User tidak ditemukan");

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error("Password salah");

  // ⬅ MASUKKAN DEPARTMENT KE JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      department: user.department,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  return {
    status: "success",
    message: "Login berhasil",
    data: { token, role: user.role, department: user.department },
  };
};

// GET PROFILE
exports.getProfile = async (authHeader) => {
  if (!authHeader) throw new Error("Token tidak ditemukan");

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,   // ⬅ RETURN DEPARTMENT
      },
    });

    if (!user) throw new Error("User tidak ditemukan");

    return { status: "success", data: user };
  } catch (err) {
    throw new Error("Token tidak valid");
  }
};
