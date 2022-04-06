import { useAppContext } from "../context/appContext";
import { Wrapper } from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { BiUserCircle } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false);

  const { user, logoutUser, toggleNav, isNewRequests } = useAppContext();
  return (
    <Wrapper>
      <div
        className="burgerContainer"
        onClick={() => {
          toggleNav();
        }}
      >
        <GiHamburgerMenu size={45} className="burger" />
        {isNewRequests && (
          <IoMdNotificationsOutline size={20} className="notification" />
        )}
      </div>
      <Logo />
      <div className="buttonContainer">
        <button
          className="btn userButton"
          type="button"
          onClick={() => {
            setIsDropDown(!isDropDown);
          }}
        >
          <BiUserCircle />
          <span className="userName">{user && user.name}</span>
          {!isDropDown ? <GoTriangleDown /> : <GoTriangleUp />}
        </button>
        <button
          className={
            isDropDown
              ? "btn btn-hipster logout showLogout"
              : "btn btn-hipster logout"
          }
          type="button"
          onClick={() => {
            logoutUser();
          }}
        >
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default Navbar;
