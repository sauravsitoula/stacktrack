const itemRepository = require("../repositories/item.repository");
const categoryRepository = require("../repositories/category.repository");

module.exports.createItem = async (itemDetails) => {
  try {
    const alreadyExists = await itemRepository.getItemByName(itemDetails.name);
    if (alreadyExists)
      throw new Error(
        "Item with name '" + itemDetails.name + "' already exists"
      );
    const category = await categoryRepository.getCategoryById(
      itemDetails.category_uuid
    );
    if (!category) throw new Error("Category with given id does not exist");
    const item = await itemRepository.create(itemDetails);
    return item;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllItems = async (params) => {
  try {
    var category = params.category;
    if (category != null) {
      const res = await itemRepository.getAllItemsWithFilter({
        category_uuid: category,
      });
      return res;
    } else {
      const res = await itemRepository.getAllItems();
      return res;
    }
  } catch (error) {
    throw error;
  }
};

module.exports.getItemById = async (id) => {
  try {
    const item = await itemRepository.getItemById(id);
    return item;
  } catch (error) {
    throw error;
  }
};

module.exports.deleteItemById = async (id) => {
  try {
    const result = await itemRepository.deleteItemById(id);
    if (result === 0) throw new Error("No item with given ID found");
  } catch (error) {
    throw error;
  }
};

module.exports.updateItemById = async (id, itemDetails) => {
  try {
    const alreadyExists = await itemRepository.getItemByName(itemDetails.name);
    if (alreadyExists)
      throw new Error(
        "Item with name '" + itemDetails.name + "' already exists"
      );
    const category = await categoryRepository.getCategoryById(
      itemDetails.category_uuid
    );
    if (!category) throw new Error("Category with given id does not exist");
    const result = await itemRepository.updateItemById(id, itemDetails);
    if (result[0] !== 1) throw new Error("Item with given ID not found");
    else if (result[0] == 1) {
      const updatedItem = await itemRepository.getItemById(id);
      return updatedItem;
    }
  } catch (error) {
    throw error;
  }
};
