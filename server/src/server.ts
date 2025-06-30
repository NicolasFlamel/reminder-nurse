import path from 'path';
import http from 'http';
import cors from 'cors';
import express from 'express';
import db from './config/connection';
import { typeDefs, resolvers } from './schema';
import { authMiddleware } from './utils/auth';
import { MyContext } from './types/apolloTypes';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  // TODO handle pathing
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

app.get('/{*any}', (req, res) => {
  // TODO handle pathing
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  );

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log('\x1b[34m' + `API server running on port ${PORT}! 🚀`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
