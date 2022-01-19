import {BaseEnity} from "./base.entity";
import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {ProductRealModel} from "./product.entity";

@Entity()
export class PictureReadModel extends BaseEnity{


    @Column()
    name:string;
    @Column()
    mimetype:string;
    @Column()
    productId:string;

    @ManyToOne(()=>ProductRealModel,(product)=>product.pictures,{onDelete:'CASCADE'})
    @JoinColumn({name:'productId'})
    product:ProductRealModel;
}