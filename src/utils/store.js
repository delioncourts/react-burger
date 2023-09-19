import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../services/reducers/rootreducer'

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})