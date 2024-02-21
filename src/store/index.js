import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import loadingPage from "./features/loadingPage";
import openModalLogin from "./features/openModalLogin";

const reducers = combineReducers({
  loadingPage,
  openModalLogin,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loadingPage"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
