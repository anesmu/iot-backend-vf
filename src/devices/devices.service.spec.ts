import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { DevicesService } from './devices.service'
import { Device } from './schemas/device.schema'

const mockDevice = {
  _id: '1',
  name: 'Test Device',
  mobileNumber: '1234567890',
  lastConnection: '2024-07-08T12:34:56Z',
  latitude: 40.7128,
  longitude: -74.006,
}

const mockDeviceModel: any = jest.fn().mockImplementation(() => ({
  save: jest.fn().mockResolvedValue(mockDevice),
}))

mockDeviceModel.create = jest.fn().mockResolvedValue(mockDevice)
mockDeviceModel.find = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValueOnce([mockDevice]),
})
mockDeviceModel.findById = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValueOnce(mockDevice),
})
mockDeviceModel.findByIdAndUpdate = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValueOnce({
    ...mockDevice,
    name: 'Updated Device',
  }),
})
mockDeviceModel.findByIdAndDelete = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValueOnce(mockDevice),
})

describe('DevicesService', () => {
  let service: DevicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: getModelToken(Device.name),
          useValue: mockDeviceModel,
        },
      ],
    }).compile()

    service = module.get<DevicesService>(DevicesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new device', async () => {
    const newDevice = await service.create(mockDevice)
    expect(newDevice).toEqual(mockDevice)
    expect(mockDeviceModel).toHaveBeenCalledTimes(1)
    expect(mockDeviceModel).toHaveBeenCalledWith(mockDevice)
  })

  it('should return all devices', async () => {
    const devices = await service.findAll()
    expect(devices).toEqual([mockDevice])
  })

  it('should return a device by ID', async () => {
    const device = await service.findOne('1')
    expect(device).toEqual(mockDevice)
  })

  it('should update a device', async () => {
    const updateData = { name: 'Updated Device' }
    const updatedDevice = await service.update('1', updateData)
    expect(updatedDevice.name).toEqual(updateData.name)
  })

  it('should delete a device', async () => {
    await service.remove('1')
    expect(mockDeviceModel.findByIdAndDelete).toHaveBeenCalledWith('1')
  })
})
