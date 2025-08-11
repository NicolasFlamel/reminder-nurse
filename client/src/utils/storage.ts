import { isJob, JobType } from 'types/socketTypes';

type sessionStorageKey = 'firedEvents';

const sessionStorageStore = <T>(
  key: sessionStorageKey,
  validator: (val: unknown) => val is T,
) => {
  return {
    getItem(): T | null {
      try {
        const entry = sessionStorage.getItem(key);
        if (entry === null) return null;
        const val = JSON.parse(entry);
        if (!validator(val)) return null;
        return val;
      } catch (err) {
        console.error('failed to get from key: ' + key, err);
        return null;
      }
    },
    setItem(val: T) {
      sessionStorage.setItem(key, JSON.stringify(val));
    },
    removeItem() {
      sessionStorage.removeItem(key);
    },
  };
};

const isJobArrayType = (val: unknown): val is JobType[] => {
  if (!(val instanceof Array)) return false;

  return val.every((v) => isJob(v));
};

export const storage = {
  firedEvents: sessionStorageStore<JobType[]>('firedEvents', isJobArrayType),
};
