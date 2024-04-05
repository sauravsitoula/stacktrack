const cartController = require("../controllers/cart.controller");
const { validateRole } = require("../utils/authenticationHandler");

const express = require("express");

const router = express.Router();
router.post("/", validateRole(["admin"]), cartController.addToCart);
router.get("/", validateRole(["admin"]), cartController.getCartByUserId);
router.delete("/", validateRole(["admin"]), cartController.deleteCartByUserId);

module.exports = router;
