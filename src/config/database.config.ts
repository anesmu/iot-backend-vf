import { MongooseModuleOptions } from '@nestjs/mongoose'

export const getMongoConfig = (): MongooseModuleOptions => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost/iot'
  return {
    uri,
  }
}
