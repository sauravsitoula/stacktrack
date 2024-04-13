import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./Styles/ItemModal.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AccommodationDetails(props) {
  const [itemDetails, setItemDetails] = React.useState(null);

  const { auth } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const axios = useAxiosPrivate();

  React.useEffect(() => {
    axios.get(`/items/${props.id}`).then((response) => {
      setItemDetails(response.data);
    });
  }, []);

  if (!itemDetails) return null;

  return (
    <div>
      <button className="all-cart-page-button" onClick={handleOpen}>
        {" "}
        View Details
      </button>
      <Modal open={open} onClose={handleClose} id={props.id}>
        <Box sx={style}>
          <div className="parentA">
            <div className="item-detail-image-container">
              <img src={itemDetails.image_url} />
            </div>
            <div className="div1A">
              <div className="titleInfo">
                <h3>Name: {itemDetails.name}</h3>
              </div>
              <div className="titleInfo">
                <h3>{"Price: $" + itemDetails.price}</h3>
              </div>
              <div className="titleInfo">
                <h3>{"Quantity: $" + itemDetails.quantity}</h3>
              </div>
            </div>
            <div className="div2A">
              <div className="placeInfo">
                <h3 className="titleInfo"> Description</h3>
                <div className="titleDesc">{itemDetails.description}</div>
              </div>
            </div>

            {auth.user.isAdmin ? (
              <div className="div3A">
                <div className="edit-button">
                  <Link
                    to={"/update-item/" + props.id}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "black",
                        width: "200px",
                        height: "45px",
                        backgroundColor: "lightcoral",
                        borderRadius: "8px",
                        padding: "0px",
                      }}
                      class="editBtn"
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
