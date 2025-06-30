import { Types } from 'mongoose';

type QueueType = { time: string; checked?: boolean };
type UpdateType =
  | 'name'
  | 'dosage'
  | 'amount'
  | 'interval'
  | 'subInterval'
  | 'times';

export type UpdateMedicineType = Partial<MedicineType>;

// TODO: make some optional?
export type MedicineType = {
  name: string;
  dosage?: number;
  amount: number;
  interval?: 'daily' | 'weekly' | 'monthly';
  subInterval?: 'every' | 'every other';
  times?: string[];
  queue?: QueueType[];
  queueLastFilled?: Date;
  isActive?: boolean;
  userId: Types.ObjectId;
  fillQueue: () => Promise<boolean>;
};

export const isMedicineType = (val: unknown): val is MedicineType => {
  if (!val || typeof val !== 'object') return false;

  const isMedicine =
    'name' in val &&
    typeof val.name === 'string' &&
    'amount' in val &&
    typeof val.amount === 'number';

  return isMedicine;
};

const isInterval = (
  val: unknown,
): val is NonNullable<MedicineType['interval']> => {
  if (typeof val !== 'string') return false;
  else if (val === 'daily' || val === 'weekly' || val === 'monthly')
    return true;
  else return true;
};
const isTimes = (val: unknown): val is NonNullable<MedicineType['times']> => {
  if (!Array.isArray(val)) return false;
  else if (!val.every((v) => typeof v === 'string')) return false;

  return true;
};
const isQueueArray = (
  val: unknown,
): val is NonNullable<MedicineType['queue']> => {
  if (!Array.isArray(val)) {
    return false;
  } else if (!val.every(isQueueType)) {
    return false;
  }
  return true;
};
const isQueueType = (val: unknown): val is QueueType => {
  if (!val || typeof val !== 'object') return false;

  return 'time' in val && typeof val.time === 'string';
};

export const isUpdateMedicineQuery = (
  val: unknown,
): val is UpdateMedicineType => {
  if (!val || typeof val !== 'object') return false;
  else if ('name' in val && typeof val.name === 'string') return true;
  else if ('dosage' in val && typeof val.dosage === 'number') return true;
  else if ('amount' in val && typeof val.amount === 'number') return true;
  else if ('interval' in val && isInterval(val.interval)) return true;
  else if ('subInterval' in val && typeof val.subInterval === 'string')
    return true;
  else if ('times' in val && isTimes(val.times)) return true;
  else if ('queue' in val && isQueueArray(val.queue)) return true;
  else if ('queueLastFilled' in val && typeof val.queueLastFilled === 'string')
    return true;
  else if ('isActive' in val && typeof val.isActive === 'string') return true;

  return false;
};
