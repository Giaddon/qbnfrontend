/** Configuration file for app state regarding qualities */

import { createSlice } from '@reduxjs/toolkit';

export const qualitySlice = createSlice({
  name: 'qualities',
  initialState: {
    glory: {
      name: "Glory",
      value: 0,
    },
  },
  reducers: {
    adjustByAmount: (state, action) => {
      state[action.payload.quality].value += action.payload.value;
    },
  },
});

export const { addQuality, adjustByAmount } = qualitySlice.actions;

export const selectQualities = state => state.qualities;

export default qualitySlice.reducer;
