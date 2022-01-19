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
import {AutoMap} from "@automapper/classes";

@Entity()
export class UserReadModel extends  BaseEnity{
  @AutoMap()
  @Column()
  name: string;
  @AutoMap()
  @Column()
  normalizedName: string;
  @AutoMap()
  @Column()
  email: string;
  @AutoMap()
  @Column({
    nullable: true
  })
  phoneNumber: string;
  @AutoMap()
  @Column({
    nullable: true
  })
  avatarPhoto ?: string;
  @AutoMap()
  @Column({
    default: true
  })
  passwordChangeRequired: boolean;
  @AutoMap()
  @Column({
    nullable: true
  })
  passwordValidUntilDate: Date;
  @AutoMap()
  @Column({
    nullable: true
  })
  passwordHash: string;
  @AutoMap()
  @Column({
    nullable: true,
  })
  lockoutEnd: Date;
  @AutoMap()
  @Column({
    nullable: true,
  })
  passwordHashTemporary?: string;
  @AutoMap()
  @Column({
    default: true
  })
  lockoutEnabled: boolean;
  @AutoMap()
  @Column({
    default: 0
  })
  accessFailCount: number;
  @AutoMap()
  @Column({type: 'enum', enum: UserStatus, default: UserStatus.Active})
  status: UserStatus;


  @ManyToMany(() => RoleReadModel, (roles) => roles.users)
  roles: RoleReadModel[];
}
