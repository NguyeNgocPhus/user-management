import { createUserCommnadHandler } from './user/create-user.commands.handler';
import {CreateRoleCommandHandler} from "./role/create-role.command.handler";
import {ChangePasswordFirstLoginCommandHandler} from "./user/change-password-first-login.command.handler";
import {SignInWithPasswordCommandHandler} from "./user/sign-in-with-password.command.handler";
import {ChangePasswordCommandHandler} from "./user/change-password.command.handler";
import {CreateTypeCommandHandler} from "./type/create-type.command.handler";
import {CreateProductCommandHandler} from "./product/create-product.command.handler";
import {AddPictureCommandHandler} from "./pictures/add-picture-command.handler";
export const CommandHandler = [
    createUserCommnadHandler,
    CreateRoleCommandHandler,
    ChangePasswordFirstLoginCommandHandler,
    SignInWithPasswordCommandHandler,
    ChangePasswordCommandHandler,
    CreateTypeCommandHandler,
    CreateProductCommandHandler,
    AddPictureCommandHandler
];
