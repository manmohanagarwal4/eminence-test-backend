const { Router } = require("express");
const router = Router();
const userRoutes = require("../modules/user/routes/userRoutes");

router.use("/user", userRoutes);

module.exports = { router };