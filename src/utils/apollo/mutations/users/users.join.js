import { gql } from "@apollo/client";

export const USERS_JOIN_MUTATION = gql`
  # Create a new account.
  mutation join($email: String!, $username: String!, $password: String!) {
    join(email: $email, username: $username, password: $password) {
      ok
      data {
        email
        username
        password
      }
      error {
        code
        message
      }
    }
  }
`;
