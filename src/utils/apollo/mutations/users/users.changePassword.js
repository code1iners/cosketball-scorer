import { gql } from "@apollo/client";

export const USERS_CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($email: String!, $newPassword: String!) {
    changePassword(email: $email, newPassword: $newPassword) {
      ok
      error {
        code
        message
      }
    }
  }
`;

export const USERS_UPDATE_VALID_KEY_MUTATION = gql`
  mutation updateValidKey($email: String!, $validKey: String!) {
    updateValidKey(email: $email, validKey: $validKey) {
      ok
      error {
        code
        message
      }
    }
  }
`;

export const USERS_CHECK_VALID_KEY_MUTATION = gql`
  mutation checkValidKey($email: String!, $validKey: String!) {
    checkValidKey(email: $email, validKey: $validKey) {
      ok
      error {
        code
        message
      }
    }
  }
`;
