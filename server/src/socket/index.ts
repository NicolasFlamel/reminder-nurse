import { CronJob } from 'cron';
import { IOServerType, isJob, SocketType } from '../types/socketTypes';

type UserJobsType = Record<string, CronJob>;
const userJobs: UserJobsType = {};

export const socketSetup = (io: IOServerType) => {
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('job', jobListener(socket));

    socket.on('disconnect', () => {
      clearJobs(socket.id);
      console.log('Client disconnected:', socket.id);
    });
  });
};

const jobListener = (socket: SocketType) => async (data: unknown) => {
  if (!isJob(data)) return;
  const date = new Date(data.date);
  date.setSeconds(date.getSeconds() + 2);

  try {
    const job = new CronJob(
      date,
      () => {
        socket.emit('job', data);
      },
      null,
      true,
    );
    userJobs[socket.id] = job;
  } catch (error) {
    let emitError: string;

    if (typeof error === 'string') emitError = error;
    else if (error instanceof Error) emitError = error.message;
    else emitError = 'Unknown Error';

    console.error('Caught: ', error);

    socket.emit('error', {
      message: 'Cron job creation failed',
      error: emitError,
    });
  }
};

const clearJobs = (socketId: string) => {
  userJobs[socketId]?.stop();
};
