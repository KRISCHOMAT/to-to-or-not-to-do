/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { ListCard } from "../../components";
import Wrapper from "../../assets/wrappers/Lists";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Collapse } from "@mui/material";

const Lists = () => {
  const {
    getAllData,
    lists,
    otherLists,
    isLoading,
    updateCard,
    resetIsNewLists,
  } = useAppContext();

  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    getAllData();
  }, [isLoading, updateCard]);

  return (
    <Wrapper>
      <h1 className="mainHeading">Your Lists</h1>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <div className="listContainer">
          {lists.map((list) => {
            return (
              <ListCard
                key={list._id}
                id={list._id}
                name={list.name}
                items={list.items}
              />
            );
          })}
        </div>
      )}
      <h4
        className="heading subHeading"
        onClick={() => {
          setShowItems(!showItems);
          resetIsNewLists();
        }}
      >
        Other Lists
        {!showItems ? (
          <GoTriangleDown className="arrow" size={25} />
        ) : (
          <GoTriangleUp className="arrow" size={25} />
        )}
      </h4>
      <Collapse in={showItems}>
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <div className="listContainer">
            {otherLists.length === 0
              ? "no other lists..."
              : otherLists.map((list) => {
                  return (
                    <ListCard
                      key={list._id}
                      id={list._id}
                      name={list.name}
                      items={list.items}
                    />
                  );
                })}
          </div>
        )}
      </Collapse>
    </Wrapper>
  );
};

export default Lists;
