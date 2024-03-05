import { AppDispatch, AppStore } from "@/redux/store";
import { RootState } from "./store";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useStore, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
