import React from "react";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Wrapper from "../assets/wrappers/Request";
import { useAppContext } from "../context/appContext";

const Request = ({ email }) => {
  const { handleRequest } = useAppContext();
  return (
    <Wrapper>
      <li>
        <div className="request">
          {email}
          <div className="controlls">
            <AiOutlineCheckCircle
              className="accept"
              size={18}
              onClick={() => {
                handleRequest(email, true);
              }}
            />
            <AiOutlineCloseCircle
              className="deny"
              size={18}
              onClick={() => {
                handleRequest(email, false);
              }}
            />
          </div>
        </div>
      </li>
    </Wrapper>
  );
};

export default Request;
