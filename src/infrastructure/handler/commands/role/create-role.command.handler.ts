import {CreateRoleCommand} from "../../../../core/application/commands/role/create-role.command";
import {CommandHandler, EventBus, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {GetRoleByCodeOrNameQuery} from "../../../../core/application/queries/role/get-role-by-code-or-name.query";
import {DuplicatedItemException} from "../../../../core/domain/exceptions/DuplicatedItem.exception";
import {DataTimeHelper, UuidHelper} from "../../../common/helper";
import {RoleAggregatesRoot} from "../../../../core/domain/aggregates/role.aggregates";
import {RoleStatus} from "../../../../core/domain/common/enum/role.status";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {RoleDto} from "../../../../core/domain/dtos/role/role.dto";


@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand> {
    constructor(private queryBus: QueryBus,private eventBus:EventBus,@InjectMapper() private mapper:Mapper) {
    }

    async execute(command: CreateRoleCommand): Promise<any> {
        const query = new GetRoleByCodeOrNameQuery(command.payload.name, command.payload.code);
        const existUser = await this.queryBus.execute(query);

        if (existUser) {
            throw new DuplicatedItemException({
                message: "Role exist",
                data: command
            })
        }

        const now = DataTimeHelper.getNowUnix();
        const roleAggregateRoot =  new RoleAggregatesRoot(UuidHelper.newUuid());
        const transactionId =  UuidHelper.newUuid();
        roleAggregateRoot.initialize(
            roleAggregateRoot.id,
            transactionId,
            command.payload.name,
            command.payload.code,
            command.payload.normalizedName,
            command.payload.description,
            RoleStatus.Active,
            command.claims.name,
            command.claims.id,
            now,
            command.claims.id,
            command.claims.name,
            now
        )

        roleAggregateRoot.domainEvents.forEach(event => this.eventBus.publish(event));

        return this.mapper.map(roleAggregateRoot,RoleDto,RoleAggregatesRoot)

    }
}