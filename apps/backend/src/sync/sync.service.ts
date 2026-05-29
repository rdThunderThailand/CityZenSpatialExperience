import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ShuttleGateway } from '../shuttle/shuttle.gateway';
import { PrismaService } from '../prisma/prisma.service';

// Mock path coordinates near Nong Nooch Garden (Lng, Lat)
const SHUTTLE_A_PATH = [
  [100.9304, 12.7663],
  [100.9305, 12.7664],
  [100.9306, 12.7665],
  [100.9307, 12.7666],
  [100.9308, 12.7667],
  [100.9309, 12.7668],
];

const SHUTTLE_B_PATH = [
  [100.931, 12.765],
  [100.9311, 12.7651],
  [100.9312, 12.7652],
  [100.9313, 12.7653],
  [100.9314, 12.7654],
  [100.9315, 12.7655],
];

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  private stepA = 0;
  private stepB = 0;
  private directionA = 1;
  private directionB = 1;

  constructor(
    private readonly shuttleGateway: ShuttleGateway,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async handleShuttleSync() {
    // Animate Shuttle A back and forth
    const coordsA = SHUTTLE_A_PATH[this.stepA];
    this.shuttleGateway.server.emit('shuttle_moved', {
      id: 'shuttle-a',
      location: coordsA,
    });
    this.stepA += this.directionA;
    if (this.stepA >= SHUTTLE_A_PATH.length - 1 || this.stepA <= 0) {
      this.directionA *= -1;

      // Log an analytics event when the shuttle reverses at the end of a route
      try {
        await this.prisma.analyticsEvent.create({
          data: {
            eventType: 'shuttle_waypoint_reached',
            metadata: { shuttleId: 'shuttle-a', location: coordsA },
          },
        });
        this.logger.debug('Logged AnalyticsEvent to Database for Shuttle A');
      } catch (e) {
        this.logger.error(
          'Failed to log to Prisma database (make sure DB is running)',
          e,
        );
      }
    }

    // Animate Shuttle B back and forth
    const coordsB = SHUTTLE_B_PATH[this.stepB];
    this.shuttleGateway.server.emit('shuttle_moved', {
      id: 'shuttle-b',
      location: coordsB,
    });
    this.stepB += this.directionB;
    if (this.stepB >= SHUTTLE_B_PATH.length - 1 || this.stepB <= 0) {
      this.directionB *= -1;
    }

    // this.logger.debug(`Emitted mock shuttle positions`);
  }
}
