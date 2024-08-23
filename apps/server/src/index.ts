import http from "http";
import SocketService from "./services/socket";

async function startServer() {
  // Create a new instance of the SocketService
  const socketService = new SocketService();
  // Create a new http server
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 4000;

  // Attach socket service to http server
  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  socketService.initListeners();
}

startServer();
