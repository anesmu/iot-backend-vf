import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DevicesService } from './devices.service'
import { DevicesResolver } from './devices.resolver'
import { Device, DeviceSchema } from './schemas/device.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  providers: [DevicesService, DevicesResolver],
})
export class DevicesModule {}
