import React from "react";
import { Wrapper } from "../assets/wrappers/Sidebar";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Collapse } from "@mui/material";
import { links } from "./links";
import { useAppContext } from "../context/appContext";
import MenueRow from "./MenueRow";

const Sidebar = () => {
  const { toggleNav, showNav, isNewRequests, resetSate } = useAppContext();
  return (
    <Wrapper>
      <Collapse
        in={!showNav}
        orientation="horizontal"
        collapsedSize="50px"
        className="sticky"
      >
        <div className="sidebarContainer">
          <button
            className={!showNav ? "close" : "open"}
            onClick={() => {
              toggleNav();
            }}
          >
            {showNav ? (
              <AiOutlineArrowRight size={30} />
            ) : (
              <AiOutlineArrowLeft size={30} />
            )}
          </button>
          <div className="menue">
            {links.map((link) => {
              return (
                <MenueRow
                  key={link.id}
                  to={link.to}
                  name={link.name}
                  icon={link.icon}
                  iconAlert={link.iconAlert}
                  isNewRequests={isNewRequests}
                  resetState={resetSate}
                />
              );
            })}
          </div>
        </div>
      </Collapse>
    </Wrapper>
  );
};

export default Sidebar;
