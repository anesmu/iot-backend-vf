import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DevicesModule } from './devices/devices.module';
import { getMongoConfig } from './config/database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: getMongoConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    DevicesModule,
  ],
})
export class AppModule { }
