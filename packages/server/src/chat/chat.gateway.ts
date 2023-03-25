import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WsException } from '@nestjs/websockets/errors';
import { Socket, Server } from 'socket.io';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets/decorators';
import { randomUUID } from 'crypto';

@WebSocketGateway(8000, {
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private clients: Map<Socket, Socket> = new Map();

  public handleConnection(client: Socket) {
    this.clients.set(client, client);
  }

  public handleDisconnect(client: Socket) {
    client.clientId = randomUUID();
    this.clients.delete(client);
  }

  @SubscribeMessage('message')
  public handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }

  public forceDisconnect(client: Socket, message: string) {
    client.emit(
      'unauthorized',
      new WsException({ type: 'error', text: message }),
    );
    client.disconnect();
  }
}
