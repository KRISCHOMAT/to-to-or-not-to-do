import { Collapse } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../assets/wrappers/AddList";
import { Alert, FormRow, FormRowItems, FriendRow } from "../../components";
import { useAppContext } from "../../context/appContext";

const AddList = () => {
  const navigate = useNavigate();

  const initValues = {
    name: "",
    items: [""],
  };

  const { addList, updateList, isEditing, currentList, displayAlert, friends } =
    useAppContext();

  const [values, setValues] = useState(isEditing ? currentList : initValues);
  const [isAddUser, setIsAddUser] = useState(false);
  const handleClick = (e) => {
    const { name } = e.target;
    const { items } = values;
    if (name === "plus") {
      if (items.length < 4) {
        setValues((prev) => {
          return {
            ...prev,
            items: [...items, ""],
          };
        });
      }
    } else {
      if (items.length > 1) {
        const newItems = items.filter((item, index) => {
          return index < items.length - 1;
        });
        setValues((prev) => {
          return {
            ...prev,
            items: newItems,
          };
        });
      }
    }
  };

  const changeName = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const handleChange = (e) => {
    const { items } = values;
    const newItems = items.map((item, index) =>
      index === parseInt(e.target.id) ? e.target.value : item
    );
    setValues((prev) => {
      return {
        ...prev,
        items: newItems,
      };
    });
  };

  const saveList = () => {
    if (isEditing) {
      updateList(values);
      displayAlert("list updated", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      addList(values);
      displayAlert("list created", "success");
      setTimeout(() => {
        setValues(initValues);
      }, 500);
    }
    setIsAddUser(false);
  };

  const handleAddUser = () => {
    setIsAddUser(true);
  };

  return (
    <Wrapper>
      <h1 className="mainHeading">{isEditing ? "Edit List" : "Add List"}</h1>
      <FormRow
        type="text"
        name="Name"
        onChange={changeName}
        value={values.name}
      />
      <FormRowItems name="Items" onChange={handleChange} items={values.items} />
      <div className="setItems">
        <button
          name="plus"
          type="button"
          className="btn margin"
          onClick={handleClick}
        >
          +
        </button>
        <button
          name="minus"
          type="button"
          className="btn margin"
          onClick={handleClick}
        >
          -
        </button>
      </div>

      <Collapse in={isAddUser}>
        <div className="friends">
          <ul>
            {friends.map((friend, i) => {
              return (
                <FriendRow
                  email={friend.email}
                  name={friend.name}
                  key={i}
                  add={true}
                />
              );
            })}
          </ul>
        </div>
      </Collapse>
      <div className="buttonContainer">
        {!isAddUser && (
          <button
            type="button"
            className="btn margin"
            onClick={() => {
              handleAddUser();
            }}
          >
            add friends
          </button>
        )}

        <button
          type="button"
          className="btn margin"
          onClick={() => {
            saveList();
          }}
        >
          Save List
        </button>
        <Alert />
      </div>
    </Wrapper>
  );
};

export default AddList;
