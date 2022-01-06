import { UserReadModel } from './user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { BaseEnity } from './base.entity';

@Entity()
export class ProductRealModel extends BaseEnity {
  @Column()
  name: string;

  @Column()
  normalizedName: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => UserReadModel, (type) => type.products)
  @JoinColumn({ name: 'userId' })
  user: UserReadModel;
}
