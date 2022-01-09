import { createUserCommnadHandler } from './user/create-user.commands.handler';
import {CreateRoleCommandHandler} from "./role/create-role.command.handler";
export const CommandHandler = [createUserCommnadHandler,CreateRoleCommandHandler];
