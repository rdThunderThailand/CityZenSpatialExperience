import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async getDeviceConfig(id: string) {
    return this.prisma.device.findUnique({
      where: { id },
      include: { zone: true },
    });
  }

  async getAllZones() {
    return this.prisma.zone.findMany();
  }
}
