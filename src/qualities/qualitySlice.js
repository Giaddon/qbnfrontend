/** Configuration file for app state regarding qualities */

import { createSlice } from '@reduxjs/toolkit';

export const qualitySlice = createSlice({
  name: 'qualities',
  initialState: {},
  reducers: {
    adjustQualityByValue: (state, action) => {
      const { id, quality, value } = action.payload;
      if (state[id]) { //if player already has the quality.
        if (quality.pyramid) { //if this quality is the pyramid type.
          let target = state[id].value < 50 ? state[id].value + 1 : 50;
          let totalChange = state[id].change + value;
          
          while (totalChange >= target) {
            totalChange -= target;
            state[id].value += 1;
            if (target < 50 ) target += 1;
          }
            state[id].change = totalChange;

        } else { //end pyramid type, now standard type
          state[id].value += value;
        }
      } else { // player doesn't have ability
        state[id] = quality;
        state[id].value = 0;
        if (quality.pyramid) { //if this quality is the pyramid type.
          let target = state[id].value < 50 ? state[id].value + 1 : 50;
          let totalChange = state[id].change + value;
          
          while (totalChange >= target) {
            totalChange -= target;
            state[id].value += 1;
            if (target < 50 ) target += 1;
          }
            state[id].change = totalChange;
        } else { // end pyramid type, now standard type.
          state[id].value += value;
        }
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
