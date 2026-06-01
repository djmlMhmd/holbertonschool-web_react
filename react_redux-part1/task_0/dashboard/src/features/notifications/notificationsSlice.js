import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    displayDrawer: true,
  },
  reducers: {},
});

export default notificationsSlice.reducer;
