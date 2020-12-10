import prisma from "../../src/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userOne = {
  input: {
    name: "Jen",
    email: "jen@test.com",
    password: bcrypt.hashSync("testPassword", 10),
  },
  user: undefined,
  jwt: undefined,
};

const userTwo = {
  input: {
    name: "David",
    email: "david@test.com",
    password: bcrypt.hashSync("testPassword", 10),
  },
  user: undefined,
  jwt: undefined,
};

const seedDatabase = async () => {
  //Delete test data
  await prisma.mutation.deleteManyUsers();

  // Create user 1
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create user 2
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input,
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo };
