/** Configuration file for app state regarding the creation tools. */

import { createSlice } from '@reduxjs/toolkit';

export const createToolsSlice = createSlice({
  name: 'create',
  initialState: {
    qualities: {},
    domains: {},
    storylets: {},
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
  },
});

export const { addQualityToCreate, deleteQualityFromCreate } = createToolsSlice.actions;

export const selectCreate = state => state.create;

export default createToolsSlice.reducer;
