import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ShuttleGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Example endpoint to mock a shuttle moving
  @SubscribeMessage('simulate_shuttle_move')
  handleShuttleMove(@MessageBody() data: any): void {
    // Broadcast the movement to all connected screens (Kiosks/Monitors)
    this.server.emit('shuttle_moved', data);
  }

  // Real-world scenario: A cron job would fetch from thunder_core_prj
  // and then call this.server.emit('shuttle_moved', ...)
}
