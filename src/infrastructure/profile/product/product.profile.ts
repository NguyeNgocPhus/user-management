import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {mapFrom, Mapper, MappingProfile, mapWithArguments} from "@automapper/core";
import {Injectable} from "@nestjs/common";
import {currentUserResolver} from "../resolver/current-user.profile";
import {CreateTypeRequestDto} from "../../../core/domain/dtos/type/create-type-request.dto";
import {CreateTypeCommand} from "../../../core/application/commands/type/create-type.command";
import {CreateProductRequestDto} from "../../../core/domain/dtos/product/create-product-request.dto";
import {CreateProductCommand} from "../../../core/application/commands/product/create-product.command";
import {ProductRealModel} from "../../../core/domain/entities/product.entity";
import {ProductDto} from "../../../core/domain/dtos/product/product.dto";


@Injectable()
export class ProductProfile extends  AutomapperProfile{
    constructor(@InjectMapper() public mapper:Mapper) {
        super(mapper);
    }
    mapProfile(): MappingProfile {
        return mapper =>{
            mapper.createMap(CreateProductRequestDto,CreateProductCommand)
                .forMember((d)=>d.payload,mapFrom(s=>s))
                .forMember((d)=>d.claim,mapWithArguments(currentUserResolver))

            mapper.createMap(ProductRealModel,ProductDto);


        }
    }
}