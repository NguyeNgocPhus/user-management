import {IQueryHandler,QueryHandler} from "@nestjs/cqrs";
import {GetProductByIdQuery} from "../../../../core/application/queries/product/get-product-by-id.query";
import {ProductRepository} from "../../../repositories/product.repo";
import {ProductDto} from "../../../../core/domain/dtos/product/product.dto";
import {ProductRealModel} from "../../../../core/domain/entities/product.entity";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";


@QueryHandler(GetProductByIdQuery)
export class GetProductByIdQueryHandler implements IQueryHandler<GetProductByIdQuery>{
    constructor(private productRepository:ProductRepository,@InjectMapper() private mapper: Mapper ) {

    }

    async execute(query: GetProductByIdQuery): Promise<any> {
        const product=  await this.productRepository.getProductByIdAsync(query.id)

        return this.mapper.mapArray(product,ProductDto,ProductRealModel)[0]

    }
}