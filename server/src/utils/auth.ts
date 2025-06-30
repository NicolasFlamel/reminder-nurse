import { ContextFunction } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@as-integrations/express5';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Schema } from 'mongoose';
import { MyContext } from '../types/apolloTypes';
import 'dotenv/config';

const secret = process.env.JWT_SECRET!!;
const expiration = process.env.JWT_EXP as SignOptions['expiresIn'];

type authMiddleWareType = ContextFunction<
  [ExpressContextFunctionArgument],
  MyContext
>;
const authMiddleware: authMiddleWareType = async function ({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return {};
  }

  try {
    const payload = jwt.verify(token, secret, { maxAge: expiration });

    if (typeof payload === 'string')
      throw new Error("typeof payload === 'string'");

    return { user: payload.data };
  } catch {
    console.log('Invalid token');
  }

  return {};
};

type SignTokenArgs = { username: string; _id: Schema.Types.ObjectId };
const signToken = function ({ username, _id }: SignTokenArgs) {
  const payload = { username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export { authMiddleware, signToken };
