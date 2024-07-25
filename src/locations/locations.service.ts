import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './locations.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  async getLocations(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  async getLocationById(id: number): Promise<Location> {
    return this.locationsRepository.findOneBy({ id: id });
  }

  async createNewLocation(locationDto: CreateLocationDto): Promise<Location> {
    const location = new Location();
    location.name = locationDto.name;
    location.location = locationDto.location;
    location.city = locationDto.city;
    location.state = locationDto.state;

    return this.locationsRepository.save(location);
  }
}
