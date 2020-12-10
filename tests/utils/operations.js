import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

export const GET_PROFILE = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;
