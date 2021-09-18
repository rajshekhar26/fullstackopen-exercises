import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

export const setExistingUser = () => {
  const blogAppUser = window.localStorage.getItem("blogAppUser");

  if (blogAppUser) {
    const user = JSON.parse(blogAppUser);
    blogService.setToken(user.token);

    return {
      type: "SET_USER",
      payload: user,
    };
  }
};

export const setUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch({
        type: "SET_USER",
        payload: user,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      dispatch(setNotification(`${user.name} logged in`, 5));
    } catch (err) {
      console.log(err.response);
      dispatch(setNotification("wrong username or password", 5, "error"));
    }
  };
};

export const removeUser = () => {
  window.localStorage.removeItem("blogAppUser");
  return {
    type: "SET_USER",
    payload: null,
  };
};

export default userReducer;
