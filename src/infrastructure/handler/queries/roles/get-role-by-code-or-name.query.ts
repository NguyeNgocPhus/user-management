import {GetRoleByCodeOrNameQuery} from "../../../../core/application/queries/role/get-role-by-code-or-name.query";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {RoleRepository} from "../../../repositories/role.repository";


@QueryHandler(GetRoleByCodeOrNameQuery)
export class GetRoleByCodeOrNameQueryHandler implements IQueryHandler<GetRoleByCodeOrNameQuery>{
    constructor(private roleRepository:RoleRepository) {
    }
    async execute(query: GetRoleByCodeOrNameQuery): Promise<any> {
        return await  this.roleRepository.getRoleByCodeOrName(query.name,query.code);
    }
}