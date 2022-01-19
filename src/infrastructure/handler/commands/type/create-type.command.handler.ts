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


@CommandHandler(CreateTypeCommand)
export class CreateTypeCommandHandler implements ICommandHandler<CreateTypeCommand>{
    constructor(private queryBus : QueryBus,private typeRepository : TypeRepository,
                @InjectMapper() private mapper : Mapper
                ) {
    }
    async execute(command: CreateTypeCommand): Promise<any> {
        // const query =  new GetTypeByNameQuery(command.payload.name);
        // const existType = await this.queryBus.execute(query);
        //
        // if(existType){
        //     throw new BadRequestException("something wrong");
        // }

        const typeReadModel =   new TypeReadModel()
        typeReadModel.id = UuidHelper.newUuid();
        typeReadModel.name = command.payload.name;
        typeReadModel.normalizeName  = command.payload.name.toUpperCase();
        typeReadModel.type = command.payload.type;
        typeReadModel.modifiedByName = command.claim.name;
        typeReadModel.modifiedById = command.claim.id;
        typeReadModel.modifiedDate = DataTimeHelper.getNowUnix();
        typeReadModel.createdById = command.claim.id;
        typeReadModel.createdByName = command.claim.name;
        typeReadModel.createdDate = DataTimeHelper.getNowUnix();
        typeReadModel.description = command.payload.description;
        await this.typeRepository.addTypeAsync(typeReadModel);

        return this.mapper.map(typeReadModel,TypeDto,TypeReadModel);



    }
}