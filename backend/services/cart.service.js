const cartRepository = require("../repositories/cart.repository");
const cartItemRepository = require("../repositories/cartItem.repository");

module.exports.addToCart = async (cartDetails) => {
  try {
    const cart = await cartRepository.getCartByUserId(req.user.uuid);
    if (!cart) cart = await cartRepository.create({ user_uuid: req.user.uuid });
    cartItemRepository.deleteAllCartItemsByCartId(cart.uuid);
    cartDetails.cartItems.forEach((item) => cartItemRepository.create(item));
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getCartByUserId = async (id) => {
  try {
    const cart = await cartRepository.getCartByUserId(id);
    const items = await cartItemRepository.getAllCartItemsByCartId(cart.uuid);
    return { ...cart, cartItems: items };
  } catch (error) {
    throw error;
  }
};

module.exports.deleteCartByUserId = async () => {
  try {
    const cart = await cartRepository.getCartByUserId();
    if (!cart) {
      throw new Error("No cart found associated with user");
    }
    await cartItemRepository.deleteAllCartItemsByCartId(cart.uuid);
    await cartRepository.deleteCartById(cart.uuid);
  } catch (error) {
    throw error;
  }
};
