import type { CodegenConfig } from '@graphql-codegen/cli';
import { typeDefs } from './src/schema';

const config: CodegenConfig = {
  schema: typeDefs,
  generates: {
    './src/types/schemaTypes.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: { typesSuffix: 'Type' },
    },
  },
};

export default config;
