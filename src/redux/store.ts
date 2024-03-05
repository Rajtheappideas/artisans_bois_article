import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import AuthSlice from "./AuthSlice";
import GetContentSlice from "./GetContentSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfing = {
  key: "auth",
  version: 9,
  storage,
};

const peristReducers = combineReducers({
  auth: persistReducer(authPersistConfing, AuthSlice),
  getcontent: GetContentSlice,
});

export const store = () => {
  return configureStore({
    reducer: { root: peristReducers },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const persistor = persistStore(store());

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
