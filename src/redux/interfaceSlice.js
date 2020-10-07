/** Configuration file for app state regarding the interface (i.e., is the sidebar showing) */

import { createSlice } from '@reduxjs/toolkit';

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState: {
    sidebar: false,
    sidebarDisplay: 'qualities',
    mainDisplay: 'story',
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar
    },
    setSidebarDisplay: (state, action) => {
      state.sidebarDisplay = action.payload;
    },
    setMainDisplay: (state, action) => {
      state.mainDisplay = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarDisplay, setMainDisplay } = interfaceSlice.actions;

export const selectInterface = state => state.interface;

export default interfaceSlice.reducer;
