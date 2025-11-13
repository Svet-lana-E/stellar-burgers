import { TUser } from '../src/utils/types';

export const mockUserData: TUser = {
  email: 'user@email.com',
  name: 'User'
};

export const mockUserDataNew: TUser = {
  email: 'newUser@email.com',
  name: 'NewUser'
};

export const mockUserResponse = {
  success: true,
  refreshToken: 'ead41463f2598fNKY6n83BJlHj96e97e05d9652hYtl9',
  accessToken: 'Bearer eyJhbGciOiJIvn56NK5hjNJkI6IkpXVCJ9',
  user: mockUserData
};
