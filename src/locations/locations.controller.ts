import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './locations.entity';
import { LocationsService } from './locations.service';
import { DataPoint } from 'src/dataPoints/data-points.entity';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('all')
  getLocations(): Promise<Location[]> {
    return this.locationsService.getLocations();
  }

  @Get(':id')
  getLocationById(@Param('id') id: number): Promise<Location> {
    return this.locationsService.getLocationById(Number(id));
  }

  @Get(':id/data')
  getLocationWithDataByLocationId(
    @Param('id') id: number,
  ): Promise<{ location: Location; data: DataPoint[] }> {
    return this.locationsService.getLocationWithDataByLocationId(Number(id));
  }

  @Post('create')
  createNewLocation(@Body() locationDto: CreateLocationDto): Promise<Location> {
    return this.locationsService.createNewLocation(locationDto);
  }
}
