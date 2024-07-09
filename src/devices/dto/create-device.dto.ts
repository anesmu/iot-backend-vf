import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  mobileNumber: string

  @IsNotEmpty()
  lastConnection: string

  @IsNotEmpty()
  @IsNumber()
  latitude: number

  @IsNotEmpty()
  @IsNumber()
  longitude: number
}
