import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDataPointDto } from './dto/create-data-point.dto';
import { DataPoint } from './data-points.entity';

@Injectable()
export class DataPointsService {
  constructor(
    @InjectRepository(DataPoint)
    private readonly dataPointsRepository: Repository<DataPoint>,
  ) {}

  async getDataPointById(id: number): Promise<DataPoint> {
    return this.dataPointsRepository.findOneBy({ id: id });
  }

  async createNewData(dataPointDto: CreateDataPointDto): Promise<DataPoint> {
    const data = new DataPoint();
    data.locationId = dataPointDto.locationId;
    data.templateType = dataPointDto.templateType;
    data.coordinates = dataPointDto.coordinates;
    data.data = dataPointDto.data;
    return this.dataPointsRepository.save(data);
  }

  async getDataByLocation(locationId: number): Promise<DataPoint[]> {
    return this.dataPointsRepository.findBy({ locationId: locationId });
  }
}
