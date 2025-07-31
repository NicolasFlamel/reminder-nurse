import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { socket } from 'socket';

interface SocketDataType {
  isConnected: boolean;
  sendJob: (newData: string) => void;
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

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onJobEvent = (value: unknown) => {
      console.log('onJobEvent: ', value);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('job', onJobEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onJobEvent);
    };
  }, []);

  const sendJob = async (newData: string) => {
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
