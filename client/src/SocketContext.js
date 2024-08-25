import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketTempContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketTempContext);
  return socket;
};

export const SocketContext = (props) => {
  const socket = useMemo(() => io(process.env.REACT_APP_API_URL), []);

  return (
    <SocketTempContext.Provider value={socket}>
      {props.children}
    </SocketTempContext.Provider>
  );
};
