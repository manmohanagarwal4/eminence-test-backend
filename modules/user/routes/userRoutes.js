const userRoutes = require("express").Router();
const { jwtVerify } = require("../../../helper/authHandler");
const { register, userLogin, logoutUser, productList } = require("../controller/userController");

userRoutes.post("/register", register);
userRoutes.post("/login", userLogin);
userRoutes.put("/logout", jwtVerify, logoutUser);
userRoutes.get("/product-list", jwtVerify, productList);

module.exports = userRoutes;