import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { ShuttleModule } from '../shuttle/shuttle.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ShuttleModule, PrismaModule],
  providers: [SyncService],
})
export class SyncModule {}
