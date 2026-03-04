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
import { Server } from 'socket.io';
import { socketSetup } from './socket';
import routes from './controllers';
import { ENV } from './ENV';
import { CLIENT_DIST } from './utils/paths';

const app = express();
const httpServer = http.createServer(app);
const PORT = ENV.PORT || 3001;
const isProduction = ENV.NODE_ENV === 'production';

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const ioServer = new Server(httpServer, {
  cors: {
    // TODO: update to origin later
    origin: '*',
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/dist as static assets
if (isProduction) {
  app.use(express.static(CLIENT_DIST));
}

app.use(routes);

socketSetup(ioServer);

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
      console.log(
        `Use GraphQL at http://localhost:${PORT}/graphql` + '\x1b[0m',
      );
    });
  });
};

startApolloServer();
