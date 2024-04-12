import React, { useState, useEffect } from "react";
import "./CreateItem.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../../utils/ImageUploader";
import Loader from "../../commons/Loader/Loader";
import Modal from "../../commons/Modal/Modal";

const CreateItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category_uuid: "",
    quantity: "",
    description: "",
    image_url: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  }, []);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // name validation
    if (!formData?.name?.trim()) {
      isValid = false;
      newErrors.name = "Item name is required";
    }

    // price validation
    if (!formData?.price?.trim()) {
      isValid = false;
      newErrors.price = "Item price is required";
    } else if (!/^(?!0+(\.0+)?$)\d+(\.\d+)?$/.test(formData.price)) {
      isValid = false;
      newErrors.price = "Invalid price value";
    }

    //category validation
    if (!formData?.category_uuid?.trim()) {
      isValid = false;
      newErrors.category_uuid = "Select a category";
    }

    //quantity validation
    if (!formData?.quantity?.trim()) {
      isValid = false;
      newErrors.quantity = "Item quantity is required";
    } else if (!/^\d+$/.test(formData.quantity)) {
      isValid = false;
      newErrors.quantity = "Invalid quantity value";
    }

    //description validation
    if (!formData?.description?.trim()) {
      isValid = false;
      newErrors.description = "Item description is required";
    }

    if (isValid) return null;
    return newErrors;
  };

  const handleChange = (e) => {
    setFormErrors({});
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors) {
      setFormErrors(errors);
    } else {
      setLoader(true);
      const createItemPayload = { ...formData };
      if (!createItemPayload.image_url)
        createItemPayload.image_url =
          "https://firebasestorage.googleapis.com/v0/b/stacktrack-cd3f7.appspot.com/o/default_image.png?alt=media&token=e43ace3f-d48a-4dda-ae51-ddaa3724d316";
      axios
        .post("/items", createItemPayload)
        .then((response) => {
          setModal({
            show: true,
            title: "Created",
            message: "Item Created Successfully",
            type: "success",
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="form-container item-create-form">
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
      <h2>Add New Item</h2>
      <ImageUploader setParentState={setFormData}></ImageUploader>
      {formData.image_url ? (
        <>
          <div style={{ fontWeight: "bold" }}>Uploaded Image:</div>
          <div style={{ position: "relative" }}>
            <img
              style={{
                width: "100%",
                maxWidth: "200px",
                marginTop: "10px",
                borderRadius: "4px",
              }}
              src={formData.image_url}
              alt="display image"
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="category_uuid">Category</label>
        <select
          name="category_uuid"
          id="category_uuid"
          value={formData.category_uuid}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.uuid} value={category.uuid}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="form-error-message mx-5">
          {formErrors.category_uuid}
        </div>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="form-error-message mx-5">{formErrors.name}</div>

        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Item Price"
          value={formData.price}
          onChange={handleChange}
        />
        <div className="form-error-message mx-5">{formErrors.price}</div>

        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Item Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <div className="form-error-message mx-5">{formErrors.quantity}</div>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="List the description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="form-error-message mx-5">{formErrors.description}</div>

        <div className="buttons">
          <button type="submit">Create</button>
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItemForm;
