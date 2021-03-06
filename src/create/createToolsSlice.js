/** Configuration file for app state regarding the creation tools. */

import { createSlice } from '@reduxjs/toolkit';

export const createToolsSlice = createSlice({
  name: 'create',
  initialState: {
    qualities: {},
    domains: {},
    contexts: {},
    actions: {},
    events: {},
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
    addEventToCreate: (state, action) => {
      const { id } = action.payload;
      state.events[id] = action.payload;
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
    addActionToParent: (state, action) => {
      const { newAction, parentType, parentId } = action.payload;
      state[parentType][parentId].actions.push(newAction);
    },
    deleteActionFromParent: (state, action) => {
      const { actionId, parentType, parentId } = action.payload;
      state[parentType][parentId].actions = 
        state[parentType][parentId].actions.filter(a => a.id !== actionId);  
    },
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
  addContextToCreate,
  addEventToCreate,
  addActionToParent,
  deleteActionFromParent,
 } = createToolsSlice.actions;

export const selectCreate = state => state.create;

export default createToolsSlice.reducer;
