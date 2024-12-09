"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { BACKEND_SOCKET_URL } from "../config/constants";

interface Props {
  children: ReactNode;
}

interface SocketI {
  socket: Socket | null;
}

const SocketContext = createContext<SocketI>({
  socket: null,
});

export const SocketProvider = ({ children }: Props) => {
  const { user, accessToken } = useSelector((state: any) => state.auth);

  const socket = useMemo(() => {
    return io(BACKEND_SOCKET_URL, {
      query: { userId: user._id },
    });
  }, [user, accessToken]);

  useEffect(() => {
    if (accessToken && user) {
      socket.emit("userOnline", user._id);
    }
  }, [socket, accessToken, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
