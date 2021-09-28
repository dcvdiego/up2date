import { createSelector } from 'reselect';
import { IRootAppState } from '../../../typings';

const selectFinderPage = (state: IRootAppState) => state.finderPage;

export const makeSelectTutorials = createSelector(
  selectFinderPage,
  (finderPage) => finderPage.tutorials
);
