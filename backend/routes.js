const express = require("express");
const router = express.Router();

const itemRoutes = require("./routes/item.routes");

router.use("/items", itemRoutes);

module.exports = router;
