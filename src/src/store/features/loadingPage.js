import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const loadingPageSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: () => true,
    hideLoading: () => false,
  },
});

export const { showLoading, hideLoading } = loadingPageSlice.actions;
export default loadingPageSlice.reducer;
