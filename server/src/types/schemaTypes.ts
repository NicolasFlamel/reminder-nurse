import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type Medicine = {
  __typename?: 'Medicine';
  _id: Scalars['ID']['output'];
  amount?: Maybe<Scalars['Int']['output']>;
  dosage?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  queue?: Maybe<Array<Maybe<Queue>>>;
  subInterval?: Maybe<Scalars['String']['output']>;
  times?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  userId: Scalars['ID']['output'];
};

export type MedicineInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  dosage?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subInterval?: InputMaybe<Scalars['String']['input']>;
  times?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMedicine?: Maybe<Medicine>;
  addUser?: Maybe<Auth>;
  checkQueue?: Maybe<Medicine>;
  login?: Maybe<Auth>;
  toggleIsActive?: Maybe<Medicine>;
  updateMedicine?: Maybe<Medicine>;
};


export type MutationAddMedicineArgs = {
  medicine: MedicineInput;
};


export type MutationAddUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCheckQueueArgs = {
  medicineId: Scalars['ID']['input'];
  queueId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationToggleIsActiveArgs = {
  medicineId: Scalars['ID']['input'];
};


export type MutationUpdateMedicineArgs = {
  medicine: MedicineInput;
  medicineId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  medicine?: Maybe<Medicine>;
  medicines?: Maybe<Array<Maybe<Medicine>>>;
};


export type QueryMedicineArgs = {
  medicineId: Scalars['ID']['input'];
};

export type Queue = {
  __typename?: 'Queue';
  _id: Scalars['ID']['output'];
  checked?: Maybe<Scalars['Boolean']['output']>;
  time: Scalars['String']['output'];
};

export type QueueInput = {
  time: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<Auth>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Medicine: ResolverTypeWrapper<Medicine>;
  MedicineInput: MedicineInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Queue: ResolverTypeWrapper<Queue>;
  QueueInput: QueueInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: Auth;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Medicine: Medicine;
  MedicineInput: MedicineInput;
  Mutation: {};
  Query: {};
  Queue: Queue;
  QueueInput: QueueInput;
  String: Scalars['String']['output'];
  User: User;
};

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Medicine'] = ResolversParentTypes['Medicine']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dosage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interval?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  queue?: Resolver<Maybe<Array<Maybe<ResolversTypes['Queue']>>>, ParentType, ContextType>;
  subInterval?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  times?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMedicine?: Resolver<Maybe<ResolversTypes['Medicine']>, ParentType, ContextType, RequireFields<MutationAddMedicineArgs, 'medicine'>>;
  addUser?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'password' | 'username'>>;
  checkQueue?: Resolver<Maybe<ResolversTypes['Medicine']>, ParentType, ContextType, RequireFields<MutationCheckQueueArgs, 'medicineId' | 'queueId'>>;
  login?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  toggleIsActive?: Resolver<Maybe<ResolversTypes['Medicine']>, ParentType, ContextType, RequireFields<MutationToggleIsActiveArgs, 'medicineId'>>;
  updateMedicine?: Resolver<Maybe<ResolversTypes['Medicine']>, ParentType, ContextType, RequireFields<MutationUpdateMedicineArgs, 'medicine' | 'medicineId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  medicine?: Resolver<Maybe<ResolversTypes['Medicine']>, ParentType, ContextType, RequireFields<QueryMedicineArgs, 'medicineId'>>;
  medicines?: Resolver<Maybe<Array<Maybe<ResolversTypes['Medicine']>>>, ParentType, ContextType>;
};

export type QueueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Queue'] = ResolversParentTypes['Queue']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  checked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>;
  Medicine?: MedicineResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Queue?: QueueResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

