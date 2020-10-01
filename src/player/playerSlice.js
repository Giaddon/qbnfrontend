/** Configuration file for player state */

import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    qualities: {},
    discoveredActions: {},
    discoveredDomains: {},
    activeDynamic: false,
    selectedAction: null,
    clickedSlot: false,
  },
  reducers: {
    setPlayer: (state, action) => action.payload,
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
    discoverDomain: (state, action) => {
      const { id, name } = action.payload;
      state.discoveredDomains[id] = name;
    },
    setDomainQuality: (state, action) => {
      state.qualities.domain = action.payload;
    },
    setSelectedAction: (state, action) => {state.selectedAction = action.payload},
    toggleClickedSlot: (state) => {state.clickedSlot = !state.clickedSlot},
    togglePinQuality: (state, action) => {
      const id = action.payload;
      state.qualities[id].pinned = state.qualities[id].pinned ? false : true;
    }
  }
});

export const {
  setAllQualities,
  setQuality, 
  removeQuality, 
  setDiscoveredActionsByDomainId,
  setSelectedAction,
  toggleClickedSlot,
  discoverDomain, 
  setDomainQuality,
  togglePinQuality,
  setPlayer,
} = playerSlice.actions;

export const selectPlayer = state => state.player;
export const selectQualities = state => state.player.qualities;
export const selectDiscoveredActions = state => state.player.discoveredActions;
export const selectSelectedAction = state => state.player.selectedAction;
export const selectClickedSlot = state => state.player.clickedSlot;
export const selectDiscoveredDomains = state => state.player.discoveredDomains;

export default playerSlice.reducer;