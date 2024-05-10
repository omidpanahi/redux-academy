import { configureStore } from '@reduxjs/toolkit';
import { plug as pageNumber } from './state/page-number/slice';

export default configureStore({
  reducer: {
    ...pageNumber,
  },
});
