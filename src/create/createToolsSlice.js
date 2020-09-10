/** Configuration file for app state regarding the creation tools. */

import { createSlice } from '@reduxjs/toolkit';

export const createToolsSlice = createSlice({
  name: 'create',
  initialState: {
    qualities: {},
    domains: {},
    contexts: {},
    actions: {},
  },
  reducers: {
    addQualityToCreate: (state, action) => {
      const { id } = action.payload;
      state.qualities[id] = action.payload;
    },
    deleteQualityFromCreate: (state, action) => {
      const id = action.payload;
      delete state.qualities[id];
    },
    addDomainToCreate: (state, action) => {
      const { id } = action.payload;
      state.domains[id] = action.payload;
    },
    deleteDomainFromCreate: (state, action) => {
      const id = action.payload;
      delete state.domains[id];
    },
    addActionToCreate: (state, action) => {
      const { id } = action.payload;
      state.actions[id] = action.payload;
    },
    addContextToCreate: (state, action) => {
      const { id } = action.payload;
      state.contexts[id] = action.payload;
    },
    deleteActionFromCreate: (state, action) => {
      const id = action.payload;
      delete state.actions[id];
    },
    deleteSomethingFromCreate: (state, action) => {
      const { id, type } = action.payload;
      delete state[type][id];
    },
    setAllCreate: (state, action) => action.payload,
  },
});

export const { 
  addQualityToCreate, 
  deleteQualityFromCreate,
  addDomainToCreate,
  deleteDomainFromCreate,
  addActionToCreate,
  deleteActionFromCreate,
  deleteSomethingFromCreate,
  setAllCreate,
  addContextToCreate
 } = createToolsSlice.actions;

export const selectCreate = state => state.create;

export default createToolsSlice.reducer;
