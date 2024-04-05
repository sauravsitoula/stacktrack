const cartRepository = require("../repositories/cart.repository");
const cartItemRepository = require("../repositories/cartItem.repository");

module.exports.addToCart = async (userId, cartDetails) => {
  try {
    var cart = await cartRepository.getCartByUserId(userId);
    if (!cart) cart = await cartRepository.create({ user_uuid: userId });
    cartItemRepository.deleteAllCartItemsByCartId(cart.uuid);
    cartDetails.cartItems.forEach((item) =>
      cartItemRepository.create({ ...item, cart_uuid: cart.uuid })
    );
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getCartByUserId = async (id) => {
  try {
    const cart = await cartRepository.getCartByUserId(id);
    if (!cart) throw new Error("No cart associated with user");
    const items = await cartItemRepository.getAllCartItemsByCartId(cart.uuid);
    return { cartDetails: cart, cartItems: items };
  } catch (error) {
    throw error;
  }
};

module.exports.deleteCartByUserId = async (id) => {
  try {
    const cart = await cartRepository.getCartByUserId(id);
    if (!cart) {
      throw new Error("No cart found associated with user");
    }
    await cartItemRepository.deleteAllCartItemsByCartId(cart.uuid);
    await cartRepository.deleteCartById(cart.uuid);
  } catch (error) {
    throw error;
  }
};
