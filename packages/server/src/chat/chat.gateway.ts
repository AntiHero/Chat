import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets/decorators';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WsResponse } from '@nestjs/websockets/interfaces';
import { WsException } from '@nestjs/websockets/errors';
import { Socket } from 'socket.io';

@WebSocketGateway(8000, {
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients: Map<Socket, string> = new Map();

  public handleConnection(client: Socket) {
    this.clients.set(client, '1');
  }

  public handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  public handleMessage(@MessageBody() data: string): WsResponse<string> {
    return { event: 'message', data };
  }

  public forceDisconnect(client: Socket, message: string) {
    client.emit(
      'unauthorized',
      new WsException({ type: 'error', text: message }),
    );
    client.disconnect();
  }
}
