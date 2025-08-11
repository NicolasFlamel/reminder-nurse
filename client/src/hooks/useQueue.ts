import dayjs from 'dayjs';
import { useRef } from 'react';
import { MedicineType } from 'types';
import { useSocket } from 'context/Socket';
import { JobType } from 'types/socketTypes';

export const useQueue = (medicine: MedicineType) => {
  const jobs = useRef<Set<JobType>>(new Set([]));
  const { sendJob } = useSocket();

  medicine.queue.forEach((item) => {
    if (item.checked) return;
    const date = new Date();
    const times = item.time.split(':');
    const hour = parseInt(times[0]);
    const minute = parseInt(times[1]);

    date.setHours(hour, minute, 0, 0);

    const inPast = dayjs().isAfter(date);

    if (inPast) return;

    const dateString = date.toISOString();
    const jobToSend = { date: dateString, medicineName: medicine.name };

    jobs.current.add(jobToSend);
    sendJob(jobToSend);
  });

  return { jobs };
};
