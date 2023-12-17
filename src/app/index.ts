import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  const graphqlServer = new ApolloServer({
    typeDefs: `
    type Query{
       sayHello:String,
       sayHelloToName(name:String!):String!
    }
   
    `,
    resolvers: {
      Query: {
        sayHello: () => `hey everone`,
        sayHelloToName: (parent: any, { name }: { name: String }) =>
          `hey ${name}`,
      },
    },
  });

  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));
  return app;
}
