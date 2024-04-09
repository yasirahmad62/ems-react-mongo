const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const employeeSchema = require('./schema/schema');
const employeeResolvers = require('./resolvers/resolver');

const PORT = 4000;
const mongo_url = "Please enter your connection string here ";


async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: employeeSchema,
    resolvers: employeeResolvers,
    playground: true, 
  });

  // Awaiting for  server start before applying middleware
  await server.start();


  server.applyMiddleware({ app });

  // Connecting to MongoDB
  await mongoose.connect(mongo_url, {
    useNewUrlParser: true,
  }).then(() => {
    console.log("Database connected successfully.MongoDB");
  })


  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
