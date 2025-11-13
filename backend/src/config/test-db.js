const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to MySQL!");
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
