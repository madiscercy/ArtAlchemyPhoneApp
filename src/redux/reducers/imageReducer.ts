// src/redux/reducers/imageReducer.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageState} from '../../types';

let initialState: ImageState = {
  selectedImage: '',
  selectedStyle: '',
  newImageUrl: '',
};

let imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setSelectedImage(state, action: PayloadAction<string>) {
      state.selectedImage = action.payload;
      console.log('selectedImage', state.selectedImage);
      console.log('selectedStyle', state.selectedStyle);
    },
    setSelectedStyle(state, action: PayloadAction<string>) {
      state.selectedStyle = action.payload;
    },
    setNewImage(state, action: PayloadAction<string>) {
      state.selectedImage = action.payload;
    },
  },
});

export const {setSelectedImage, setSelectedStyle} = imageSlice.actions;
export default imageSlice.reducer;
