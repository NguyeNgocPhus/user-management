import { Claims } from "src/infrastructure/common/authentication/claims/claims";
import {ChangePasswordRequestDto} from "../../../domain/dtos/user/change-passoword-request.dto";

export class ChangePasswordCommand {
    constructor(public readonly payload : ChangePasswordRequestDto,public readonly claim:Claims) {
    }
}