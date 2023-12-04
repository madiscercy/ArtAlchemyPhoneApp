// src/redux/actions/imageActions.ts

import {ImageAction, ImageActionTypes} from '../../types';

export const setSelectedImage = (imageUri: string): ImageAction => ({
  type: ImageActionTypes.SET_SELECTED_IMAGE,
  payload: imageUri,
});

export const setSelectedStyle = (style: string): ImageAction => ({
  type: ImageActionTypes.SET_SELECTED_STYLE,
  payload: style,
});

export const setNewImage = (imageUri: string): ImageAction => ({
  type: ImageActionTypes.SET_NEW_IMAGE,
  payload: imageUri,
});
