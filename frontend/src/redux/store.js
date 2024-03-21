import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import navigateReducer from "./navigateSlice";
import postReducer from "./postSlice";
import userReducer from "./userSlice";
import commentReducer from "./commentSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "user"],
};
const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  nav: navigateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logoutSuccess") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
