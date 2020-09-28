/** Configuration file for app state regarding the tooltip */

import { createSlice } from '@reduxjs/toolkit';

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState: {
    text: "",
    visible: false,
    x: "0px",
    y: "0px",
  },
  reducers: {
    showTooltip: (state, action) => {
      const {text, x, y} = action.payload;
      state.text = text;
      state.x = (x+10).toString()+"px";
      state.y = (y).toString()+"px";
      state.visible = true;
    },
    hideTooltip: (state, action) => {
      state.text = "";
      state.visible = false;
    },
  },
});

export const { showTooltip, hideTooltip } = tooltipSlice.actions;

export const selectTooltip = state => state.tooltip;

export default tooltipSlice.reducer;
