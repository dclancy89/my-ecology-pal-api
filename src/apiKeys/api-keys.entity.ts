import { AccessLevelsEnum } from 'src/Models/Models';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  key: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  accessLevel: AccessLevelsEnum;
}
