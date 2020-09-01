/** Configuration file for app state regarding qualities */

import { createSlice } from '@reduxjs/toolkit';

import QualitiesAPI from '../utilities/QualitiesAPI';

export const qualitySlice = createSlice({
  name: 'qualities',
  initialState: {},
  reducers: {
    adjustByAmount: (state, action) => {
      const { quality, value } = action.payload;
      if (state[quality]) {
        state[quality].value += value;
      } else {
        const newQuality = QualitiesAPI.getById(quality);
        state[quality] = newQuality;
        state[quality].value = 0 + value;
      }
    },
    addQuality: (state, action) => {
      state[action.payload.id] = action.payload;
    }
  },
});

export const { addQuality, adjustByAmount } = qualitySlice.actions;

export const selectQualities = state => state.qualities;

export default qualitySlice.reducer;
