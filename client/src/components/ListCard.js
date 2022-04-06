import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ListCard";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { BiEdit } from "react-icons/bi";
import { Collapse } from "@mui/material";
import ItemCheck from "./ItemCheck";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

const List = ({ name, items, id }) => {
  const { deleteList, editList } = useAppContext();

  const [showItems, setShowItems] = useState(false);

  return (
    <Wrapper>
      <AiOutlineCloseCircle
        className="delete"
        onClick={() => {
          deleteList(id);
        }}
      />

      <h4 className="heading">
        {name}
        {!showItems ? (
          <GoTriangleDown
            className="arrow"
            onClick={() => {
              setShowItems(!showItems);
            }}
          />
        ) : (
          <GoTriangleUp
            className="arrow"
            onClick={() => {
              setShowItems(!showItems);
            }}
          />
        )}
      </h4>
      <Collapse in={showItems}>
        <ul>
          {items.map((item, i) => {
            return (
              <li key={i} className="itemRow">
                {item.name}
                <ItemCheck item={item} id={id} />
              </li>
            );
          })}
        </ul>
        <Link to="../add-list">
          <BiEdit
            size={32}
            className="edit"
            onClick={() => {
              editList(items, name, id);
            }}
          />
        </Link>
      </Collapse>
    </Wrapper>
  );
};

export default List;
