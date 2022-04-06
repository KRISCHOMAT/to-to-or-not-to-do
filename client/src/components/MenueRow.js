import React from "react";
import { NavLink } from "react-router-dom";

const MenueRow = ({ to, icon, iconAlert, name, isNewRequests }) => {
  return (
    <NavLink to={to} className="link">
      {isNewRequests && name === "Friends" && iconAlert}
      {!isNewRequests && name === "Friends" && icon}
      {name !== "Friends" && icon}
      {name}
    </NavLink>
  );
};

export default MenueRow;
