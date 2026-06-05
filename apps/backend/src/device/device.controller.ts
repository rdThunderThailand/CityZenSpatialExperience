import { Controller, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('api')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Get('devices/:id')
  async getDevice(@Param('id') id: string) {
    return this.deviceService.getDeviceConfig(id);
  }

  @Get('zones')
  async getZones() {
    return this.deviceService.getAllZones();
  }
}
