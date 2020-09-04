/** Configuration file for app state regarding domain (i.e., what determines the available storylets) */

import { createSlice } from '@reduxjs/toolkit';

export const domainSlice = createSlice({
  name: 'domain',
  initialState: {
    outcomes: [],
  },
  reducers: {
    setActiveDomain: (state, action) => {state.active = action.payload;},
    setPreviousDomain: (state) => {state.previous = state.active},
    leaveDomain: (state) => {state.active = state.previous},
    clearActiveDomain: (state) => {state.active = null},
    setOutcomes: (state, action) => {state.outcomes = action.payload;}
  },
});

export const {
  setActiveDomain,
  setPreviousDomain,
  clearDomain,
  leaveDomain,
  setOutcomes, } = domainSlice.actions;

export const selectDomain = state => state.domain;

export default domainSlice.reducer;
