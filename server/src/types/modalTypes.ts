import { MedicineType } from './schemaTypes';

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
const isQueueType = (
  val: unknown,
): val is NonNullable<MedicineType['queue']>[number] => {
  if (!val || typeof val !== 'object') return false;

  return 'queue' in val && typeof val.queue === 'string';
};

export const isUpdateMedicineQuery = (
  val: unknown,
): val is Partial<MedicineType> => {
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
