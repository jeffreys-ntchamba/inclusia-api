const { ApolloServer } = require('apollo-server-express');
const {typeDefs} = require('./schema.graphql')
const resolvers = require('./resolvers/index')
const {PrismaClient} = require("@prisma/client")
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const prisma = new PrismaClient()
const { makeExecutableSchema } = require("graphql-tools");
const schema = new makeExecutableSchema({typeDefs, resolvers})
const server = new ApolloServer({
    uploads: false,
      schema,
      context: (request) => ({ ...request, prisma }),
      playground: true,
      introspection: true
    });
server.applyMiddleware({app,bodyParser: bodyParser.json()})
app.listen(process.env.PORT|| 4000,()=> console.log("server is listening"))