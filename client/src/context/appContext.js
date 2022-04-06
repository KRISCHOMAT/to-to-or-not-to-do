/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initalState = {
  isLoading: false,
  updateCard: false,
  isMember: false,
  isPasswordReset: false,
  registerState: "register",
  showNav: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token ? token : "",
  lists: [],
  otherLists: [],
  isEditing: false,
  currentList: { items: "", title: "", id: "" },
  newUsers: [],
  friends: [],
  requests: [],
  isNewRequests: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  //auth
  const authFetch = axios.create({
    baseURL: "/api/",
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = "Bearer " + state.token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response;
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (text, type) => {
    dispatch({ type: "SHOW_ALERT", payload: { text, type } });
    setTimeout(() => {
      hideAlert();
    }, 2000);
  };

  const hideAlert = () => {
    dispatch({ type: "HIDE_ALERT" });
  };

  const setIsMember = () => {
    dispatch({ type: "SET_IS_MEMBER" });
  };

  const setIsReset = () => {
    dispatch({ type: "SET_IS_RESET" });
  };

  const toggleNav = () => {
    dispatch({ type: "TOGGLE_NAV" });
  };

  const saveUserToLocalStorage = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const deleteUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const setupUser = async (endPoint, currentUser) => {
    try {
      const response = await authFetch.post("auth/" + endPoint, currentUser);
      const { user, token } = response.data;
      dispatch({ type: "SETUP_USER", payload: { user, token } });
      saveUserToLocalStorage(user, token);
      setTimeout(() => {
        hideAlert();
      }, 2000);
    } catch (error) {
      const msg = error.response.data.msg;
      displayAlert(msg, "danger");
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await authFetch.post("auth/reset-password", { email });
      const msg = response.data.msg;
      displayAlert(msg, "success");
    } catch (error) {
      const msg = error.response.data.msg;
      displayAlert(msg, "danger");
    }
  };

  const updateUser = async (currentUser) => {
    if (!currentUser.name || !currentUser.email) {
      displayAlert("please provide all values", "danger");
    } else {
      try {
        const response = await authFetch.patch("auth/update-user", currentUser);
        const { user, token } = response.data;
        dispatch({ type: "UPDATE_USER", payload: { user, token } });
        saveUserToLocalStorage(user, token);
        setTimeout(() => {
          hideAlert();
        }, 2000);
      } catch (error) {
        const msg = error.response.data.msg;
        if (error.response.status !== 401) {
          displayAlert(msg, "danger");
        }
      }
    }
  };

  const updatePassword = async (passwords) => {
    const { password } = passwords;
    if (!passwords.password || !passwords.repeat) {
      displayAlert("provide values", "danger");
      return;
    } else if (passwords.password !== passwords.repeat) {
      displayAlert("not equal", "danger");
      return;
    }
    try {
      const response = await authFetch.post("auth/update-password", {
        password,
      });
      dispatch({ type: "UPDATE_PASSWORD_SUCCESS" });
      const msg = response.data.msg;
      displayAlert(msg, "success");
    } catch (error) {
      displayAlert(error.data.msg, "danger");
    }
  };

  const saveToken = (token) => {
    dispatch({ type: "SAVE_TOKEN", payload: { token } });
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    deleteUserFromLocalStorage();
  };

  const addList = async (values) => {
    const data = {
      list: values,
      users: state.newUsers,
    };

    try {
      await authFetch.post("list/add-list", data);
      dispatch({ type: "ADD_LIST_SUCCESS" });
    } catch (error) {
      logoutUser();
    }
  };

  const updateList = async (values) => {
    const data = {
      values: values,
      users: state.newUsers,
    };
    dispatch({ type: "UPDATE_LIST_BEGIN" });
    try {
      await authFetch.patch("list/update-list", data);
      setTimeout(() => {
        dispatch({ type: "UPDATE_LIST_SUCCESS" });
      }, 1000);
    } catch (error) {
      logoutUser();
    }
  };

  const deleteList = async (id) => {
    dispatch({ type: "DELETE_LIST_BEGIN" });
    try {
      await authFetch.delete("list/del-list", { data: { id } });
      dispatch({ type: "DELETE_LIST_SUCCESS" });
    } catch (error) {
      logoutUser();
    }
  };

  const deleteItem = async (item, id) => {
    dispatch({ type: "DELETE_ITEM_BEGIN" });
    try {
      await authFetch.patch("list/del-item", {
        id,
        item,
      });
      dispatch({ type: "DELETE_ITEM_SUCCESS" });
    } catch (error) {
      logoutUser();
    }
  };

  const editList = (items, title, id) => {
    dispatch({ type: "EDIT_LIST", payload: { items, title, id } });
  };

  const addFriendToList = (email, value) => {
    dispatch({ type: "ADD_FRIEND_TO_LIST", payload: { email, value } });
  };

  const addFriend = async (email) => {
    try {
      await authFetch.post("list/add-friend", { email });
    } catch (error) {
      const msg = error.response.data.msg;
      displayAlert(msg, "danger");
    }
  };

  const deleteFriend = async (email) => {
    try {
      dispatch({ type: "DEL_FRIEND_BEGIN" });
      await authFetch.patch("list/del-friend", { email });
      dispatch({ type: "DEL_FRIEND_SUCCESS" });
    } catch (error) {
      logoutUser();
    }
  };

  const handleRequest = async (email, type) => {
    try {
      dispatch({ type: "HANDLE_REQUEST_BEGIN" });
      await authFetch.post("list/handle-request", { email, type });
      dispatch({ type: "HANDLE_REQUEST_SUCCESS" });
    } catch (error) {
      logoutUser();
    }
  };

  const getAllData = async () => {
    try {
      const response = await authFetch.get("/list/get-all-data");
      dispatch({ type: "GET_ALL_DATA", payload: response.data });
    } catch (error) {
      logoutUser();
    }
  };

  const resetIsNewRequests = () => {
    dispatch({ type: "RESET_IS_NEW_REQUESTS" });
  };

  const resetIsNewLists = () => {
    dispatch({ type: "RESET_IS_NEW_LISTS" });
  };

  const resetState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  useEffect(() => {
    if (state.user) {
      const interval = setInterval(() => {
        getAllData();
      }, 5000);
      return () => clearInterval(interval);
    }
  });

  return (
    <AppContext.Provider
      value={{
        ...state,
        getAllData,
        resetState,
        saveToken,
        deleteFriend,
        updateList,
        editList,
        setupUser,
        logoutUser,
        displayAlert,
        setIsMember,
        toggleNav,
        updateUser,
        updatePassword,
        addList,
        deleteList,
        deleteItem,
        addFriend,
        handleRequest,
        addFriendToList,
        resetIsNewRequests,
        setIsReset,
        resetPassword,
        resetIsNewLists,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initalState };
