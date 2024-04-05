const cartRepository = require("../repositories/cart.repository");
const cartItemRepository = require("../repositories/cartItem.repository");
const itemRepository = require("../repositories/item.repository");

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
    throw error;
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

module.exports.verifyStockAvailability = async (items) => {
  try {
    for (const item of items) {
      var item_uuid = item.item_uuid;
      var toValidateItem = await itemRepository.getItemById(item_uuid);
      if (!toValidateItem) {
        throw new Error(
          "The item with id " + item_uuid + " is not available in the shop"
        );
      }
      if (item.quantity > toValidateItem.quantity) {
        throw new Error(
          "Item with id " +
            item_uuid +
            " is not available in requested quantity"
        );
      }
    }
  } catch (error) {
    throw error;
  }
};
