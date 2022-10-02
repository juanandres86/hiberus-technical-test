import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/users.slice';
import sessionReducer from './session/session.slice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    session: sessionReducer
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;