import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";
import "./Styles/Items.css";
import ItemDetailModal from "./ItemDetailModal";
import { Link } from "react-router-dom";
import Loader from "../commons/Loader/Loader";
import Modal from "../commons/Modal/Modal";

export default function Items() {
  const [items, setItems] = React.useState(null);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const axios = useAxiosPrivate();

  React.useEffect(() => {
    setLoader(true);
    axios
      .get("/items")
      .then((response) => {
        setItems(response.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  }, []);

  if (!items) return null;

  const toListItems = items.map((data) => {
    return (
      <div className="card" key={data.uuid}>
        <div className="card-image-holder">
          <img src={data.image_url} alt="myPic" className="card_img" />
        </div>

        <div className="card_info">
          <h2 className="item_name">Name: {data.name} </h2>

          <h3 className="item_price">Price: {"$" + data.price} </h3>
          <h3 className="item_quantity">Stock: {data.quantity} </h3>
          <div>
            <ItemDetailModal id={data.uuid} setItems={setItems} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
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
      <div className="topev">
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          component={Link}
          to="./create-item"
        >
          Create Item
        </Button>
      </div>
      <div className="cards">{toListItems}</div>
    </>
  );
}
