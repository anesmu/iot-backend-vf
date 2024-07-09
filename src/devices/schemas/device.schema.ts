import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'devices' })
export class Device extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  mobileNumber: string

  @Prop({ required: true })
  lastConnection: string

  @Prop({ required: true })
  latitude: number

  @Prop({ required: true })
  longitude: number
}

export const DeviceSchema = SchemaFactory.createForClass(Device)
