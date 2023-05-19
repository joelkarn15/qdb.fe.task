import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import settingsReducer from "./reducers/settings";

export const store = configureStore({
  reducer: {user: userReducer, settings: settingsReducer}
});
