import { createUserCommnadHandler } from './user/create-user.commands.handler';
import {CreateRoleCommandHandler} from "./role/create-role.command.handler";
import {ChangePasswordFirstLoginCommandHandler} from "./user/change-password-first-login.command.handler";
export const CommandHandler = [
    createUserCommnadHandler,
    CreateRoleCommandHandler,
    ChangePasswordFirstLoginCommandHandler,
];
