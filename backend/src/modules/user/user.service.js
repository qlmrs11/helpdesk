const prisma = require("../../config/prisma");

// Ambil user login
exports.getMe = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      department: true,
      createdAt: true,
    },
  });
};

// Ambil semua helper
exports.getHelpers = async () => {
  return prisma.user.findMany({
    where: {
      role: "HELPER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      department: true,
      createdAt: true,
    },
  });
};

// Ambil user by ID
exports.getById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      department: true,
      createdAt: true,
    },
  });
};
