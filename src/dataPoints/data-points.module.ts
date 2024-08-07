import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataPoint } from './data-points.entity';
import { DataPointsController } from './data-points.controller';
import { DataPointsService } from './data-points.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataPoint])],
  providers: [DataPointsService],
  controllers: [DataPointsController],
  exports: [DataPointsService],
})
export class DataPointsModule {}
