import gql from 'graphql-tag';

export const GET_ALL_TUTORIALS = gql`
  query GetTutorials {
    tutorials {
      id
      name
      language
      uploadDate
      lastUpdated
      thumbnailSrc
    }
  }
`;
