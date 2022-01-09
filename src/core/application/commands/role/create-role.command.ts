import {CreateRoleRequestDto} from "../../../domain/dtos/role/create-role-request.dto";
import {Claims} from "../../../../infrastructure/common/authentication/claims/claims";


export class CreateRoleCommand {
    constructor(public readonly payload: CreateRoleRequestDto,public readonly claims:Claims) {
    }
}