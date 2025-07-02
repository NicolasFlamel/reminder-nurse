import type { CodegenConfig } from '@graphql-codegen/cli';
import { typeDefs } from './src/schema';

const config: CodegenConfig = {
  schema: typeDefs,
  generates: {
    './src/types/schemaTypes.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-mongodb'],
      config: {
        typesSuffix: 'Type',
        scalars: {
          ID: {
            input: 'ObjectId',
            output: 'ObjectId',
          },
        },
      },
    },
  },
};

export default config;
