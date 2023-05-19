import {createSlice} from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "user",
  initialState: {isMobile: null},
  reducers: {
    setIsMobile: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.isMobile = action.payload;
    }
  }
});

export const {setIsMobile} = settingsSlice.actions;
export default settingsSlice.reducer;
