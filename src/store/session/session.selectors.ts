import type { RootState } from '../';

export const getToken = (state: RootState) => `${state.session.tokenType} ${state.session.accessToken}`;

export const getIsLogged = (state: RootState) => state.session.accessToken !== undefined && state.session.accessToken !== '';

export const getCurrentUser = (state: RootState) => state.session.user