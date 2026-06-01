import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
  reducers: {},
});

export default authSlice.reducer;
