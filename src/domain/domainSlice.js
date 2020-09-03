/** Configuration file for app state regarding domain (i.e., what determines the available storylets) */

import { createSlice } from '@reduxjs/toolkit';

export const domainSlice = createSlice({
  name: 'domain',
  initialState: null,
  reducers: {
    setDomain: (state, action) => action.payload,
    clearDomain: state => null,
  },
});

export const { setDomain, clearDomain } = domainSlice.actions;

export const selectDomain = state => state.domain;

export default domainSlice.reducer;
