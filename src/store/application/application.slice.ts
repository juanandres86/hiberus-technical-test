import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../'

interface ApplicationState {
  accessToken?: string,
  tokenType?: string,
  // refreshToken?: string, no lo vamos a usar dado que la API no lo implementa por ahora
}

const initialState: ApplicationState = {}

export const applicationSlice = createSlice({
  name: 'application',
  initialState: initialState,
  reducers: {
    setToken: (state) => {
      return state;
    },
    removeToken: () => {
      return initialState;
    }
  }
})

export const { setToken, removeToken } = applicationSlice.actions

export default applicationSlice.reducer