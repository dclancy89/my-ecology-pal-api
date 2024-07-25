import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './locations.entity';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('all')
  getLocations(): Promise<Location[]> {
    return this.locationsService.getLocations();
  }

  @Get('location/:id')
  getLocationById(@Param('id') id: number): Promise<Location> {
    return this.locationsService.getLocationById(Number(id));
  }

  @Post('location/create')
  createNewLocation(@Body() locationDto: CreateLocationDto): Promise<Location> {
    return this.locationsService.createNewLocation(locationDto);
  }
}
