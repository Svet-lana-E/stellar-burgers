import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { USER_SLICE_NAME } from '@constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { userActions } from '../slices/user';
import { useDispatch } from '@store';

export const fetchUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUser`,
  async (_, { dispatch }) => {
    try {
      if (getCookie('accessToken')) {
        const data = await getUserApi();
        return data.user;
      }
      return null;
    } catch (error) {
      console.warn('USER ERROR', error);
      return null;
    } finally {
      dispatch(userActions.setUserCheck());
    }
  }
);

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => {
    const data = await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return data;
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (user: Partial<TRegisterData>, { dispatch }) => {
    try {
      const data = await updateUserApi(user).then((result) => {
        dispatch(userActions.setUserData(result.user));
      });
    } catch (error) {
      console.warn('USERUPDATE ERROR', error);
    }
  }
);

export const forgerUserPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/forgerUserPassword`,
  async (email: { email: string }) => {
    try {
      const data = await forgotPasswordApi(email);
      return data;
    } catch (error) {
      console.warn('PasswordChanging ERROR', error);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/resetUserPassword`,
  async (data: { password: string; token: string }) => {
    try {
      return await resetPasswordApi(data);
    } catch (error) {
      console.warn('PasswordSet ERROR', error);
    }
  }
);
