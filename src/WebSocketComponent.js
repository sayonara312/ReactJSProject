// WebSocketComponent.tsx

import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WebSocketComponent = ({ children }) => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const WS_URL = "ws://localhost:3001";
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL);

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      //   if (typeof lastMessage.data != "object") {
      //     console.log("lastMessage", lastMessage.data);

      //     setReceivedMessage(lastMessage.data);
      //   } else {
      const data = JSON.parse(lastMessage.data);

      switch (data.action) {
        case "getIP":
          localStorage.setItem("IPAddress", data.ip);
          break;
        case "openUrl":
          window.open(data.url, "_blank");
          break;
        case "changeUrl":
          if (data.ip === getClientIP()) window.location.href = data.newUrl;
          break;
        case "redirect":
          if (data.ip === getClientIP()) {
            console.log("data", data);
            window.open(data.url, "_blank");
          }
          break;
        default:
          break;
      }
      //   }
    }
  }, [lastMessage]);
  const getClientIP = () => {
    return localStorage.getItem("IPAddress") || "";
  };
  const sendMessage = () => {
    if (message.trim() !== "") {
      // Gửi tin nhắn đến máy chủ
      sendJsonMessage({ message });
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>
      <p>Server response: {receivedMessage}</p>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send Message</button>

      {children}
    </div>
  );
};

export default WebSocketComponent;
