import { Server } from 'node:http';
import { Server as SocketServer, Socket } from 'socket.io';

export type ChatMessage = {
  username: string;
  message: string;
};

export class WebSocket {
  constructor(server: Server) {
    this.server = server;
  }

  private server: Server;

  init(): void {
    const io = new SocketServer(this.server);
    io.on('connection', (socket: Socket) => {
      socket.on('chat message', (msg: ChatMessage) => {
        io.emit('chat message', {
          username: msg.username,
          message: msg.message,
        } as ChatMessage);
      });
    });
  }
}
