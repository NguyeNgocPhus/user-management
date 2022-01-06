import { createUserCommands } from 'src/core/application/commands/user/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserReposiroty } from 'src/infrastructure/repositories/user.repository';

@CommandHandler(createUserCommands)
export class createUserCommnadHandler
  implements ICommandHandler<createUserCommands>
{
  constructor(private userRepository: UserReposiroty) {}
  async execute(command: createUserCommands): Promise<any> {
    return await this.userRepository.createUserAsync(command.data);
  }
}
