import dayjs from 'dayjs';

// Duplicate code in server/src/types/socketTypes.ts
type DateString = string;
export type JobType = { date: DateString; medicineName: string };
export const isJob = (value: unknown): value is JobType => {
  if (!value) return false;
  else if (typeof value !== 'object') return false;
  else if (!hasDateString(value)) return false;
  else if (!hasMedicineName(value)) return false;

  return true;
};

const hasDateString = (value: object): value is { date: DateString } => {
  if (!('date' in value)) return false;
  else if (typeof value.date !== 'string') return false;
  else if (!dayjs(value.date).isValid()) return false;

  return true;
};

const hasMedicineName = (value: object): value is { medicineName: string } => {
  if (!('medicineName' in value)) return false;
  else if (typeof value.medicineName !== 'string') return false;

  return true;
};
