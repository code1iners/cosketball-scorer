import { gql } from "@apollo/client";

export const USERS_ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
    }
  }
`;
