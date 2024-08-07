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

  @Column({ type: 'double precision' })
  lat: number;

  @Column({ type: 'double precision' })
  lon: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  locationId: number;
}
