/** Creates our store our of our various reducers. 
 * 
 */

import { configureStore } from '@reduxjs/toolkit';
import qualityReducer from '../qualities/qualitySlice';
import tooltipReducer from '../tooltip/tooltipSlice';
import interfaceReducer from '../interface/interfaceSlice';
import domainReducer from '../domain/domainSlice';
import createReducer from '../create/createToolsSlice';

export default configureStore({
  reducer: {
    qualities: qualityReducer,
    tooltip: tooltipReducer,
    domain: domainReducer,
    interface: interfaceReducer,
    create: createReducer,
  }, 
});