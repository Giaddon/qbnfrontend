/** Configuration file for app state regarding available storylets */

import { createSlice } from '@reduxjs/toolkit';

export const storyletSlice = createSlice({
  name: 'storylets',
  initialState: {
    available: [],
    unavailable: [],
    remote: [],
  },
  reducers: {
    setStorylets: (state, action) => action.payload,
    setAvailableStorylets: (state, action) => {state.available = action.payload},
    setUnavailableStorylets: (state, action) => {state.unavailable = action.payload},
    addToAvailableStorylets: (state, action) => {state.available.push(action.payload)},
    addToUnavailableStorylets: (state, action) => {state.unavailable.push(action.payload)},
  },
});

export const {
  setStorylets,
  setAvailableStorylets,
  setUnavailableStorylets,
  addToAvailableStorylets,
  addToUnavailableStorylets 
} = storyletSlice.actions;

export const selectStorylets = state => state.storylets;

export default storyletSlice.reducer;
