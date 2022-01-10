import {ChangePasswordFirstLoginRequestDto} from "../../../domain/dtos/user/change-password-first-login-request.dto";
import {Claims} from "../../../../infrastructure/common/authentication/claims/claims";

export class ChangePasswordFirstLoginCommand {
    constructor(public readonly payload:ChangePasswordFirstLoginRequestDto,public readonly  claim:Claims) {
    }
}