import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { CONFIG } from './config';
import apiRouter from './routes/api';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

// Main API Mount
app.use('/api', apiRouter);

// WebSocket connection for live driver coordinate broadcasting
wss.on('connection', (ws: WebSocket) => {
  ws.send(
    JSON.stringify({
      type: 'INIT',
      message: "Connected to Dad's Auto & Cab Live Telemetry",
      serviceArea: 'TAMIL_NADU',
    })
  );

  ws.on('message', (message: string) => {
    try {
      const data = JSON.parse(message.toString());
      // Broadcast to other clients (e.g. driver GPS update -> passenger screen)
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (e) {
      // Ignore malformed messages
    }
  });
});

server.listen(CONFIG.PORT, () => {
  console.log(`==================================================`);
  console.log(`DAD'S AUTO & CAB - TAMIL NADU BACKEND SERVER`);
  console.log(`Tagline: "Safe Rides • Local Routes • Always With You"`);
  console.log(`Server running at http://localhost:${CONFIG.PORT}`);
  console.log(`Service Area: TAMIL NADU ONLY (V1)`);
  console.log(`==================================================`);
});
