
import {GetUserByPhoneNumberQuery} from "../../../../core/application/queries/user/get-user-by-phoneNumber.query";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {UserRepository} from "../../../repositories/user.repository";


@QueryHandler(GetUserByPhoneNumberQuery)
export class GetUserByPhoneNumberQueryHandler implements IQueryHandler{
    constructor(private userRepository: UserRepository) {
    }
    async execute(query: GetUserByPhoneNumberQuery): Promise<any> {
        return await  this.userRepository.getUserByPhoneNumber(query.phoneNumber);
    }
}