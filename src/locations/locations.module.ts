import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './locations.entity';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { DataPointsModule } from 'src/dataPoints/data-points.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), DataPointsModule],
  providers: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
