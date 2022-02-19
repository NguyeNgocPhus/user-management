import {LocalAuthGuard} from './../common/authentication/guards/local-auth.guard';
import {CreateProductRequestDto} from '../../core/domain/dtos/product/create-product-request.dto';
import {ProductDto} from '../../core/domain/dtos/product/product.dto';
import {Resolver, Query, Mutation, Args, Context} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {CreateProductCommand} from "../../core/application/commands/product/create-product.command";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {JwtAuthGuard} from "../common/authentication/guards/jwt-auth.guard";
import {PermissionGuards} from "../common/authorization/guards/permission.guards";
import {Permissions} from "../common/authorization/decorator/permission.decorator";
import {PermConst} from "../../core/application/common/constants/perm.constants";
import {GetProductByIdQuery} from "../../core/application/queries/product/get-product-by-id.query";
import {GetAllProductQuery} from "../../core/application/queries/product/get-all-product.query";
import {ILoggerService} from "../../core/application/common/service/logger.interface";

@Resolver()
export class ProductResolver {
    constructor(@InjectMapper() private mapper: Mapper,
                private commandBus: CommandBus ,
                private queryBus : QueryBus,
                private logger : ILoggerService
                ) {
    }

    @Query((returns) => String)
    async GetListProduct() {
        return 'dm123123';
    }

    @Mutation((returns) => ProductDto, {description: 'add product async'})
    @UseGuards(JwtAuthGuard, PermissionGuards)
    @Permissions(PermConst.ADMIN)
    async AddProductAsync(
        @Args('params') data: CreateProductRequestDto,
        @Context() context
    ): Promise<any> {
        const command = await this.mapper.map(data, CreateProductCommand, CreateProductRequestDto, {extraArguments: {claim: context?.req?.user}})
        const result = await this.commandBus.execute(command);


        return result;
    }

    @Query(()=> [ProductDto])
    async getProductAsync(){
        const query = new GetAllProductQuery();
        const result  = await this.queryBus.execute(query);

        await this.logger.info(this.getProductAsync.name,{...result} )
        return result;
    }
    @Query(()=> ProductDto)
    async getProductByIdAsync(@Args('id') id :string){
        const query = new GetProductByIdQuery(id);
        const result  = await this.queryBus.execute(query);
        return result;
    }



}
 // '{"query":"mutation UploadAvatar($picture:any){\n  uploadAvatar(file:$picture)\n}"}'
// '{"query":"mutation AddProfilePicture($picture:Upload!){\n  addProfilePicture(picture:$picture)\n}"}'