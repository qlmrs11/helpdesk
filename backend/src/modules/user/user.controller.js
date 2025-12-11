const userService = require("./user.service");

// GET /me
exports.me = async (req, res) => {
  try {
    const user = await userService.getMe(req.user.id);
    res.json(user);
  } catch (err) {
    console.error("Error in /me:", err);
    res.status(500).json({ message: "Gagal mendapatkan data user" });
  }
};

// GET /helpers
exports.getHelpers = async (req, res) => {
  try {
    const helpers = await userService.getHelpers();
    res.json(helpers);
  } catch (err) {
    console.error("Error in /helpers:", err);
    res.status(500).json({ message: "Gagal mengambil data helper" });
  }
};

// GET /:id
exports.getById = async (req, res) => {
  try {
    const user = await userService.getById(parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in user detail:", err);
    res.status(500).json({ message: "Gagal mendapatkan user" });
  }
};
