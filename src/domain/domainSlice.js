/** Configuration file for app state regarding domain (i.e., what determines the available storylets) */

import { createSlice } from '@reduxjs/toolkit';

export const domainSlice = createSlice({
  name: 'domain',
  initialState: {
    activeDomain: null,
    activeContext: null,
    activeReport: null,
    activeEvent: null,
    events: {},
    activeDynamic: null,
  },
  reducers: {
    setActiveDomain: (state, action) => {state.activeDomain = action.payload;},
    setActiveContext: (state, action) => {state.activeContext = action.payload},
    setActiveReport: (state, action) => {state.activeReport = action.payload},
    clearActiveContext: (state) => {state.activeContext = null},
    clearActiveReport: (state) => {state.activeReport = null},
    possibleActionDiscovered: (state, action) => {
      const { remainingPossibleActions, newDiscoveredActions } = action.payload;
      state.activeDomain.discoveredActions = newDiscoveredActions;
      state.activeDomain.possibleActions = remainingPossibleActions;
    },
    setActiveDynamicToId: (state, action) => {state.activeDynamic = action.payload},
    clearActiveDynamic: state => {state.activeDynamic = null},
    setEvents: (state, action) => {state.events = action.payload},
    setActiveEvent: (state, action) => {state.activeEvent = action.payload},
  },
});

export const {
  setActiveDomain,
  setActiveContext,
  clearActiveContext,
  setActiveReport,
  clearActiveReport,
  possibleActionDiscovered,
  setActiveDynamicToId,
  clearActiveDynamic,
  setEvents,
  setActiveEvent,
} = domainSlice.actions;

export const selectDomain = state => state.domain;
export const selectEvents = state => state.domain.events;

export default domainSlice.reducer;
