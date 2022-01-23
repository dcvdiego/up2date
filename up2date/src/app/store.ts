import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homePageReducer from './containers/HomePage/slice';
import finderPageReducer from './containers/FinderPage/slice';
import reduxLogger from 'redux-logger';
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: homePageReducer,
    finderPage: finderPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
