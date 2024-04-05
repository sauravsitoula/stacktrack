const categoryController = require("../controllers/category.controller");
const { validateRole } = require("../utils/authenticationHandler");

const express = require("express");

const router = express.Router();

router.post("/", validateRole(["admin"]), categoryController.createCategory);

router.get("/", validateRole(["admin"]), categoryController.getAllCategories);

module.exports = router;
