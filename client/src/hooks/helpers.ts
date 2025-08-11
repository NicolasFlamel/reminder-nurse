import { JobType } from 'types/socketTypes';
import { storage } from 'utils/storage';

export const wasFired = (event: JobType): boolean => {
  const firedEvents = storage.firedEvents.getItem();

  if (!firedEvents) return false;

  return firedEvents.some((firedEvent) => {
    const sameTime = firedEvent.date === event.date;
    const sameMedicine = firedEvent.medicineName === event.medicineName;

    return sameTime && sameMedicine;
  });
};

export const notificationFired = (eventFired: JobType) => {
  const firedEvents = storage.firedEvents.getItem();

  if (!firedEvents) return storage.firedEvents.setItem([eventFired]);

  firedEvents.push(eventFired);
  storage.firedEvents.setItem(firedEvents);
};
