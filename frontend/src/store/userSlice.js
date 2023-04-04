import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../services/api';

export const signIn = createAsyncThunk('user/signIn', async (userData) => {
  const authRes = await api.post('/auth/signin', userData);

  const jwtToken = authRes.data.access_token;

  const usersRes = await api.get('users/me', {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return { ...authRes.data, ...usersRes.data };
});

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const res = await api.get('users');
  return res.data;
});

const initialState = {
  isLogged: false,
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLogged = false;
      state.jwtToken = undefined;
      state.name = undefined;
      state.email = undefined;
      state.phoneNumber = undefined;
      state.role = undefined;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLogged = true;
        state.jwtToken = action.payload.access_token;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
        state.role = action.payload.role;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export const selectUserIsLogged = (state) => state.user.isLogged;
export const selectUserJwtToken = (state) => state.user.jwtToken;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoneNumber = (state) => state.user.phoneNumber;
export const selectUserRole = (state) => state.user.role;
export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
