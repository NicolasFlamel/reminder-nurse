import { DefaultEventsMap, Server, Socket } from 'socket.io';

type IOServerType = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;
type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export const socketSetup = (io: IOServerType) => {
  io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('job', jobListener(socket));

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

const jobListener = (socket: SocketType) => async (data: unknown) => {
  if (typeof data !== 'string') return;

  socket.emitWithAck('job', 'Thanks for clicking~');
};
