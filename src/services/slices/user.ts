import { RequestStatus, USER_SLICE_NAME } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/userThunk';
import {
  isActionPending,
  isActionRejected
} from '../../utils/addMatcherFunctions';

interface UserState {
  userChecked: boolean;
  userData: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: UserState = {
  userChecked: false,
  userData: null,
  requestStatus: RequestStatus.IDLE
};

const UserSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUserCheck: (state) => {
      state.userChecked = true;
    },
    setUserData: (state, action: { payload: TUser }) => {
      if (state.userData && state.userData.email && state.userData.name) {
        state.userData.email = action.payload.email;
        state.userData.name = action.payload.name;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
          state.requestStatus = RequestStatus.SUCCESS;
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.SUCCESS;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.SUCCESS;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.requestStatus = RequestStatus.IDLE;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (state.userData && action.payload?.email) {
          state.userData.email = action.payload.email;
        }
        if (state.userData && action.payload?.name) {
          state.userData.name = action.payload.name;
        }
      })
      .addMatcher(isActionPending(USER_SLICE_NAME), (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addMatcher(isActionRejected(USER_SLICE_NAME), (state) => {
        state.requestStatus = RequestStatus.FAILED;
      });
  },
  selectors: {
    selectUser: (state) => state.userData,
    selectUserCheck: (state) => state.userChecked
  }
});

export const userActions = {
  ...UserSlice.actions,
  fetchUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser
};

export const userSelectors = UserSlice.selectors;
export default UserSlice;
