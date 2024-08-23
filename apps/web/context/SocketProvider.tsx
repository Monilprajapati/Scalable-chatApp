"use client";

import React, { createContext, useCallback, useContext } from "react";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => any;
}

const socketContext = createContext<ISocketContext | null>(null);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message: string) => {
      console.log("Sending message: ", message);
      // socket.emit("event:message", { message });
    },
    []
  );

  return (
    <socketContext.Provider
      value={{
        sendMessage,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};

const useSocket = () => {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export { SocketProvider, useSocket };
