/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCircle, BiCheckCircle } from "react-icons/bi";
import { useAppContext } from "../context/appContext";

const FriendRow = ({ email, name, add }) => {
  const { addFriendToList, deleteFriend } = useAppContext();
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    if (add) {
      setIsChecked(!isChecked);
    } else {
      deleteFriend(email);
    }
  };

  useEffect(() => {
    if (add) {
      addFriendToList(email, isChecked);
    }
  }, [isChecked]);

  return (
    <>
      <li>
        <div className="infoContainer">
          <span>name: {name} </span>
          <span>email: {email} </span>
        </div>
        {add ? (
          isChecked ? (
            <BiCheckCircle
              size={20}
              name="add"
              className="check"
              onClick={handleClick}
            />
          ) : (
            <BiCircle
              size={20}
              name="delete"
              className="check"
              onClick={handleClick}
            />
          )
        ) : (
          <AiOutlineCloseCircle
            className="delete"
            size={20}
            onClick={handleClick}
          />
        )}
      </li>
      <hr />
    </>
  );
};

export default FriendRow;
