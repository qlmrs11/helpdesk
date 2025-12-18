const router = require("express").Router();
const userController = require("./user.controller");
const { verifyToken, authorizeRoles } = require("../../middlewares/authMiddleware");

router.get("/me", verifyToken, userController.me);
router.get("/helpers", verifyToken, userController.getHelpers);
router.get("/:id", verifyToken, userController.getById);

module.exports = router;
