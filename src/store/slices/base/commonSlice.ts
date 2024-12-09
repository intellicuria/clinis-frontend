import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";

export type MessageTypes = "success" | "danger" | "warning" | "info";

interface currentIDandName {
  workspace: { name: string; id: string };
  case: { name: string; id: string };
  visit: { name: string; id: string };
}

export type CommonState = {
  currentRouteKey: string;
  currentIDandName: currentIDandName;
  isShowErrorMessage: { status: boolean; message: string; type: MessageTypes };
  isOnlineStatus: boolean;
  isChanging: boolean;
};

export const initialState: CommonState = {
  currentRouteKey: "",
  currentIDandName: {
    workspace: { name: "", id: "" },
    case: { name: "", id: "" },
    visit: { name: "", id: "" },
  },
  isShowErrorMessage: { status: false, message: "", type: "success" },
  isOnlineStatus: typeof navigator !== "undefined" && navigator.onLine,
  isChanging: false,
};

export const commonSlice = createSlice({
  name: `${SLICE_BASE_NAME}/common`,
  initialState,
  reducers: {
    setShowErrorMessage: (state, action) => {
      console.log(action.payload);
      state.isShowErrorMessage = action.payload;
    },
    setOnlineStatus: (state, action) => {
      console.log(action.payload);
      state.isOnlineStatus = action.payload;
    },
    setIsChanging: (state, action) => {
      console.log(action.payload);
      state.isChanging = action.payload;
    },
    setCurrentRouteKey: (state, action: PayloadAction<string>) => {
      state.currentRouteKey = action.payload;
    },
    setCurrentWorkspaceCaseVisit: (state, action) => {
      state.currentIDandName = {
        ...state.currentIDandName,
        ...action.payload,
      };
    },
  },
});

export const {
  setCurrentRouteKey,
  setCurrentWorkspaceCaseVisit,
  setShowErrorMessage,
  setOnlineStatus,
  setIsChanging,
} = commonSlice.actions;

export default commonSlice.reducer;
