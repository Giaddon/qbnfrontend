/** Configuration file for player state */

import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    qualities: {},
    discoveredActions: {},
    activeDynamic: false,
    selectedAction: null,
    clickedSlot: false,
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
    setSelectedAction: (state, action) => {state.selectedAction = action.payload},
    toggleClickedSlot: (state) => {state.clickedSlot = !state.clickedSlot},
  }
});

export const {
  setAllQualities,
  setQuality, 
  removeQuality, 
  setDiscoveredActionsByDomainId,
  setSelectedAction,
  toggleClickedSlot, 
} = playerSlice.actions;

export const selectPlayer = state => state.player;
export const selectQualities = state => state.player.qualities;
export const selectDiscoveredActions = state => state.player.discoveredActions;
export const selectSelectedAction = state => state.player.selectedAction;
export const selectClickedSlot = state => state.player.clickedSlot;

export default playerSlice.reducer;