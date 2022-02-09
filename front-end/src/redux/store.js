import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import {
  getProductDetailsReducer,
  getProductsReducer,
} from "./reducers/productReducer";
import userReducer from "./reducers/userReducers";
import tokenReducer from "./reducers/tokenReducer";

const reducer = combineReducers({
  auth: userReducer,
  token: tokenReducer,
  cart: cartReducer,
  getProducts: getProductsReducer,
  getProductDetails: getProductDetailsReducer,
});

const middlewear = [thunk];

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
