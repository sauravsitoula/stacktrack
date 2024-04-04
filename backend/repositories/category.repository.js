const { Categories } = require("../models");
module.exports.create = async (categoriesDetails) => {
  try {
    const categories = await Categories.create(categoriesDetails);
    return categories;
  } catch (error) {
    throw error;
  }
};

module.exports.getCategoryByName = async (name) => {
  try {
    const categories = await Categories.findOne({
      where: { name },
    });
    return categories;
  } catch (error) {
    throw error;
  }
};

module.exports.getAllCategories = async () => {
  try {
    const categories = await Categories.findAll();
    return categories;
  } catch (error) {
    throw error;
  }
};

module.exports.getCategoryById = async (id) => {
  try {
    const category = await Categories.findOne({
      where: { uuid: id },
    });
    return category;
  } catch (error) {
    throw error;
  }
};
