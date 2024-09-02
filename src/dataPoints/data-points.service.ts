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

  async createNewData(dataPointDtos: CreateDataPointDto[]): Promise<void> {
    for (const dataPointDto of dataPointDtos) {
      const data = new DataPoint();
      data.locationId = dataPointDto.locationId;
      data.templateType = dataPointDto.templateType;
      data.lat = Number(dataPointDto.lat);
      data.lon = Number(dataPointDto.lon);
      data.data = dataPointDto.data;
      data.recordedAt = dataPointDto.recordedAt;
      this.dataPointsRepository.save(data);
    }
  }

  async getDataByLocation(locationId: number): Promise<DataPoint[]> {
    console.log(locationId);
    return this.dataPointsRepository.findBy({ locationId: locationId });
  }
}
