import { Test, TestingModule } from '@nestjs/testing'
import { DevicesResolver } from './devices.resolver'
import { DevicesService } from './devices.service'
import { getModelToken } from '@nestjs/mongoose'
import { Device } from './schemas/device.schema'

const mockDevice = {
  _id: '1',
  name: 'Test Device',
  mobileNumber: '1234567890',
  lastConnection: '2024-07-08T12:34:56Z',
  latitude: 40.7128,
  longitude: -74.006,
}

describe('DevicesResolver', () => {
  let resolver: DevicesResolver
  let service: DevicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesResolver,
        DevicesService,
        {
          provide: getModelToken(Device.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockDevice),
            constructor: jest.fn().mockResolvedValue(mockDevice),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn().mockResolvedValue(mockDevice),
            exec: jest.fn(),
          },
        },
      ],
    }).compile()

    resolver = module.get<DevicesResolver>(DevicesResolver)
    service = module.get<DevicesService>(DevicesService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a new device', async () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce({
      ...mockDevice,
    })
    const newDevice = await resolver.createDevice(mockDevice)
    expect(newDevice).toEqual({
      ...mockDevice,
    })
  })

  it('should return all devices', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([mockDevice])
    const devices = await resolver.findAll()
    expect(devices).toEqual([mockDevice])
  })

  it('should return a device by ID', async () => {
    const id = '1'
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockDevice)
    const device = await resolver.findOne(id)
    expect(device).toEqual(mockDevice)
  })

  it('should update a device', async () => {
    const id = '1'
    const updateData = { name: 'Updated Device' }
    jest.spyOn(service, 'update').mockResolvedValueOnce({
      ...mockDevice,
      ...updateData,
    })
    const updatedDevice = await resolver.updateDevice(id, updateData)
    expect(updatedDevice).toEqual({
      ...mockDevice,
      ...updateData,
    })
  })

  it('should delete a device', async () => {
    const id = '1'
    jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined)
    const result = await resolver.deleteDevice(id)
    expect(result).toBe(true)
  })
})
