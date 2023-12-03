// src/redux/reducers/stepReducer.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StepState} from '../../types';

const initialState: StepState = {
  currentStep: 1,
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
  },
});

export const {setStep} = stepSlice.actions;
export default stepSlice.reducer;
