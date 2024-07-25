import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { DataTemplateType } from '../Models/Models';

@Entity()
export class DataPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  templateType: DataTemplateType;

  @Column('json')
  data: string;

  @Column('point')
  coordinates: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('point')
  locationId: number;
}
