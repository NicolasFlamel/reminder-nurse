import { useNotify } from 'hooks/useNotify';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { socket } from 'socket';
import { isJob, JobType } from 'types/socketTypes';
import dayjs from 'dayjs';
import { notificationFired, wasFired } from 'hooks/helpers';

interface SocketDataType {
  isConnected: boolean;
  sendJob: (newData: JobType) => void;
}

const initialContextState: SocketDataType = {
  isConnected: false,
  sendJob: () => {}, // Placeholder function
};

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext<SocketDataType>(initialContextState);

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

      const date = dayjs(value.date).format('HH:mm');

      if (wasFired(value)) return;

      createNotification(date, value.medicineName);
      notificationFired(value);

      console.log('createNotification: ', value);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('job', onJobEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onJobEvent);
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

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};
