const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/schema.gql"), "utf8")}
`;

import prisma from "./prisma";
import { resolvers, fragmentReplacements } from "./resolvers/index";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => ({
    prisma,
    request,
  }),
  fragmentReplacements,
  playground: true,
  introspection: true,
});

export default server;
