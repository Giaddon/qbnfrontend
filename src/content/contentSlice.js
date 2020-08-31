/** Configuration file for app state regarding content (i.e., the currently displayed storylet) */

import { createSlice } from '@reduxjs/toolkit';

export const contentSlice = createSlice({
  name: 'content',
  initialState: null,
  reducers: {
    setContent: (state, action) => action.payload,
    clearContent: state => null,
  },
});

export const { setContent, clearContent } = contentSlice.actions;

export const selectContent = state => state.content;

export default contentSlice.reducer;
