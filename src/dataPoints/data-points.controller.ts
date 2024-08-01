import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDataPointDto } from './dto/create-data-point.dto';
import { DataPoint } from './data-points.entity';
import { DataPointsService } from './data-points.service';

@Controller('data-points')
export class DataPointsController {
  constructor(private readonly dataPointsService: DataPointsService) {}

  @Get('data/:id')
  getDataPointById(@Param('id') id: number): Promise<DataPoint> {
    return this.dataPointsService.getDataPointById(Number(id));
  }

  @Post('data/create')
  createNewData(@Body() dataPointDto: CreateDataPointDto): Promise<DataPoint> {
    return this.dataPointsService.createNewData(dataPointDto);
  }

  @Get('location/:locationId/data')
  getDataByLocation(
    @Param('locationId') locationId: number,
  ): Promise<DataPoint[]> {
    console.log(locationId);
    return this.dataPointsService.getDataByLocation(Number(locationId));
  }
}
