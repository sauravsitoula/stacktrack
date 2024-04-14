import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Loader from "../commons/Loader/Loader";
import Modal from "../commons/Modal/Modal";
import "./CartPage.css"; // Import your CSS file for additional styling
import { update } from "firebase/database";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    axios
      .get("/carts")
      .then((response) => {
        if (response.data.cartItems.length == 0) {
          setModal({
            show: true,
            title: "Empty Cart",
            message: "No Items Added To Cart",
            type: "failure",
          });
        }
        setCartItems(response.data.cartItems);
        calculateTotal(response.data.cartItems);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        setModal({
          show: true,
          title: "Empty Cart",
          message: "No Items Added To Cart",
          type: "failure",
        });
      });
    setLoader(false);
  }, []);

  const updateBackend = async (items) => {
    setLoader(true);
    const itemList = items.map((item) => ({
      item_uuid: item.item_uuid,
      quantity: item.quantity,
    }));
    const payload = { cartItems: itemList };
    try {
      const updateCart = await axios.post("/carts", payload);
    } catch (error) {
      setLoader(false);
      setModal({
        show: true,
        title: "Error",
        message: "Error in Updating Cart",
        type: "failure",
      });
    }

    setLoader(false);
  };

  const checkoutItems = async () => {
    setLoader(true);
    try {
      const checkout = await axios.post("/carts/checkout");
    } catch (e) {
      setLoader(false);
      setModal({
        show: true,
        title: "Error",
        message: "Error in Checking Out",
        type: "failure",
      });
    }
    setLoader(false);
    navigate("/");
  };

  const calculateTotal = (items) => {
    const total = items?.reduce(
      (acc, item) => acc + item.quantity * item.item.price,
      0
    );
    setTotal(total);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    updateBackend(updatedItems);
  };

  const handleIncrement = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity < item.item.quantity) {
          const newQuantity = item.quantity + 1;
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    updateBackend(updatedItems);
  };

  const handleDecrement = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    updateBackend(updatedItems);
  };

  return (
    <div className="cart-page">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      ) : (
        ""
      )}
      <div className="cart-container">
        <h2>Your Cart</h2>
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th style={{ width: "200px" }}>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>{cartItem.item.name}</td>
                <td>${cartItem.item.price}</td>
                <td>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleDecrement(cartItem.id)}
                      >
                        -
                      </button>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      value={cartItem.quantity}
                      style={{ borderRadius: "8px", margin: "0px 2px 0px 2px" }}
                      //   onChange={(e) =>
                      //     handleChangeQuantity(
                      //       cartItem.id,
                      //       parseInt(e.target.value)
                      //     )
                      //   }
                      disabled
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleIncrement(cartItem.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td>${(cartItem.quantity * cartItem.item.price).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(cartItem.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bill-container">
        <div className="bill-holder">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>{cartItem.quantity + " x " + cartItem.item.name}</td>
                  <td>
                    ${(cartItem.quantity * cartItem.item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="star-holder">
            **************************************
          </div>
          <h3>Total: ${total.toFixed(2)}</h3>
          {cartItems.length > 0 ? (
            <button className="btn btn-primary" onClick={checkoutItems}>
              PROCEED TO CHECKOUT
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
