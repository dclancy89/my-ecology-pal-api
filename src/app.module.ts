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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'my_ecology_pal',
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
