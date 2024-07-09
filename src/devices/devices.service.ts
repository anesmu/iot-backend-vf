import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device } from './schemas/device.schema'
import { CreateDeviceDto } from './dto/create-device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'
import { Device as DeviceInterface } from '../common/interfaces/device.interface'

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<DeviceInterface>,
  ) {}

  async findAll(): Promise<DeviceInterface[]> {
    return this.deviceModel.find().exec()
  }

  async findOne(id: string): Promise<DeviceInterface> {
    return this.deviceModel.findById(id).exec()
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<DeviceInterface> {
    const newDevice = new this.deviceModel(createDeviceDto)
    return newDevice.save()
  }

  async update(
    id: string,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<DeviceInterface> {
    return this.deviceModel
      .findByIdAndUpdate(id, updateDeviceDto, { new: true })
      .exec()
  }

  async remove(id: string): Promise<void> {
    await this.deviceModel.findByIdAndDelete(id).exec()
  }
}
