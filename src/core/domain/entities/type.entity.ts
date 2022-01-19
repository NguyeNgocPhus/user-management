import {Entity} from "typeorm/decorator/entity/Entity";
import {BaseEnity} from "./base.entity";
import {Column, JoinTable, ManyToMany, OneToMany} from "typeorm";
import {AutoMap} from "@automapper/classes";
import {TypeEnum} from "../common/enum/type.status";
import {ProductRealModel} from "./product.entity";


@Entity()
export class TypeReadModel extends BaseEnity {
    @Column({
        unique:true
    })
    @AutoMap()
    name: string;

    @Column()
    @AutoMap()
    normalizeName: string;

    @Column()
    @AutoMap()
    description: string;

    @Column()
    @AutoMap()
    type:string;

    @OneToMany(()=> ProductRealModel,(product)=>product.types)
    products: ProductRealModel[]
}