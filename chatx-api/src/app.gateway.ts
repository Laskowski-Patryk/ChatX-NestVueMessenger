import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message/message.service';

@WebSocketGateway(3001)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(
    client: Socket,
    message: any,
  ):Promise<any> {
    let x;
    if(message.message) x = message.message;
    if(message.room != "global"){
    x = await this.messageService.send(
      message.message.msg,
      message.message.user,
      message.message.user2,
    );
    }
    this.wss.to(message.room).emit('msgToClient', x);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    this.logger.log(` ${client.id} joined room ${room}`);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    this.logger.log(` ${client.id} left room ${room}`);
    client.emit('leftRoom', room);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
