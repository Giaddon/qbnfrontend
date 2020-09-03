/** Configuration file for app state regarding qualities */

import { createSlice } from '@reduxjs/toolkit';

export const qualitySlice = createSlice({
  name: 'qualities',
  initialState: {},
  reducers: {
    adjustQualityByValue: (state, action) => {
      const { id, quality, value } = action.payload;
      if (state[id]) {
        state[id].value += value;
      } else {
        state[id] = quality;
        state[id].value = 0 + value;
      }
    },
    setQualityToValue: (state, action) => {
      const { id, quality, value } = action.payload;
      if (state[id]) {
        state[id].value = value;
      } else {
        state[id] = quality;
        state[id].value = value;
      }
    },
    addQuality: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    setQualities: (state, action) => action.payload,
  },
});

export const { addQuality, adjustQualityByValue, setQualityToValue, setQualities } = qualitySlice.actions;

export const selectQualities = state => state.qualities;

export default qualitySlice.reducer;
