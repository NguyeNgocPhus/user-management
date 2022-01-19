import {GetUserByPhoneNumberOrEmailQueryHandler} from "./user/get-user-by-phoneNumber-or-email.query.handler";
import {GetRoleByCodeOrNameQueryHandler} from "./roles/get-role-by-code-or-name.query";
import {GetUserByPhoneNumberQueryHandler} from "./user/get-user-by-phoneNumber.query.handler";
import {GetProductByIdQueryHandler} from "./product/get-product-by-id.query.handler";


export const QueryHandler = [
    GetUserByPhoneNumberOrEmailQueryHandler,
    GetRoleByCodeOrNameQueryHandler,
    GetUserByPhoneNumberQueryHandler,
    GetProductByIdQueryHandler
];