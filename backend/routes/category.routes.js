const categoryController = require("../controllers/category.controller");
const express = require("express");

const router = express.Router();
router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);

module.exports = router;
