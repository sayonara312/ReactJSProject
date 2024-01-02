import * as http from "http";
import { WebSocket, WebSocketServer } from "ws";
import router from "./router.js";
import express from "express";
import cors from "cors";
import open from "open";
export const app = express();
const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
// test
wss.on("connection", (ws, req) => {
  const clientIp = req.socket.remoteAddress.replace("::ffff:", "");
  ws.send(JSON.stringify({ action: "getIP", ip: clientIp }));
  ws.on("message", (message) => {
    ws.send(JSON.stringify({ action: "message", message: message }));
    console.log(`Received from ${clientIp}: ${message}`);
  });

  ws.on("close", () => {
    console.log(`Client from IP ${clientIp} disconnected`);
  });
});
app.use(cors());
app.use("/api/", router);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/api/openUrl/:url", async (req, res) => {
  const { url } = req.params;
  const ipClient = req.ip.replace("::ffff:", "");

  const ipEpic = "http://localhost:3000";
  const epicLink = `${ipEpic}/${url}`;

  try {
    wss.clients.forEach(async (client) => {
      if (client.readyState === 1) {
        // await open(epicLink);
        client.send(JSON.stringify({ action: "openUrl", url: epicLink }));
        console.log(`opened URL: ${ipClient}/${url}, EpicLink:${epicLink}`);
      }
    });

    res.status(200).send(`URL opened successfully ${ipClient}`);
  } catch (error) {
    console.error("Error opening URL:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/change-url/:ip/:url", (req, res) => {
  const { ip, url } = req.params;

  // Gửi yêu cầu thay đổi URL đến máy khách cụ thể
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ action: "changeUrl", newUrl: url, ip }));
    }
  });

  res.status(200).send("Change URL request sent successfully");
});
app.post("/api/redirect", (req, res) => {
  const { ip, url } = req.body;

  if (!ip || !url) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  //Gửi yêu cầu thay đổi URL đến máy khách cụ thể
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(
        JSON.stringify({
          action: "redirect",
          url,
          ip,
        })
      );
    }
  });

  res.status(200).send("Change URL request sent successfully");
});
server.listen(3001, () => {
  console.log("WebSocket server is listening on port 3001");
});
