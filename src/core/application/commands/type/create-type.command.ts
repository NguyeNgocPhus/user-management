import {CreateTypeRequestDto} from "../../../domain/dtos/type/create-type-request.dto";
import {Claims} from "../../../../infrastructure/common/authentication/claims/claims";

export class CreateTypeCommand {
    constructor(public readonly payload:CreateTypeRequestDto,public readonly claim : Claims) {
    }

}