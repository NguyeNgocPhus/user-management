import { ProductRealModel } from './../../core/domain/entities/product.entity';
import { Entity, EntityRepository, Repository } from 'typeorm';
import {Injectable} from "@nestjs/common";


@Injectable()
@EntityRepository(ProductRealModel)
export class ProductRepository extends Repository<ProductRealModel> {
    constructor() {
        super();
    }
    async addProductAsync(product: ProductRealModel){
        return await this.save(product);
    }

    async getProductByIdAsync(id:string){
        return await  this.query(`
            select *
            from product_real_model
            where id = $1
            
        `,[id]);
    }
    async getAllProductAsync(){
        return await  this.query(`
            select *
            from product_real_model
            
        `);
    }

}
