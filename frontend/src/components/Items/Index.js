import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axiosNormal from "axios";
import Button from "@mui/material/Button";
import "./Styles/Items.css";
import ItemDetailModal from "./ItemDetailModal";
import { Link } from "react-router-dom";
import Loader from "../commons/Loader/Loader";
import Modal from "../commons/Modal/Modal";
import { Form, FormControl } from "react-bootstrap";
import SearchImageUploader from "../../utils/SearchImageUploader";
import { deleteFromFirebase } from "../../utils/UploadFirebase";
import useAuth from "../../hooks/useAuth";

export default function Items() {
  const [items, setItems] = React.useState(null);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const axios = useAxiosPrivate();
  const [query, setQuery] = useState("");
  const [displayReset, setDisplayReset] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);
  const [category_uuid, setCategory_uuid] = useState("");

  const { auth } = useAuth();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setLoader(true);
    setDisplayReset(true);
    if (query) {
      axios
        .get("/items/search?name=" + query)
        .then((response) => {
          setItems(response.data.items);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          setModal({
            show: true,
            title: "Search Error",
            message: error.response.data.message,
            type: "failure",
          });
        });
    }
    setLoader(false);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setLoader(true);
    setDisplayReset(false);
    setQuery("");
    setCategory_uuid("");
    axios
      .get("/items")
      .then((response) => {
        setItems(response.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        setModal({
          show: true,
          title: "Fetching Items Error",
          message: error.response.data.message,
          type: "failure",
        });
      });
  };

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
        setModal({
          show: true,
          title: "Fetching Items Error",
          message: error.response.data.message,
          type: "failure",
        });
      });
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        setModal({
          show: true,
          title: "Fetching Categories Error",
          message: error.response.data.message,
          type: "failure",
        });
      });
  }, []);

  const handleAddToCart = (item_uuid) => {
    setLoader(true);
    axios
      .post(`/carts/${item_uuid}`)
      .then((response) => {
        setLoader(false);
      })
      .catch((error) => {
        setModal({
          show: true,
          title: "Error",
          message: "Cannot Add Item to Cart",
          type: "failure",
        });
        setLoader(false);
      });
  };

  useEffect(() => {
    if (imageURL != null && imageURL != "") handleCallMLModel();
  }, [imageURL]);

  const handleCallMLModel = async () => {
    setLoader(true);

    const result = await axiosNormal.post("http://18.117.12.19:8000/predict", {
      image_url: imageURL,
    });

    deleteFromFirebase(imageRef);
    setQuery(result.data.label);
    setLoader(false);
  };

  const handleCategoryFilter = (uuid) => {
    axios
      .get("/items")
      .then((response) => {
        setItems(response.data);
        setLoader(false);
        const filteredData = response.data.filter(
          (item) => item.category_uuid === uuid
        );
        setItems(filteredData);
      })
      .catch((error) => {
        setLoader(false);
        setModal({
          show: true,
          title: "Fetching Items Error",
          message: error.response.data.message,
          type: "failure",
        });
      });
  };

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
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <ItemDetailModal id={data.uuid} setItems={setItems} />
            <button
              className="all-cart-page-button"
              onClick={() => handleAddToCart(data.uuid)}
            >
              Add to Cart
            </button>
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
      <Form
        inline
        style={{
          display: "flex",
          flexDirection: "row",
          width: "500px",
          position: "absolute",
          marginTop: "20px",
          marginLeft: "38%",
        }}
      >
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={query}
          onChange={handleInputChange}
        />
        <div>
          <SearchImageUploader
            setImageURL={setImageURL}
            setImageRef={setImageRef}
          ></SearchImageUploader>
        </div>
        <div>
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "blue",
              height: "45px",
              width: "100px",
              position: "relative",
              top: "0px",
              right: "30px",
              borderRadius: "5px",
            }}
          >
            Search
          </button>
        </div>
        {displayReset ? (
          <div>
            <button
              onClick={handleReset}
              style={{
                backgroundColor: "red",
                height: "45px",
                width: "100px",
                position: "relative",
                top: "0px",
                right: "20px",
                borderRadius: "5px",
              }}
            >
              Clear
            </button>
          </div>
        ) : (
          <></>
        )}
      </Form>
      <div className="topev">
        <select
          name="category_uuid"
          id="category_uuid"
          value={category_uuid}
          onChange={(e) => {
            setCategory_uuid(e.target.value);
            setDisplayReset(true);
            handleCategoryFilter(e.target.value);
          }}
        >
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option key={category.uuid} value={category.uuid}>
              {category.name}
            </option>
          ))}
        </select>
        {auth?.user?.isAdmin || auth?.user?.isSuperAdmin ? (
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
        ) : (
          <></>
        )}
      </div>
      <div className="cards">{toListItems}</div>
    </>
  );
}
