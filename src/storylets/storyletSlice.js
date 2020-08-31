/** Configuration file for app state regarding available storylets */

import { createSlice } from '@reduxjs/toolkit';

export const storyletSlice = createSlice({
  name: 'storylets',
  initialState: {},
  reducers: {
    setStorylets: (state, action) => action.payload,
  },
});

export const { setStorylets } = storyletSlice.actions;

export const selectStorylets = state => state.storylets;

export default storyletSlice.reducer;
