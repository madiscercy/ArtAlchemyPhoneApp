import {StepAction} from '../../types';

export const setStep = (step: number): StepAction => ({
  type: 'SET_STEP',
  payload: step,
});
