import {IQueryHandler,QueryHandler} from "@nestjs/cqrs";
import {ProductRepository} from "../../../repositories/product.repo";
import {GetAllProductQuery} from "../../../../core/application/queries/product/get-all-product.query";
import {Inject} from "@nestjs/common";
import {Mapper} from "@automapper/core";
import {ProductDto} from "../../../../core/domain/dtos/product/product.dto";
import {ProductRealModel} from "../../../../core/domain/entities/product.entity";
import {InjectMapper} from "@automapper/nestjs";


@QueryHandler(GetAllProductQuery)
export class GetAllQueryHandler implements IQueryHandler<GetAllProductQuery>{
    constructor(private productRepository:ProductRepository ,@InjectMapper() private mapper: Mapper ) {

    }

    async execute(query: GetAllProductQuery): Promise<any> {
        const products =  await this.productRepository.getAllProductAsync();

        return this.mapper.mapArray(products,ProductDto,ProductRealModel)
    }
}