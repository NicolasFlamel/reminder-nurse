import { GraphQLError } from 'graphql';

export const missingContextApolloError = () =>
  new GraphQLError('You need to be logged in!', {
    extensions: {
      code: 'FORBIDDEN',
    },
  });

export const incorrectCredentialsError = () =>
  new GraphQLError('Incorrect username or password!', {
    extensions: {
      code: 'FORBIDDEN',
    },
  });

export const badUserInputError = (message: string) =>
  new GraphQLError(message, {
    extensions: {
      code: 'BAD_USER_INPUT',
    },
  });
