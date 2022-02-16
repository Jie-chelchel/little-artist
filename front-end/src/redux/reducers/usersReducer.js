import * as actionTypes from "../constants/authConstants";

const users = [];

const usersReducer = (state = users, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default usersReducer;
