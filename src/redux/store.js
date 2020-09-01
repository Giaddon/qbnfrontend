/** Creates our store our of our various reducers. 
 * 
 */

import { configureStore } from '@reduxjs/toolkit';
import qualityReducer from '../qualities/qualitySlice';
import storyletReducer from '../storylets/storyletSlice';
import contentReducer from '../content/contentSlice';
import tooltipReducer from '../tooltip/tooltipSlice';

export default configureStore({
  reducer: {
    qualities: qualityReducer,
    storylets: storyletReducer,
    content: contentReducer,
    tooltip: tooltipReducer,
  },
});