import { Server } from "socket.io";

// Socket service
class SocketService {
  // Socket instance
  private _io: Server;

  // Constructor with socket instance
  constructor() {
    console.log("Socket service initialized");
    this._io = new Server();
  }

  // Function to initialize socket listeners
  public initListeners() {
    console.log("Initializing socket listeners");
    const io = this.io;
    io.on("connection", (socket) => {
      console.log("New Socket Connection with ID: ", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("Message received: ", message);
        // socket.emit("event:message", {message: "Message received"});
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
