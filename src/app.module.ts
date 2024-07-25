import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DataPointsModule } from './dataPoints/data-points.module';
import { LocationsModule } from './locations/locations.module';

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
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
