const service = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json({
      message: "Category created successfully",
      category: category,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await service.getAllCategories();
    res.send(categories);
  } catch (error) {
    next(error);
  }
};
