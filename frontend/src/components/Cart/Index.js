import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Loader from "../commons/Loader/Loader";
import Modal from "../commons/Modal/Modal";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("insdie useeffect");
    axios.get("/carts").then((response) => {
      setCartItems(response.data.cartItems);
      calculateTotal(response.data.cartItems);
    });
  }, []);

  const calculateTotal = (items) => {
    const total = items?.reduce(
      (acc, item) => acc + item.quantity * item.item.price,
      0
    );
    setTotal(total);
  };

  const handleRemoveItem = (itemId) => {
    // Logic to remove item from cart
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    // Make an API call to update the backend
  };

  const handleChangeQuantity = (itemId, quantity) => {
    // Logic to change quantity of the item
    const updatedItems = cartItems?.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    // Make an API call to update the backend
  };

  return (
    <div>
      {/* <h1>Your Cart</h1>
      <div>
        {cartItems?.map((cartItem) => (
          <div key={cartItem.id}>
            <span>{cartItem.item.name}</span>
            <span>${cartItem.item.price}</span>
            <input
              type="number"
              value={cartItem.quantity}
              onChange={(e) =>
                handleChangeQuantity(cartItem.id, parseInt(e.target.value))
              }
            />
            <span>${(cartItem.quantity * cartItem.item.price).toFixed(2)}</span>
            <button onClick={() => handleRemoveItem(cartItem.id)}>X</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Cart totals</h2>
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <button>PROCEED TO CHECKOUT</button>
      </div> */}
    </div>
  );
};

export default CartPage;
