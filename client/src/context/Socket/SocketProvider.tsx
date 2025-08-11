import dayjs from 'dayjs';
import { socket } from 'socket';
import { useState, ReactNode, useEffect } from 'react';
import { useNotify } from 'hooks/useNotify';
import { isJob, JobType, SocketErrorType } from 'types/socketTypes';
import { notificationFired, wasFired } from 'hooks/helpers';
import { SocketContext, SocketDataType } from 'context/Socket';

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { permission, createNotification } = useNotify();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onJobEvent = (value: unknown) => {
      if (permission !== 'granted') return;
      else if (!isJob(value)) return;

      const time = dayjs(value.date).format('HH:mm');

      if (wasFired(value)) return;

      createNotification(time, value.medicineName);
      notificationFired(value);

      console.log('createNotification: ', value);
    };

    const onErrorEvent = (value: SocketErrorType) => {
      console.error(value);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('job', onJobEvent);
    socket.on('error', onErrorEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('job', onJobEvent);
      socket.off('error', onErrorEvent);
    };
  }, [createNotification, permission]);

  const sendJob = async (newData: JobType) => {
    socket.emit('job', newData);
  };

  const contextValue: SocketDataType = {
    isConnected,
    sendJob,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
