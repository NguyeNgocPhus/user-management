import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {CreateTypeCommand} from "../../../../core/application/commands/type/create-type.command";
import {GetTypeByNameQuery} from "../../../../core/application/queries/type/get-type-by-name.query";
import {BadRequestException} from "@nestjs/common";
import {TypeReadModel} from "../../../../core/domain/entities/type.entity";
import {DataTimeHelper, UuidHelper} from "../../../common/helper";
import {TypeRepository} from "../../../repositories/type.repository";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import { TypeDto } from "src/core/domain/dtos/type/type.dto";
import {CreateProductCommand} from "../../../../core/application/commands/product/create-product.command";
import {ProductRealModel} from "../../../../core/domain/entities/product.entity";
import {ProductRepository} from "../../../repositories/product.repo";
import {ProductStatus} from "../../../../core/domain/common/enum/product.status";
import {ProductDto} from "../../../../core/domain/dtos/product/product.dto";


@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler<CreateProductCommand>{
    constructor(private queryBus : QueryBus,private typeRepository : TypeRepository,
                private productRepository:ProductRepository,
                @InjectMapper() private mapper : Mapper
    ) {
    }
    async execute(command: CreateProductCommand): Promise<any> {

        const existType : TypeReadModel = await this.typeRepository.getTypeByIdAsync(command.payload.type);

        //console.log(existType);
        const productData = this.productRepository.create(
            {
                id:UuidHelper.newUuid(),
                name:command.payload.name,
                normalizedName:command.payload.normalizedName,
                price:command.payload.price,
                quantity:command.payload.quantity,
                size:command.payload.size,
                status:ProductStatus.sale,
                sellNumber:0,
                image:command.payload.image,
                sale:0,
                color:command.payload.color,
                description:command.payload.description,
                createdDate:DataTimeHelper.getNowUnix(),
                createdById:command.claim.id,
                createdByName:command.claim.name,
                modifiedById:command.claim.id,
                modifiedByName:command.claim.name,
                modifiedDate:DataTimeHelper.getNowUnix()

            }
        )
        productData.types = existType;
        await  this.productRepository.addProductAsync(productData);
        return  this.mapper.map(productData,ProductDto,ProductRealModel);


    }
}