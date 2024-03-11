import { AppDispatch, AppStore, store } from "@/redux/store";
import { RootState } from "./store";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => {
  const { reduxStore, persistor } = store(); // Assuming useStore is a hook returning the Redux store

  // Explicitly define the return type to match the expected structure
  const result: AppStore = {
    reduxStore,
    persistor,
  };

  return result;
};
