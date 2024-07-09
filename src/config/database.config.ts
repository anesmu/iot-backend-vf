import { MongooseModuleOptions } from '@nestjs/mongoose'

export const getMongoConfig = (): MongooseModuleOptions => ({
  uri: 'mongodb+srv://anesmu:fYdGKQfVn59uHPxv@iot.w5ratxv.mongodb.net/iot?retryWrites=true&w=majority&appName=IOT',
})
