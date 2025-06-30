export interface MyContext {
  token?: string;
  user?: { username: string; _id: string };
}

export type ResolverType = {
  Query: QueryType;
  Mutation: QueryType;
};

type QueryType = {
  [key: string]: (
    parent: unknown,
    args: { [key: string]: unknown },
    context: MyContext,
  ) => any;
};
