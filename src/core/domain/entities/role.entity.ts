import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEnity} from "./base.entity";
import {RoleStatus} from "../common/enum/role.status";
import {Column, JoinTable, ManyToMany} from "typeorm";
import {UserReadModel} from "./user.entity";
import {AutoMap} from "@automapper/classes";


@Entity()
export class RoleReadModel extends BaseEnity {
    @Column()
    @AutoMap()
    code: string;

    @Column()
    @AutoMap()
    name: string;

    @Column()
    @AutoMap()
    normalizeName: string;

    @Column()
    @AutoMap()
    description: string;

    @Column({
        type: 'enum',
        enum: RoleStatus,
        default: RoleStatus.Active
    })
    status: RoleStatus;

    @ManyToMany(() => UserReadModel, (users) => users.roles)
    @JoinTable({
        name: "user_role_read_model",
        joinColumn: {name: "roleId", referencedColumnName: "id"},
        inverseJoinColumn: {name: "userId"}
    })
    users: UserReadModel[];
}