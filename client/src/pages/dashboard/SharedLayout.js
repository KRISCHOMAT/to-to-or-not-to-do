import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, Sidebar, MobileMenue } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <div className="main">
        <MobileMenue />
        <Sidebar />
        <div className="pages">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

export default SharedLayout;
