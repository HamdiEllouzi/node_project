import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
  },
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, payload) => {
      state.profile = payload.payload;
    },
    editProfile: (state, payload) => {},
  },
});

export const { addProfile, editProfile } = profileSlice.actions;

export default profileSlice.reducer;
