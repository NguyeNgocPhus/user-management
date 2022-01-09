import {Field, ObjectType} from "@nestjs/graphql";
import {UserStatus} from "../../common/enum/user.status";
import {AutoMap} from "@automapper/classes";


@ObjectType()
export class RoleDto {
    @Field()
    @AutoMap()
    id:string;
    @Field()
    @AutoMap()
    code:string;
    @Field()
    @AutoMap()
    name:string;
    @Field()
    @AutoMap()
    description:string;
    @Field()
    @AutoMap()
    normalizedName:string;
    @Field()
    @AutoMap()
    status:string;

    @Field({ description: 'user modified by name' })
    @AutoMap()
    public modifiedByName: string;

    @Field({ description: 'user modified by id' })
    @AutoMap()
    public modifiedById: string;

    @Field({ description: 'user modified date' })
    @AutoMap()
    public modifiedDate: number;

    @Field({ description: 'user created by name' })
    @AutoMap()
    public createdByName: string;

    @Field({ description: 'user created by id' })
    @AutoMap()
    public createdById: string;

    @Field({ description: 'user created date' })
    @AutoMap()
    public createdDate: number;


}