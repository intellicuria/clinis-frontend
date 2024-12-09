import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";

export type UserState = {
  id?: number | null;
  phone_number?: string;
  fullname?: string;
  status?: boolean;
  location?: string;
};

export const initialState: UserState = {
  id: null,
  phone_number: "",
  fullname: "",
  status: false,
  location: "",
};

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id ?? null;
      state.phone_number = action.payload.phone_number ?? "";
      state.fullname = action.payload.fullname ?? "";
      state.status = action.payload.status ?? false;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
  },
});

export const { setUser, setLocation } = userSlice.actions;
export default userSlice.reducer;
