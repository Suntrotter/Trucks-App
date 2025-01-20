import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './reducer';

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
});

export default store;
