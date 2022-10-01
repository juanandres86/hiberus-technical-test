import type { RootState } from '../';
import { User } from '../../types/user.types';

export const getUsers = (state: RootState) => state.users.users;

export const getUsersName = (state: RootState) => state.users.users.map((user: User) => {
  return user.name;
})