/** Creates our store our of our various reducers. 
 * 
 */

import { configureStore } from '@reduxjs/toolkit';
import tooltipReducer from '../tooltip/tooltipSlice';
import interfaceReducer from './interfaceSlice';
import domainReducer from './domainSlice';
import createReducer from '../create/createToolsSlice';
import playerReducer from './playerSlice';

export default configureStore({
  reducer: {
    player: playerReducer,
    tooltip: tooltipReducer,
    domain: domainReducer,
    interface: interfaceReducer,
    create: createReducer,
  }, 
});