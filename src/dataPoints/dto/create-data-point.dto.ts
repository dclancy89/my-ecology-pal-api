import { DataTemplateType } from 'src/Models/Models';

export class CreateDataPointDto {
  templateType: DataTemplateType;
  data: string;
  coordinates: string;
  locationId: number;
}
