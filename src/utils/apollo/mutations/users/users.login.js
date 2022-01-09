import { gql } from "@apollo/client";

export const USERS_LOGIN_MUTATION = gql`
  # Login user.
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error {
        code
        message
      }
    }
  }
`;
