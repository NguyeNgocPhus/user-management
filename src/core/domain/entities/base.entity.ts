import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEnity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdDate: number;

  @Column()
  modifiedById: string;

  @Column()
  modifiedDate: number;

  @Column()
  modifiedByName: string;

  @Column()
  createdByName: string;

  @Column()
  createdById: string;
}
