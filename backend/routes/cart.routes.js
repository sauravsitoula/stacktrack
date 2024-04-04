const cartController = require("../controllers/cart.controller");
const express = require("express");

const router = express.Router();
router.post("/", cartController.addToCart);
router.get("/", cartController.getCartByUserId);
router.delete("/", cartController.deleteCartById);

module.exports = router;
