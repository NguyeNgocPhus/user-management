import { CreateUserRequestDto } from '../../../domain/dtos/user/create-user-request.dto';
import {Claims} from "../../../../infrastructure/common/authentication/claims/claims";
export class createUserCommands {
  constructor(public readonly payload: CreateUserRequestDto, public readonly claim:Claims) {}
}
