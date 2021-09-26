/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTutorials
// ====================================================

export interface GetTutorials_tutorials {
  __typename: "Tutorial";
  id: string;
  name: string;
  language: string;
  uploadDate: string;
  lastUpdated: string;
  thumbnailSrc: string;
}

export interface GetTutorials {
  tutorials: GetTutorials_tutorials[];
}
