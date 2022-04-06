import React, { useState } from "react";
import { BiCircle, BiCheckCircle } from "react-icons/bi";
import { useAppContext } from "../context/appContext";

const ItemCheck = ({ item, id }) => {
  const { deleteItem } = useAppContext();

  const [isMouseOver, setIsMouseOver] = useState(true);

  const handleMouse = () => {
    setIsMouseOver(!isMouseOver);
  };
  return (
    <>
      {isMouseOver ? (
        <BiCircle onMouseEnter={handleMouse} className="check" size={30} />
      ) : (
        <BiCheckCircle
          onMouseLeave={handleMouse}
          className="checked"
          size={30}
          onClick={() => {
            deleteItem(item, id);
          }}
        />
      )}
    </>
  );
};

export default ItemCheck;
