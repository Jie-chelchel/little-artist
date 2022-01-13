import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

const middlewear = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewear))
);

export default store;
