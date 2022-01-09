import {GetUserByPhoneNumberOrEmailQueryHandler} from "./user/get-user-by-phoneNumber-or-email.query.handler";
import {GetRoleByCodeOrNameQueryHandler} from "./roles/get-role-by-code-or-name.query";


export const QueryHandler = [GetUserByPhoneNumberOrEmailQueryHandler,GetRoleByCodeOrNameQueryHandler];