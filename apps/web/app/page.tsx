"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
          placeholder="Message..."
        />
        <button
          onClick={(e) => {
            if (message === "") return;
            sendMessage(message);
            setMessage("");
          }}
          className={classes["button"]}
        >
          Send
        </button>
      </div>
      <div>
        {messages?.map((e, index) => (
          <li key={index}>{e}</li>
        ))}
      </div>
    </div>
  );
}
