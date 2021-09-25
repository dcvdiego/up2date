import { createSlice } from '@reduxjs/toolkit';
import { IHomePageState } from './type';

const initialState: IHomePageState = {
  topTutorials: [],
};

export const homePageSlice = createSlice({
  name: 'HomePage',
  initialState,
  reducers: {
    setTopTutorials: (state, action) => {
      state.topTutorials = action.payload;
    },
  },
});

export const { setTopTutorials } = homePageSlice.actions;
export default homePageSlice.reducer;
