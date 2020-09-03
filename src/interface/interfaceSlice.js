/** Configuration file for app state regarding domain (i.e., what determines the available storylets) */

import { createSlice } from '@reduxjs/toolkit';

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {sidebar: false},
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar
    }
  },
});

export const { toggleSidebar } = interfaceSlice.actions;

export const selectInterface = state => state.interface;

export default interfaceSlice.reducer;
