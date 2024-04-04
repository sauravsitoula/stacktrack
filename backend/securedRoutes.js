const express = require("express");
const router = express.Router();

const itemRoutes = require("./routes/item.routes");
const categoryRoutes = require("./routes/category.routes");

router.use("/items", itemRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
