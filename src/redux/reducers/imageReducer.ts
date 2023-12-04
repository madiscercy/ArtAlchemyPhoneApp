// src/redux/reducers/imageReducer.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageState} from '../../types';

const initialState: ImageState = {
  selectedImage: '',
  selectedStyle: '',
  newImageUrl: ''
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setSelectedImage(state, action: PayloadAction<string>) {
      state.selectedImage = action.payload;
    },
    setSelectedStyle(state, action: PayloadAction<string>) {
      state.selectedStyle = action.payload;
    },
    setNewImage(state, action: PayloadAction<string>) {
      state.selectedImage = action.payload;
    }
  },
});

export const {setSelectedImage, setSelectedStyle} = imageSlice.actions;
export default imageSlice.reducer;
