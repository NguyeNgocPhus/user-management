import { UserReadModel } from './user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn, OneToMany,
} from 'typeorm';
import { BaseEnity } from './base.entity';
import {ProductStatus} from "../common/enum/product.status";
import {TypeReadModel} from "./type.entity";
import {AutoMap} from "@automapper/classes";
import {PictureReadModel} from "./picture.entity";


@Entity()
export class ProductRealModel extends BaseEnity {
  @Column({
    unique: true,
  })
  @AutoMap()
  name: string;

  @Column({
    unique:true
  })
  @AutoMap()
  normalizedName: string;

  @Column({
    unique:true
  })
  @AutoMap()
  description: string;

  @Column()
  @AutoMap()
  price: number;

  @Column()
  @AutoMap()
  quantity: number;


  @Column("text",{ array: true })
  @AutoMap()
  size: string[];

  @Column()
  @AutoMap()
  color: string;

  @Column({
    unique:true
  })
  @AutoMap()
  image: string;

  @Column({
    default:0
  })
  @AutoMap()
  sellNumber:number;

  @Column({
    default:0
  })
  @AutoMap()
  sale: number;

  @Column({type: 'enum', enum: ProductStatus, default: ProductStatus.sale})
  @AutoMap()
  status: ProductStatus;


  @ManyToOne(()=>TypeReadModel,(type)=>type.products)
  @JoinColumn()
  types : TypeReadModel;

  @OneToMany(()=>PictureReadModel,(picture)=>picture.product)
  pictures: PictureReadModel[];
}
