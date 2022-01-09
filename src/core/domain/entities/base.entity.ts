import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {AutoMap} from "@automapper/classes";

export class BaseEnity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({
    nullable:false
  })
  @AutoMap()
  createdDate: number;

  @Column({
    nullable:false
  })
  @AutoMap()
  modifiedById: string;

  @Column({
    nullable:false
  })
  @AutoMap()
  modifiedDate: number;

  @Column({
    nullable:false
  })
  @AutoMap()
  modifiedByName: string;

  @Column({
    nullable:false
  })
  @AutoMap()
  createdByName: string;

  @Column({
    nullable:false
  })
  @AutoMap()
  createdById: string;
}
