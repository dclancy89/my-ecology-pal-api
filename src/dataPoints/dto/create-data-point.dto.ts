import { DataTemplateType } from 'src/Models/Models';

export class CreateDataPointDto {
  templateType: DataTemplateType;
  data: string;
  lat: string;
  lon: string;
  locationId: number;
}
