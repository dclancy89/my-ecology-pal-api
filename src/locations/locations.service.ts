import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './locations.entity';
import { DataPoint } from 'src/dataPoints/data-points.entity';
import { DataPointsService } from 'src/dataPoints/data-points.service';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
    @Inject()
    private readonly dataPointsService: DataPointsService,
  ) {}

  async getLocations(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  async getLocationById(id: number): Promise<Location> {
    return this.locationsRepository.findOneBy({ id: id });
  }

  async getLocationWithDataByLocationId(
    id: number,
  ): Promise<{ location: Location; data: DataPoint[] }> {
    const location = await this.locationsRepository.findOneBy({ id: id });
    const dataPoints = await this.dataPointsService.getDataByLocation(
      Number(location.id),
    );
    return { location: location, data: dataPoints };
  }

  async createNewLocation(locationDto: CreateLocationDto): Promise<Location> {
    console.log(locationDto);
    const location = new Location();
    location.name = locationDto.name;
    location.lat = Number(locationDto.lat);
    location.lon = Number(locationDto.lon);
    location.city = locationDto.city;
    location.state = locationDto.state;

    return this.locationsRepository.save(location);
  }
}
