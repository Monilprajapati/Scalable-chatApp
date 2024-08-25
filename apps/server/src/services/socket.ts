import { Server } from "socket.io";
import Redis from "ioredis";

const redisCongif = {
  host: process.env.REDIS_HOST || "",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : "",
  username: process.env.REDIS_USERNAME || "",
  password: process.env.REDIS_PASSWORD || "",
};

const pub = new Redis(redisCongif);

const sub = new Redis(redisCongif);
// Socket service
class SocketService {
  // Socket instance
  private _io: Server;

  // Constructor with socket instance
  constructor() {
    console.log("Socket service initialized");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    sub.subscribe("MESSAGES");
  }

  // Function to initialize socket listeners
  public initListeners() {
    console.log("Initializing socket listeners");
    const io = this.io;
    io.on("connection", (socket) => {
      console.log("New Socket Connection with ID: ", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("Message received: ", message);
        // publish message to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });

      // Redis message listener for messages
      sub.on("message", (channel, message) => {
        if(channel === "MESSAGES"){
        console.log("Message received from redis: ", message);
        io.emit("message", JSON.parse(message));
        }
      });

    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
