// pathnya src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret123";

//VERIFY TOKEN
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  // standarisasi fotmat toker (bearer)
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Format token salah (gunakan Bearer <token>)" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    //Mapping manual (WAJIB)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      department: decoded.department || null, // default null bila tidak ada
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
};

//ROLE AUTHORIZATION
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User belum terautentikasi" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Akses ditolak: role ${req.user.role} tidak memiliki izin`,
      });
    }

    next();
  };
};
