import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetTypeByNameQuery} from "../../../../core/application/queries/type/get-type-by-name.query";


@QueryHandler(GetTypeByNameQuery)
export class CreateTypeByNameQueryHandler implements IQueryHandler<GetTypeByNameQuery>{
    constructor() {
    }


    async execute(query: GetTypeByNameQuery): Promise<any> {
    }
}