import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { plug as pageNumber } from './state/page-number/slice';
import { plug as users } from './state/users/slice';

import mySaga from './state/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    ...pageNumber,
    ...users
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(mySaga)

export default store;