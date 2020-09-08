/** Configuration file for player state */

import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    qualities: {},
  },
  reducers: {
    setAllQualities: (state, action) => {
      state.qualities = action.payload;
    },
    setQuality: (state, action) => {
      const { id, quality } = action.payload;
      state.qualities[id] = quality;
    },
    removeQuality: (state, action) => {
      delete state.qualities[action.payload];
    },
  }
});

export const { setAllQualities, setQuality, removeQuality } = playerSlice.actions;

export const selectPlayer = state => state.player;
export const selectQualities = state => state.player.qualities;

export default playerSlice.reducer;