import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { DevicesService } from './devices.service'
import { Device } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
import { Device as DeviceInterface } from '../common/interfaces/device.interface'

@Resolver(() => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Query(() => [Device], { name: 'devices' })
  async findAll(): Promise<DeviceInterface[]> {
    return this.devicesService.findAll()
  }

  @Query(() => Device, { name: 'device' })
  async findOne(@Args('id') id: string): Promise<DeviceInterface> {
    console.log('findOne id:', id)
    return this.devicesService.findOne(id)
  }

  @Mutation(() => Device)
  async createDevice(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceDto,
  ): Promise<DeviceInterface> {
    console.log('createDevice input:', createDeviceInput)
    return this.devicesService.create(createDeviceInput)
  }

  @Mutation(() => Device)
  async updateDevice(
    @Args('id') id: string,
    @Args('updateDeviceInput') updateDeviceInput: UpdateDeviceDto,
  ): Promise<DeviceInterface> {
    console.log('updateDevice id:', id)
    console.log('updateDevice input:', updateDeviceInput)
    return this.devicesService.update(id, updateDeviceInput)
  }

  @Mutation(() => Boolean)
  async deleteDevice(@Args('id') id: string): Promise<boolean> {
    console.log('deleteDevice id:', id)
    await this.devicesService.remove(id)
    return true
  }
}
