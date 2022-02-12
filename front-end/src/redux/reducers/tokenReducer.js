import * as actionTypes from "../constants/authConstants";

const token = "";

const tokenReducer = (state = token, action) => {
  switch (action.type) {
    case actionTypes.GET_TOKEN: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default tokenReducer;
