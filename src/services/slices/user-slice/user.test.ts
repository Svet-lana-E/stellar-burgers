import { expect, describe } from '@jest/globals';
import UserSlice, {
  userActions,
  initialState,
  UserState,
  userSelectors,
  userReducer
} from './user';
import { RequestStatus } from '../../constants';
import {
  mockUserData,
  mockUserDataNew,
  mockUserResponse
} from '../../../../mocks/user';
import { configureStore } from '@reduxjs/toolkit';

const {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  setUserCheck,
  setUserData,
  updateUser
} = userActions;

const { selectUser, selectUserCheck } = userSelectors;

const mockUserState: UserState = {
  userChecked: true,
  userData: mockUserData,
  requestStatus: RequestStatus.SUCCESS
};

describe('user reducer', () => {
  it('корректная инициализация', () => {
    const state = UserSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });
});

describe('тесты синхронных экшенов', () => {
  it('установка статуса проверки userCheck', () => {
    const newState = userReducer(initialState, setUserCheck());
    expect(newState.userChecked).toBe(true);
    expect(newState.userChecked).toEqual(mockUserState.userChecked);
  });

  it('изменение данных пользователя', () => {
    const newState = userReducer(mockUserState, setUserData(mockUserDataNew));
    expect(newState.userData).toEqual(mockUserDataNew);
  });
});

describe('тесты асинхронных экшенов', () => {
  const error = new Error('Error');

  describe('fetchUser actions', () => {
    it('fetchUser pending', () => {
      const action = fetchUser.pending('', undefined);
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.LOADING);
      expect(newState.userData).toEqual(initialState.userData);
    });

    it('fetchUser fulfilled', () => {
      const action = fetchUser.fulfilled(mockUserData, '', undefined);
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
      expect(newState.userData).toEqual(mockUserState.userData);
    });

    it('fetchUser rejected', () => {
      const action = fetchUser.rejected(error, '', undefined);
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.FAILED);
      expect(newState.userData).toEqual(initialState.userData);
    });
  });

  describe('registerUser actions', () => {
    it('registerUser pending', () => {
      const action = registerUser.pending('', {
        ...mockUserData,
        password: 'password'
      });
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.LOADING);
      expect(newState.userData).toEqual(initialState.userData);
    });

    it('registerUser fulfilled', () => {
      const action = registerUser.fulfilled(mockUserResponse, '', {
        ...mockUserData,
        password: 'password'
      });
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
      expect(newState.userData).toEqual(mockUserState.userData);
    });

    it('registerUser rejected', () => {
      const action = registerUser.rejected(error, '', {
        ...mockUserData,
        password: 'password'
      });
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.FAILED);
      expect(newState.userData).toEqual(initialState.userData);
    });
  });

  describe('loginUser actions', () => {
    it('loginUser pending', () => {
      const action = loginUser.pending('', {
        ...mockUserData,
        password: 'password'
      });
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.LOADING);
      expect(newState.userData).toEqual(initialState.userData);
    });

    it('loginUser fulfilled', () => {
      const action = loginUser.fulfilled(mockUserResponse, '', {
        ...mockUserData,
        password: 'password'
      });
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
      expect(newState.userData).toEqual(mockUserState.userData);
    });

    it('loginUser rejected', () => {
      const action = loginUser.rejected(error, '', {
        ...mockUserData,
        password: 'password'
      });
      const newState = userReducer(initialState, action);
      expect(newState.requestStatus).toBe(RequestStatus.FAILED);
      expect(newState.userData).toEqual(initialState.userData);
    });
  });

  describe('logoutUser actions', () => {
    it('logoutUser pending', () => {
      const action = logoutUser.pending('', undefined);
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.LOADING);
      expect(newState.userData).toEqual(mockUserState.userData);
    });

    it('logoutUser fulfilled', () => {
      const action = logoutUser.fulfilled({ success: false }, '', undefined);
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.IDLE);
      expect(newState.userData).toEqual(initialState.userData);
    });

    it('logoutUser rejected', () => {
      const action = logoutUser.rejected(error, '', undefined);
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.FAILED);
      expect(newState.userData).toEqual(mockUserState.userData);
    });
  });

  describe('updateUser actions', () => {
    it('updateUser pending', () => {
      const action = updateUser.pending('', {
        ...mockUserDataNew,
        password: 'password1'
      });
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.LOADING);
      expect(newState.userData).toEqual(mockUserState.userData);
    });

    it('updateUser fulfilled изменение пароля', () => {
      const action = updateUser.fulfilled(mockUserState.userData, '', {
        password: 'password1'
      });
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
      expect(newState.userData.name).toEqual(mockUserState.userData.name);
      expect(newState.userData.email).toEqual(mockUserState.userData.email);
    });

    it('updateUser fulfilled изменение имени пользователя', () => {
      const action = updateUser.fulfilled(
        { ...mockUserData, name: mockUserDataNew.name },
        '',
        {
          name: mockUserDataNew.name
        }
      );
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
      expect(newState.userData.name).toEqual(mockUserDataNew.name);
      expect(newState.userData.email).toEqual(mockUserData.email);
    });

    it('updateUser fulfilled изменение email пользователя', () => {
      const action = updateUser.fulfilled(
        { ...mockUserData, email: mockUserDataNew.email },
        '',
        {
          email: mockUserDataNew.email
        }
      );
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
      expect(newState.userData.name).toEqual(mockUserData.name);
      expect(newState.userData.email).toEqual(mockUserDataNew.email);
    });

    it('updateUser fulfilled изменение имени и email пользователя', () => {
      const action = updateUser.fulfilled(mockUserDataNew, '', {
        ...mockUserDataNew
      });
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.SUCCESS);
      expect(newState.userData.name).toEqual(mockUserDataNew.name);
      expect(newState.userData.email).toEqual(mockUserDataNew.email);
    });

    it('updateUser rejected', () => {
      const action = updateUser.rejected(error, '', {
        ...mockUserDataNew,
        password: 'password1'
      });
      const newState = userReducer(mockUserState, action);
      expect(newState.requestStatus).toBe(RequestStatus.FAILED);
      expect(newState.userData).toEqual(mockUserState.userData);
    });
  });
});

describe('тесты селекторов userSlice', () => {
  const store = configureStore({
    reducer: {
      user: userReducer
    },
    preloadedState: {
      user: mockUserState
    }
  });

  it('получение данных пользователя', () => {
    const user = selectUser(store.getState());
    expect(user).toEqual(mockUserState.userData);
  });
  it('получение отметки о проверке пользователя', () => {
    const userCheck = selectUserCheck(store.getState());
    expect(userCheck).toEqual(mockUserState.userChecked);
  });
});
