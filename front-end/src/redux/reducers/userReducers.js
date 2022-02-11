import * as actionTypes from "../constants/userConstants";

const initialState = {
  user: [],
  isLoggedIn: false,
  isAdmin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case actionTypes.GET_USER: {
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
