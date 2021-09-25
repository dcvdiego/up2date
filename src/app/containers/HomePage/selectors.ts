import { createSelector } from 'reselect';
import { IRootAppState } from '../../../typings';

const selectHomePage = (state: IRootAppState) => state.homePage;

export const makeSelectTopTutorials = createSelector(
  selectHomePage,
  (homePage) => homePage.topTutorials
);
