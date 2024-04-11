import React from "react";
import {
  Nav1,
  Nav2,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navBarElements";
import useAuth from "../../hooks/useAuth";

const Navbar = (props) => {
  const { auth } = useAuth();

  return (
    <>
      <Nav1>
        <NavLink to="/">
          <img
            src="Images/stacktrack_logo.png"
            style={{ width: "153px", height: "77px" }}
            alt="Logo"
          />
        </NavLink>
        <Bars />
        <NavMenu>
          {auth.token ? (
            <NavLink to="/about" activeStyle>
              About
            </NavLink>
          ) : (
            <></>
          )}

          {auth.token ? (
            <>
              <NavBtnLink to="/userprofile">
                HI, {auth.user.userName}
              </NavBtnLink>
            </>
          ) : (
            <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
          )}
        </NavMenu>
      </Nav1>
      <Nav2>
        <Bars />
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/carts" activeStyle>
            Cart
          </NavLink>
        </NavMenu>
      </Nav2>
    </>
  );
};

export default Navbar;
