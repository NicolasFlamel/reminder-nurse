import { Error } from 'mongoose';
import { User, Medicine } from '../models';
import { ResolversType, UserType } from '../types/schemaTypes';
import { signToken } from '../utils/auth';
import { updateQueue } from '../utils/updateQueue';
import {
  badUserInputError,
  incorrectCredentialsError,
  isMongoDBError,
  missingContextApolloError,
  notFoundError,
} from './errors';

const resolvers: ResolversType = {
  Query: {
    // get single medicine
    medicine: async (_, { medicineId }, context) => {
      if (!context.user) throw missingContextApolloError();
      const medicineFound = await Medicine.findOne({
        _id: medicineId,
        userId: context.user._id,
      });

      if (!medicineFound) throw notFoundError();

      return medicineFound;
    },
    // gets all medicine matching userId using context
    medicines: async (_, __, context) => {
      if (!context.user) throw missingContextApolloError();
      const userMedicines = await Medicine.find({
        userId: context.user._id,
      });
      const updatedMedicines = await updateQueue(userMedicines);

      return updatedMedicines;
    },
  },
  Mutation: {
    // User login mutation
    addUser: async (_, { username, password }) => {
      try {
        const userDoc = await User.create({ username, password });
        const user: UserType = { _id: userDoc._id, username: userDoc.username };
        const token = signToken(userDoc);

        return { token, user };
      } catch (err) {
        if (!err || typeof err !== 'object') throw err;
        else if (isMongoDBError(err)) {
          throw badUserInputError('Username is taken');
        } else if (err instanceof Error.ValidationError) {
          if (err.errors.password?.path === 'password')
            throw badUserInputError('Password does not meet requirements');
        }
        throw err;
      }
    },
    login: async (_, { username, password }) => {
      const userDoc = await User.findOne({ username });

      if (!userDoc) {
        throw incorrectCredentialsError();
      } else if (typeof password !== 'string')
        throw new Error('typeof password !== string');

      // check the password
      const correctPw = await userDoc.isCorrectPassword(password);

      if (!correctPw) {
        throw incorrectCredentialsError();
      }
      const token = signToken(userDoc);

      return { token, user: userDoc };
    },

    // adds new medicine using context for userId
    addMedicine: async (_, { medicine }, context) => {
      if (!context.user) throw missingContextApolloError();

      const newMedicine = await Medicine.create({
        ...medicine,
        userId: context.user._id,
      });

      return newMedicine;
    },
    // updates fields of medicine depending on whats passed in
    updateMedicine: async (_, { medicineId, medicine }, context) => {
      if (!context.user) throw missingContextApolloError();

      const updatedMedicine = await Medicine.findOneAndUpdate(
        { _id: medicineId, userId: context.user._id },
        { ...medicine },
        { new: true },
      );

      if (!updatedMedicine) throw new Error('yikes');

      return updatedMedicine;
    },
    // toggles isActive of specific medicine
    toggleIsActive: async (_, { medicineId }, context) => {
      if (!context.user) throw missingContextApolloError();

      const toggledIsActive = await Medicine.findOneAndUpdate(
        { _id: medicineId, userId: context.user._id, amount: { $gt: 0 } },
        [{ $set: { isActive: { $not: '$isActive' } } }],
        { new: true },
      );

      return toggledIsActive;
    },
    // updates check value on queue obj to true and decreases amount on medicine by dosage
    checkQueue: async (_, { medicineId, queueId }, context) => {
      if (!context.user) throw missingContextApolloError();
      const medicineDoc = await Medicine.findOne({
        _id: medicineId,
        'queue._id': queueId,
      });

      if (!medicineDoc) throw notFoundError();

      const index = medicineDoc.queue.findIndex((el) => el._id == queueId);

      if (index > -1 && medicineDoc.queue[index]) {
        medicineDoc.queue[index].checked = true;
        medicineDoc.amount -= medicineDoc.dosage;
      }

      const toggledQueueChecked = await medicineDoc.save();
      return toggledQueueChecked;
    },
  },
};

export default resolvers;
