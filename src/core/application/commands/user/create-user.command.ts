import { CreateUserRequestDto } from './../../../domain/dtos/user/create-user-request.dto';
export class createUserCommands {
  constructor(public readonly data: CreateUserRequestDto) {}
}
