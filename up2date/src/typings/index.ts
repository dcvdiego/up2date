import { IFindPageState } from '../app/containers/FinderPage/type';
import { IHomePageState } from '../app/containers/HomePage/type';

export interface IRootAppState {
  homePage: IHomePageState;
  finderPage: IFindPageState;
}
