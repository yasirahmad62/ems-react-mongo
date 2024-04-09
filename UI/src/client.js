import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  onError: (error) => {
    console.error("Apollo Client Error:", error);
  },
});

export default client;
