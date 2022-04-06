/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Wrapper from "../../assets/wrappers/Friends";
import { Alert, FormRow, Request } from "../../components";
import { useAppContext } from "../../context/appContext";
import { FriendRow } from "../../components";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { Collapse } from "@mui/material";

const Friends = () => {
  const {
    friends,
    requests,
    getAllData,
    isLoading,
    addFriend,
    displayAlert,
    isNewRequests,
    resetIsNewRequests,
  } = useAppContext();
  const [newFriend, setNewFriend] = useState("");
  const [isShowFriends, setIsShowFriends] = useState(false);
  const [isShowRequests, setIsShowRequests] = useState(false);

  const handleChange = (e) => {
    setNewFriend(e.target.value);
  };

  const handleClick = () => {
    addFriend(newFriend);
    displayAlert("sending request", "success");
    setNewFriend("");
  };

  useEffect(() => {
    getAllData();
  }, [isLoading]);

  const handleShowRequests = () => {
    setIsShowRequests(!isShowRequests);
    resetIsNewRequests();
  };

  return (
    <Wrapper>
      <h1 className="mainHeading">Friends</h1>
      <div className="addFriend">
        <FormRow
          type="email"
          name="email"
          autoComplete="off"
          onChange={handleChange}
          value={newFriend}
        ></FormRow>
        <button className="btn" onClick={handleClick}>
          add Friend
        </button>
        <Alert />
      </div>

      <h4 className="subHeading">
        your friends
        {!isShowFriends ? (
          <GoTriangleDown
            className="arrow"
            onClick={() => {
              setIsShowFriends(!isShowFriends);
            }}
          />
        ) : (
          <GoTriangleUp
            className="arrow"
            onClick={() => {
              setIsShowFriends(!isShowFriends);
            }}
          />
        )}
      </h4>
      <Collapse in={isShowFriends}>
        <div className="friends">
          <ul>
            {friends.map((friend, i) => {
              return (
                <FriendRow email={friend.email} name={friend.name} key={i} />
              );
            })}
          </ul>
        </div>
      </Collapse>

      <h4
        className="subHeading"
        onClick={() => {
          handleShowRequests();
        }}
      >
        requests
        {!isShowRequests ? (
          <GoTriangleDown
            className="arrow"
            style={
              isNewRequests ? { color: "var(--red-dark)" } : { color: "white" }
            }
          />
        ) : (
          <GoTriangleUp
            className="arrow"
            onClick={() => {
              handleShowRequests();
            }}
          />
        )}
      </h4>
      <Collapse in={isShowRequests}>
        {requests.length === 0
          ? "no requests..."
          : requests.map((request, i) => {
              return <Request email={request.email} key={i} />;
            })}
      </Collapse>
    </Wrapper>
  );
};

export default Friends;
