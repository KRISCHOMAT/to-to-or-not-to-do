import React from "react";
import { Wrapper } from "../assets/wrappers/MobileMenue";
import { useAppContext } from "../context/appContext";
import { Collapse } from "@mui/material";
import { NavLink } from "react-router-dom";
import { links } from "./links";

const MobileMenue = () => {
  const { showNav, toggleNav, isNewRequests } = useAppContext();

  return (
    <Wrapper>
      <Collapse in={showNav} orientation="vertical">
        <div className="mobileMenue">
          <div className="linkContainer">
            {links.map((link) => {
              return (
                <NavLink
                  key={link.id}
                  className="link"
                  to={link.to}
                  onClick={toggleNav}
                >
                  {isNewRequests && link.name === "Friends" && link.iconAlert}
                  {!isNewRequests && link.name === "Friends" && link.icon}
                  {link.name !== "Friends" && link.icon}
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </Collapse>
    </Wrapper>
  );
};

export default MobileMenue;
