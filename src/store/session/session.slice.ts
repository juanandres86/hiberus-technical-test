import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user.types';

interface SessionState {
  accessToken?: string,
  tokenType?: string,
  refreshToken?: string,
  user?: User;
}

const initialState: SessionState = {}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<SessionState>) => {
      return action.payload;
    },
    logout: () => {
      return initialState;
    }
  }
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer