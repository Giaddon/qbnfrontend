/** Configuration file for app state regarding domain (i.e., what determines the available storylets) */

import { createSlice } from '@reduxjs/toolkit';

export const domainSlice = createSlice({
  name: 'domain',
  initialState: {
    activeDomain: null,
    activeStorylet: null,
    activeReport: null,
  },
  reducers: {
    setActiveDomain: (state, action) => {state.activeDomain = action.payload;},
    setActiveStorylet: (state, action) => {state.activeStorylet = action.payload},
    setActiveReport: (state, action) => {state.activeReport = action.payload},
    clearActiveStorylet: (state) => {state.activeStorylet = null},
    clearActiveReport: (state) => {state.activeReport = null},
  },
});

export const {
  setActiveDomain,
  setActiveStorylet,
  clearActiveStorylet,
  setActiveReport,
  clearActiveReport,
} = domainSlice.actions;

export const selectDomain = state => state.domain;

export default domainSlice.reducer;
