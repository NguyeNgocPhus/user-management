import { LocalAuthGuard } from './../common/authentication/guards/local-auth.guard';
import { CreateProductRequestDto } from './../../core/domain/dtos/product/create-product-request.dto';
import { ProductDto } from './../../core/domain/dtos/product/product.dto';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class ProductResolver {
  constructor() {}

  @Query((returns) => String)
  async GetListProduct() {
    return 'dm123123';
  }

  @Mutation((returns) => ProductDto, { description: 'add product async' })
  async AddProductAsync(
    @Args('params') data: CreateProductRequestDto,
  ): Promise<any> {
    console.log(data);
    return;
  }
}
