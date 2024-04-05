const express = require("express");
const router = express.Router();

const itemRoutes = require("./routes/item.routes");
const categoryRoutes = require("./routes/category.routes");
const cartRoutes = require("./routes/cart.routes");

router.use("/items", itemRoutes);
router.use("/categories", categoryRoutes);
router.use("/carts", cartRoutes);

module.exports = router;
