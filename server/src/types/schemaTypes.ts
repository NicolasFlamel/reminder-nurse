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

export type AuthType = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user?: Maybe<UserType>;
};

export type MedicineType = {
  __typename?: 'Medicine';
  _id: Scalars['ID']['output'];
  amount?: Maybe<Scalars['Int']['output']>;
  dosage?: Maybe<Scalars['Int']['output']>;
  interval?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  queue?: Maybe<Array<QueueType>>;
  subInterval?: Maybe<Scalars['String']['output']>;
  times?: Maybe<Array<Scalars['String']['output']>>;
  userId: Scalars['ID']['output'];
};

export type MedicineInputType = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  dosage?: InputMaybe<Scalars['Int']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subInterval?: InputMaybe<Scalars['String']['input']>;
  times?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type MutationType = {
  __typename?: 'Mutation';
  addMedicine?: Maybe<MedicineType>;
  addUser?: Maybe<AuthType>;
  checkQueue?: Maybe<MedicineType>;
  login?: Maybe<AuthType>;
  toggleIsActive?: Maybe<MedicineType>;
  updateMedicine?: Maybe<MedicineType>;
};


export type MutationAddMedicineArgsType = {
  medicine: MedicineInputType;
};


export type MutationAddUserArgsType = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCheckQueueArgsType = {
  medicineId: Scalars['ID']['input'];
  queueId: Scalars['ID']['input'];
};


export type MutationLoginArgsType = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationToggleIsActiveArgsType = {
  medicineId: Scalars['ID']['input'];
};


export type MutationUpdateMedicineArgsType = {
  medicine: MedicineInputType;
  medicineId: Scalars['ID']['input'];
};

export type QueryType = {
  __typename?: 'Query';
  medicine?: Maybe<MedicineType>;
  medicines?: Maybe<Array<MedicineType>>;
};


export type QueryMedicineArgsType = {
  medicineId: Scalars['ID']['input'];
};

export type QueueType = {
  __typename?: 'Queue';
  _id: Scalars['ID']['output'];
  checked?: Maybe<Scalars['Boolean']['output']>;
  time: Scalars['String']['output'];
};

export type QueueInputType = {
  time: Scalars['String']['input'];
};

export type UserType = {
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
export type ResolversTypesType = {
  Auth: ResolverTypeWrapper<AuthType>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Medicine: ResolverTypeWrapper<MedicineType>;
  MedicineInput: MedicineInputType;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Queue: ResolverTypeWrapper<QueueType>;
  QueueInput: QueueInputType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypesType = {
  Auth: AuthType;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Medicine: MedicineType;
  MedicineInput: MedicineInputType;
  Mutation: {};
  Query: {};
  Queue: QueueType;
  QueueInput: QueueInputType;
  String: Scalars['String']['output'];
  User: UserType;
};

export type AuthResolversType<ContextType = any, ParentType extends ResolversParentTypesType['Auth'] = ResolversParentTypesType['Auth']> = {
  token?: Resolver<ResolversTypesType['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypesType['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MedicineResolversType<ContextType = any, ParentType extends ResolversParentTypesType['Medicine'] = ResolversParentTypesType['Medicine']> = {
  _id?: Resolver<ResolversTypesType['ID'], ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypesType['Int']>, ParentType, ContextType>;
  dosage?: Resolver<Maybe<ResolversTypesType['Int']>, ParentType, ContextType>;
  interval?: Resolver<Maybe<ResolversTypesType['String']>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypesType['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypesType['String']>, ParentType, ContextType>;
  queue?: Resolver<Maybe<Array<ResolversTypesType['Queue']>>, ParentType, ContextType>;
  subInterval?: Resolver<Maybe<ResolversTypesType['String']>, ParentType, ContextType>;
  times?: Resolver<Maybe<Array<ResolversTypesType['String']>>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypesType['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolversType<ContextType = any, ParentType extends ResolversParentTypesType['Mutation'] = ResolversParentTypesType['Mutation']> = {
  addMedicine?: Resolver<Maybe<ResolversTypesType['Medicine']>, ParentType, ContextType, RequireFields<MutationAddMedicineArgsType, 'medicine'>>;
  addUser?: Resolver<Maybe<ResolversTypesType['Auth']>, ParentType, ContextType, RequireFields<MutationAddUserArgsType, 'password' | 'username'>>;
  checkQueue?: Resolver<Maybe<ResolversTypesType['Medicine']>, ParentType, ContextType, RequireFields<MutationCheckQueueArgsType, 'medicineId' | 'queueId'>>;
  login?: Resolver<Maybe<ResolversTypesType['Auth']>, ParentType, ContextType, RequireFields<MutationLoginArgsType, 'password' | 'username'>>;
  toggleIsActive?: Resolver<Maybe<ResolversTypesType['Medicine']>, ParentType, ContextType, RequireFields<MutationToggleIsActiveArgsType, 'medicineId'>>;
  updateMedicine?: Resolver<Maybe<ResolversTypesType['Medicine']>, ParentType, ContextType, RequireFields<MutationUpdateMedicineArgsType, 'medicine' | 'medicineId'>>;
};

export type QueryResolversType<ContextType = any, ParentType extends ResolversParentTypesType['Query'] = ResolversParentTypesType['Query']> = {
  medicine?: Resolver<Maybe<ResolversTypesType['Medicine']>, ParentType, ContextType, RequireFields<QueryMedicineArgsType, 'medicineId'>>;
  medicines?: Resolver<Maybe<Array<ResolversTypesType['Medicine']>>, ParentType, ContextType>;
};

export type QueueResolversType<ContextType = any, ParentType extends ResolversParentTypesType['Queue'] = ResolversParentTypesType['Queue']> = {
  _id?: Resolver<ResolversTypesType['ID'], ParentType, ContextType>;
  checked?: Resolver<Maybe<ResolversTypesType['Boolean']>, ParentType, ContextType>;
  time?: Resolver<ResolversTypesType['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolversType<ContextType = any, ParentType extends ResolversParentTypesType['User'] = ResolversParentTypesType['User']> = {
  _id?: Resolver<ResolversTypesType['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypesType['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResolversType<ContextType = any> = {
  Auth?: AuthResolversType<ContextType>;
  Medicine?: MedicineResolversType<ContextType>;
  Mutation?: MutationResolversType<ContextType>;
  Query?: QueryResolversType<ContextType>;
  Queue?: QueueResolversType<ContextType>;
  User?: UserResolversType<ContextType>;
};

