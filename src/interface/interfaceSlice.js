/** Configuration file for app state regarding the interface (i.e., is the sidebar showing) */

import { createSlice } from '@reduxjs/toolkit';

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {sidebar: true},
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar
    }
  },
});

export const { toggleSidebar } = interfaceSlice.actions;

export const selectInterface = state => state.interface;

export default interfaceSlice.reducer;
