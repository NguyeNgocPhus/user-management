import {IQueryHandler,QueryHandler} from "@nestjs/cqrs";
import {GetProductByIdQuery} from "../../../../core/application/queries/product/get-product-by-id.query";
import {ProductRepository} from "../../../repositories/product.repository";


@QueryHandler(GetProductByIdQuery)
export class GetProductByIdQueryHandler implements IQueryHandler<GetProductByIdQuery>{
    constructor(private productRepository:ProductRepository) {

    }

    async execute(query: GetProductByIdQuery): Promise<any> {
        return await this.productRepository.getProductByIdAsync(query.id);
    }
}