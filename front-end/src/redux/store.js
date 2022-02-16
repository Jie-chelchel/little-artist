import { createStore, combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import {
  getProductDetailsReducer,
  getProductsReducer,
} from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import tokenReducer from "./reducers/tokenReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  auth: userReducer,
  token: tokenReducer,
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
  users: usersReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
