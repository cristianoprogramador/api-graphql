import { ApolloServer, gql } from "apollo-server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

const port = Number(process.env.API_PORT) || 4000;
const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: Int
    name: String
    createdAt: String
    messages: [Message]
  }

  type Message {
    id: Int
    body: String
    createdAt: String
    userId: Int
    user: User
  }

  type Query {
    users: [User]
    messages: [Message]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
    messages: async () => {
      return prisma.message.findMany();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at: ${url}`);
});
