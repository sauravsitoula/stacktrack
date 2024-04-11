import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";
import "./Styles/Items.css";
// import AccommodationDetails from "./AccommodationDetailsModal";
import ItemDetailModal from "./ItemDetailModal";
import { Link } from "react-router-dom";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function Items() {
  //const classes = useStyles();
  const [items, setItems] = React.useState(null);
  const axios = useAxiosPrivate();

  React.useEffect(() => {
    axios.get("/items").then((response) => {
      setItems(response.data);
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
      <div className="topev">
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          component={Link}
          to="./CreateItemForm"
        >
          Create Item
        </Button>
      </div>
      <div className="cards">{toListItems}</div>
    </>
  );
}
