import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateDeviceDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  mobileNumber: string

  @IsOptional()
  lastConnection: string

  @IsNumber()
  @IsOptional()
  latitude: number

  @IsNumber()
  @IsOptional()
  longitude: number
}
