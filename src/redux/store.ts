// src/redux/store.ts

import {configureStore} from '@reduxjs/toolkit';
import stepReducer from './reducers/stepReducer';
import imageReducer from './reducers/imageReducer';

const store = configureStore({
  reducer: {
    step: stepReducer,
    image: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
