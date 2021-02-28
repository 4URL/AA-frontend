import { ApolloClient, InMemoryCache } from '@apollo/client';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.REACT_APP_ENDPOINT;

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache()
});

export default client;
