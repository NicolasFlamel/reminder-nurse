import { createContext } from 'react';
import { JobType } from 'types/socketTypes';

export { SocketProvider } from './SocketProvider';
export { useSocket } from './useSocket';

export interface SocketDataType {
  isConnected: boolean;
  sendJob: (newData: JobType) => void;
}

const initialContextState: SocketDataType = {
  isConnected: false,
  sendJob: () => {}, // Placeholder function
};

export const SocketContext = createContext<SocketDataType>(initialContextState);
