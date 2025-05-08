import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/Reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  whitelist: ["auth"],
});

export default rootReducer;
