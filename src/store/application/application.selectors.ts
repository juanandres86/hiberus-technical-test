import type { RootState } from '../';

export const getToken = (state: RootState) => `${state.application.tokenType} ${state.application.accessToken}`;

export const getIsLogged = (state: RootState) => state.application.accessToken !== undefined && state.application.accessToken !== '';