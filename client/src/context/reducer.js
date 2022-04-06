import { initalState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === "SET_IS_MEMBER") {
    if (state.registerState === "login") {
      return {
        ...state,
        registerState: "register",
      };
    } else {
      return {
        ...state,
        registerState: "login",
      };
    }
  }
  if (action.type === "SET_IS_RESET") {
    return {
      ...state,
      registerState: "reset",
    };
  }
  if (action.type === "TOGGLE_NAV") {
    return {
      ...state,
      showNav: !state.showNav,
    };
  }
  if (action.type === "SHOW_ALERT") {
    return {
      ...state,
      showAlert: true,
      alertText: action.payload.text,
      alertType: action.payload.type,
    };
  }
  if (action.type === "HIDE_ALERT") {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }

  if (action.type === "SETUP_USER") {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoggedIn: true,
      showAlert: true,
      alertText: "redirecting...",
      alertType: "success",
    };
  }
  if (action.type === "UPDATE_USER") {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === "LOGOUT_USER") {
    return {
      ...initalState,
      isLoggedIn: false,
      showAlert: false,
      alertText: "",
      alertType: "",
      user: null,
      token: null,
    };
  }
  if (action.type === "CHANGE_USER_ERROR") {
    return {
      ...state,
    };
  }
  if (action.type === "ADD_LIST_SUCCESS") {
    return {
      ...state,
      newUsers: [],
    };
  }
  if (action.type === "GET_LISTS") {
    return {
      ...state,
      lists: action.payload.lists,
      otherLists: action.payload.otherLists,
    };
  }
  if (action.type === "DELETE_LIST_BEGIN") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "DELETE_LIST_SUCCESS") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "DELETE_ITEM_BEGIN") {
    return {
      ...state,
      updateCard: true,
    };
  }
  if (action.type === "DELETE_ITEM_SUCCESS") {
    return {
      ...state,
      updateCard: false,
    };
  }
  if (action.type === "ADD_FRIEND_TO_LIST") {
    const { email, value } = action.payload;
    if (value === true) {
      return {
        ...state,
        newUsers: [...state.newUsers, email],
      };
    } else {
      const newUsersReduced = state.newUsers.filter((user) => user !== email);

      return {
        ...state,
        newUsers: newUsersReduced,
      };
    }
  }

  if (action.type === "EDIT_LIST") {
    const { items } = action.payload;
    const itemNames = items.map((item) => item.name);
    return {
      ...state,
      currentList: {
        items: itemNames,
        name: action.payload.title,
        id: action.payload.id,
      },
      isEditing: true,
    };
  }
  if (action.type === "UPDATE_LIST_BEGIN") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "UPDATE_LIST_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      isEditing: false,
      currentList: {
        items: "",
        name: "",
        id: "",
      },
      newUsers: [],
    };
  }
  if (action.type === "ADD_USER_BEGIN") {
    return {
      ...state,
      newUsers: [...state.newUsers, action.payload.email],
    };
  }

  if (action.type === "GET_REQUESTS") {
    return {
      ...state,
      requests: [...action.payload],
    };
  }
  if (action.type === "GET_FRIENDS") {
    return {
      ...state,
      friends: [...action.payload],
    };
  }
  if (action.type === "HANDLE_REQUEST_BEGIN") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "HANDLE_REQUEST_SUCCESS") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "DEL_FRIEND_BEGIN") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "DEL_FRIEND_SUCCESS") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "GET_ALL_DATA") {
    if (state.requests.length !== action.payload.requestsFormatted.length) {
      return {
        ...state,
        lists: action.payload.lists,
        otherLists: action.payload.otherLists,
        requests: action.payload.requestsFormatted,
        friends: action.payload.friendsFormatted,
        isNewRequests: true,
      };
    }
    return {
      ...state,
      lists: action.payload.lists,
      otherLists: action.payload.otherLists,
      requests: action.payload.requestsFormatted,
      friends: action.payload.friendsFormatted,
    };
  }
  if (action.type === "RESET_IS_NEW_REQUESTS") {
    return {
      ...state,
      isNewRequests: false,
    };
  }
  if (action.type === "RESET_IS_NEW_LISTS") {
    return {
      ...state,
      isNewLists: false,
    };
  }
  if (action.type === "UPDATE_PASSWORD_SUCCESS") {
    return {
      ...state,
      isPasswordReset: true,
      registerState: "login",
    };
  }
  if (action.type === "SAVE_TOKEN") {
    return {
      ...state,
      token: action.payload.token,
    };
  }
  if (action.type === "RESET_STATE") {
    return {
      ...state,
      isEditing: false,
    };
  }
};

export default reducer;
