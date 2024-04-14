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
              <NavBtnLink to="/user-profile">
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
        {auth?.token ? (
          <NavMenu>
            <NavLink to="/" activeStyle>
              Home
            </NavLink>
            {!auth?.user?.isAdmin && !auth?.user?.isSuperAdmin ? (
              <NavLink to="/cart" activeStyle>
                Cart
              </NavLink>
            ) : (
              <></>
            )}

            {auth?.user?.isSuperAdmin ? (
              <NavLink to="/add-admin" activeStyle>
                Add Admin
              </NavLink>
            ) : (
              <></>
            )}
          </NavMenu>
        ) : (
          <></>
        )}
      </Nav2>
    </>
  );
};

export default Navbar;
