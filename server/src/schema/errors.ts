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

export const notFoundError = () =>
  new GraphQLError('Medicine not found', {
    extensions: {
      code: 'NOT_FOUND',
    },
  });

export const isMongoDBError = (value: unknown) => {
  if (!value || typeof value !== 'object') return false;

  return 'code' in value && value.code === 11000;
};
