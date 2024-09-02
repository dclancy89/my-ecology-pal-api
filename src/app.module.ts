import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DataPointsModule } from './dataPoints/data-points.module';
import { LocationsModule } from './locations/locations.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './Guards/apiKey.guard';
import { ApiKeysModule } from './apiKeys/api-keys.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      legacySpatialSupport: false,
    }),
    DataPointsModule,
    LocationsModule,
    ApiKeysModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
