import { configureStore } from '@reduxjs/toolkit';
import { plug as pageNumber } from './state/page-number/slice';
import { plug as users } from './state/users/slice';

export default configureStore({
  reducer: {
    ...pageNumber,
    ...users
  },
});
