import { createSlice } from '@reduxjs/toolkit';
import { IFindPageState } from '../../containers/FinderPage/type';

const initialState: IFindPageState = {
  tutorials: [],
};

export const searchBarSlice = createSlice({
  name: 'SearchBar',
  initialState,
  reducers: {
    setTutorials: (state, action) => {
      state.tutorials = action.payload;
    },
  },
});

export const { setTutorials } = searchBarSlice.actions;
export default searchBarSlice.reducer;
