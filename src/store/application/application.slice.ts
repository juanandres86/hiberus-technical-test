import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ServiceResponse, LoginResponse } from '../../types/service.types';

interface ApplicationState {
  accessToken?: string,
  tokenType?: string,
  refreshToken?: string
}

const initialState: ApplicationState = {}

export const applicationSlice = createSlice({
  name: 'application',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<ServiceResponse>) => {
      if (action.payload.data) {
        const loginResponse = action.payload.data as LoginResponse;
        state.accessToken = loginResponse.accessToken;
        state.tokenType = loginResponse.tokenType;
        state.refreshToken = loginResponse.refreshToken;
      }
    },
    removeToken: () => {
      return initialState;
    }
  }
})

export const { setToken, removeToken } = applicationSlice.actions

export default applicationSlice.reducer