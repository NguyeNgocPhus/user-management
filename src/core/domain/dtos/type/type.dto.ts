import {Field, ObjectType} from "@nestjs/graphql";
import {IsNotEmpty, IsString} from "class-validator";
import {AutoMap} from "@automapper/classes";

@ObjectType()
export class TypeDto{
    @Field()
    @AutoMap()
    id: string;
    @Field()
    @AutoMap()
    name: string;

    @Field()
    @AutoMap()
    normalizeName: string;

    @Field()
    @AutoMap()
    description: string;

    @Field()
    @AutoMap()
    type:string;

    @Field({ description: 'user modified by name' })
    @AutoMap()
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