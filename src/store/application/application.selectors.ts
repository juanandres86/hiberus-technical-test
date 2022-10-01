import type { RootState } from '../';

export const getToken = (state: RootState) => state.application.accessToken;