import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/users.slice';
import applicationReducer from './application/application.slice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    application: applicationReducer
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;