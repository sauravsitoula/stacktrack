const service = require("../services/item.service");

exports.createItem = async (req, res, next) => {
  try {
    const item = await service.createItem(req.body);
    res.status(201).json({
      message: "Item created successfully",
      item: item,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const query = req.query;
    const items = await service.getAllItems(query);
    res.send(items);
  } catch (error) {
    next(error);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getItemById(id);
    res.send(item);
  } catch (error) {
    next(error);
  }
};

exports.deleteItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.deleteItemById(id);
    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    var udpatedItem = await service.updateItemById(id, req.body);
    res.send({
      message: "Item updated successfully",
      udpatedItem,
    });
  } catch (error) {
    next(error);
  }
};
