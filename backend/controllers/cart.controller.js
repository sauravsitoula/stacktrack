const service = require("../services/cart.service");

exports.addToCart = async (req, res, next) => {
  try {
    const cart = await service.addToCart(req.body);
    res.status(201).json({
      message: "Cart created successfully",
      cart: cart,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCartByUserId = async (req, res, next) => {
  try {
    const categories = await service.getCartByUserId(req.user.uuid);
    res.send(categories);
  } catch (error) {
    next(error);
  }
};

exports.deleteCartByUserId = async (req, res, next) => {
  try {
    await service.deleteCartByUserId(req.user.uuid);
  } catch (error) {
    next(error);
  }
};