import { ProductRealModel } from './product.entity';
import { UserStatus } from './../common/enum/user.status';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEnity } from './base.entity';
import {RoleReadModel} from "./role.entity";

@Entity()
export class UserReadModel extends  BaseEnity{
  @Column()
  name: string;

  @Column()
  normalizedName: string;

  @Column()
  email: string;

  @Column({
    nullable: true
  })
  phoneNumber: string;

  @Column({
    nullable: true
  })
  avatarPhoto ?: string;
  @Column({
    default: true
  })
  passwordChangeRequired: boolean;

  @Column({
    nullable: true
  })
  passwordValidUntilDate: Date;

  @Column({
    nullable: true
  })
  passwordHash: string;

  @Column({
    nullable: true,
  })
  lockoutEnd: Date;

  @Column({
    nullable: true,
  })
  passwordHashTemporary?: string;

  @Column({
    default: true
  })
  lockoutEnabled: boolean;
  @Column({
    default: 0
  })
  accessFailCount: number;

  @Column({type: 'enum', enum: UserStatus, default: UserStatus.Active})
  status: UserStatus;

  @OneToMany(() => ProductRealModel, (type) => type.user)
  products: ProductRealModel[];

  @ManyToMany(() => RoleReadModel, (roles) => roles.users)
  roles: RoleReadModel[];
}
