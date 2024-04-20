import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenModalLogin: false,
};

const modalLoginSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModalOpen: (state) => {
      state.isOpenModalLogin = true;
    },
    toggleModalClose: (state) => {
      state.isOpenModalLogin = false;
    },
  },
});

export const { toggleModalOpen, toggleModalClose } = modalLoginSlice.actions;

export const isOpenModalLoginSelector = (state) => state.openModalLogin.isOpenModalLogin;

export default modalLoginSlice.reducer;
