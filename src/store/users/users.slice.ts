import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../'
import { User } from '../../types/user.types';

interface UsersState {
  users: User[],
  loading: boolean,
  error: string | null
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUsers: (state) => {
      return state;
    },
    removeUser: (state) => {
      return state;
    },
    addUser: (state) => {
      return state;
    },
    editUser: (state) => {
      return state;
    }
  }
})

export const { setUsers, removeUser, addUser, editUser } = usersSlice.actions

export default usersSlice.reducer