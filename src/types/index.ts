// Redux state types
export interface StepState {
  currentStep: number;
}

// Redux action types
export interface StepAction {
  type: 'SET_STEP';
  payload: number;
}

// Add more types and interfaces as needed for your application

// src/types/index.ts

export interface ImageState {
  selectedImage: string;
  selectedStyle: string;
  newImageUrl: string;
}

export enum ImageActionTypes {
  SET_SELECTED_IMAGE = 'SET_SELECTED_IMAGE',
  SET_SELECTED_STYLE = 'SET_SELECTED_STYLE',
  SET_NEW_IMAGE = 'SET_NEW_IMAGE'
}

interface SetSelectedImageAction {
  type: ImageActionTypes.SET_SELECTED_IMAGE;
  payload: string;
}

interface SetSelectedStyleAction {
  type: ImageActionTypes.SET_SELECTED_STYLE;
  payload: string;
}

interface SetNewImageAction {
  type: ImageActionTypes.SET_NEW_IMAGE;
  payload: string;
}

export type ImageAction = SetSelectedImageAction | SetSelectedStyleAction | SetNewImageAction;
