import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetUserByPhoneNumberOrEmailQuery} from "../../../../core/application/queries/user/get-user-by-phoneNumber-or-Email.query";
import {UserRepository} from "../../../repositories/user.repository";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {UserDto} from "../../../../core/domain/dtos/user/user.dto";
import {UserReadModel} from "../../../../core/domain/entities/user.entity";


@QueryHandler(GetUserByPhoneNumberOrEmailQuery)
export class GetUserByPhoneNumberOrEmailQueryHandler implements IQueryHandler<GetUserByPhoneNumberOrEmailQuery>{

    constructor(private userRepository : UserRepository,@InjectMapper()private mapper:Mapper) {
    }

    async execute(query:GetUserByPhoneNumberOrEmailQuery){
        const data =await this.userRepository.getUserByEmailOrPhoneNumber(query.email,query.phoneNumber);

        return this.mapper.map(data,UserDto,UserReadModel);
    }
}