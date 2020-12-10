import "cross-fetch/polyfill";
import { CREATE_USER, GET_USERS, LOGIN, GET_PROFILE } from "./utils/operations";
import prisma from "../src/prisma";

import seedDatabase, { userOne } from "./utils/seedDatabase";
import getClient from "./utils/getClient";

const client = getClient();

describe("User ops ", () => {
  beforeEach(seedDatabase);

  it("should create user", async () => {
    const variables = { data: { name: "Ted", email: "ted@test.com", password: "MyPass123" } };

    const response = await client.mutate({
      mutation: CREATE_USER,
      variables,
    });

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id });
    expect(exists).toBe(true);
  });

  it("should expose public author profiles", async () => {
    const response = await client.query({ query: GET_USERS });

    expect(response.data.users.length).toBe(2);
    expect(response.data.users[0].email).toBe(null);
    expect(response.data.users[0].name).toBe("Jen");
  });

  it("should not login with bad credentials", async () => {
    const variables = { data: { email: "jen@test.com", password: "test" } };

    await expect(client.mutate({ mutation: LOGIN, variables })).rejects.toThrow();
  });

  it("should not sign up user with invalid password", async () => {
    const variables = { data: { name: "Ted", email: "ted@test.com", password: "1234567" } };

    await expect(client.mutate({ mutation: CREATE_USER, variables })).rejects.toThrow();
  });

  it("should fetch user profile", async () => {
    const client = getClient(userOne.jwt);

    const { data } = await client.query({ query: GET_PROFILE });
    expect(data.me.id).toBe(userOne.user.id);
    expect(data.me.email).toBe(userOne.user.email);
  });
});
