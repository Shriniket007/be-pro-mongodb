import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    userSignOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUserInfo, userSignOut } = userSlice.actions;
export default userSlice.reducer;
//changes
