import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import AuthSlice from "./AuthSlice";
import GetContentSlice from "./GetContentSlice";
import CheckoutSlice from "./CheckoutSlice";

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
  checkout: CheckoutSlice,
});

export const store = () => {
  const reduxStore = configureStore({
    reducer: { root: peristReducers },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== "production",
  });

  const persistor: Persistor = persistStore(reduxStore);

  return { reduxStore, persistor };
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["reduxStore"]["getState"]>;
export type AppDispatch = AppStore["reduxStore"]["dispatch"];
