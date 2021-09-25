import { apolloClient } from '../../graphql';
import { GET_ALL_TUTORIALS } from './queries';
import { GetTutorials_tutorials } from './__generated__/GetTutorials';

class TutorialService {
  public async getTutorials(): Promise<GetTutorials_tutorials[]> {
    const response = await apolloClient
      .query({ query: GET_ALL_TUTORIALS })
      .catch((err) => {
        throw err;
      });

    if (response && response.data && response.data.tutorials)
      return response.data.tutorials as GetTutorials_tutorials[];

    return [];
  }
}

export default new TutorialService();
