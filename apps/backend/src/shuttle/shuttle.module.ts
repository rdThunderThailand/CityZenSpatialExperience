import { Module } from '@nestjs/common';
import { ShuttleGateway } from './shuttle.gateway';

@Module({
  providers: [ShuttleGateway],
  exports: [ShuttleGateway],
})
export class ShuttleModule {}
