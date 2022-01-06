import { ProductRealModel } from './product.entity';
import { UserStatus } from './../common/enum/user.status';
import {} from '@nestjs/common';
import {} from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEnity } from './base.entity';

@Entity()
export class UserReadModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  normalizedName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @OneToMany(() => ProductRealModel, (type) => type.user)
  products: ProductRealModel[];
}
