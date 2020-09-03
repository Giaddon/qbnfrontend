/** Creates our store our of our various reducers. 
 * 
 */

import { configureStore } from '@reduxjs/toolkit';
import qualityReducer from '../qualities/qualitySlice';
import storyletReducer from '../storylets/storyletSlice';
import tooltipReducer from '../tooltip/tooltipSlice';
import interfaceReducer from '../interface/interfaceSlice';
import domainReducer from '../domain/domainSlice';

export default configureStore({
  reducer: {
    qualities: qualityReducer,
    storylets: storyletReducer,
    tooltip: tooltipReducer,
    domain: domainReducer,
    interface: interfaceReducer,
  },
});