import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'devices' })
export class Device extends Document {
  @Prop()
  name: string

  @Prop()
  mobileNumber: string

  @Prop()
  lastConnection: string

  @Prop()
  latitude: number

  @Prop()
  longitude: number
}

export const DeviceSchema = SchemaFactory.createForClass(Device)
