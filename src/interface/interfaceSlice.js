/** Configuration file for app state regarding the interface (i.e., is the sidebar showing) */

import { createSlice } from '@reduxjs/toolkit';

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    sidebar: true,
    sidebarDisplay: 'qualities',
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar
    },
    setSidebarDisplay: (state, action) => {
      state.sidebarDisplay = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarDisplay } = interfaceSlice.actions;

export const selectInterface = state => state.interface;

export default interfaceSlice.reducer;
