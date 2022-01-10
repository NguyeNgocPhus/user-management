import {InitializeUserEventHandler} from "./user/initialize-user.event.handler";
import {InitializeRoleEventHandler} from "./role/initialize-role.event";
import {ChangePasswordFirstLoginCommandHandler} from "./user/change-password-first-login.command.handler";
import {ChangePasswordCommandHandler} from "./user/change-password.command.handler";


export const EventHandler  = [
    InitializeUserEventHandler,
    InitializeRoleEventHandler,
    ChangePasswordFirstLoginCommandHandler,
    ChangePasswordCommandHandler
]