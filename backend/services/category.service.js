const categoryRepository = require("../repositories/category.repository");

module.exports.createCategory = async (categoryDetails) => {
  try {
    const alreadyExists = await categoryRepository.getCategoryByName(
      categoryDetails.name
    );
    if (alreadyExists)
      throw new Error(
        "Category with name '" + categoryDetails.name + "' already exists"
      );
    const category = await categoryRepository.create(categoryDetails);
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllCategories = async (params) => {
  try {
    const res = await categoryRepository.getAllCategories();
    return res;
  } catch (error) {
    throw error;
  }
};
