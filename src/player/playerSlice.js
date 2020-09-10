/** Configuration file for player state */

import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    qualities: {},
    discoveredActions: {},
    activeDynamic: false,
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
    setDiscoveredActionsByDomainId: (state, action) => {
      const { domainId, actions } = action.payload;
      state.discoveredActions[domainId] = actions;
    },
  }
});

export const {
  setAllQualities,
  setQuality, 
  removeQuality, 
  setDiscoveredActionsByDomainId 
} = playerSlice.actions;

export const selectPlayer = state => state.player;
export const selectQualities = state => state.player.qualities;
export const selectDiscoveredActions = state => state.player.discoveredActions;

export default playerSlice.reducer;