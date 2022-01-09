import {Field, InputType} from "@nestjs/graphql";
import {IsString} from "class-validator";
import {AutoMap} from "@automapper/classes";


@InputType({description:"create role request"})
export class CreateRoleRequestDto{
    @Field()
    @IsString()
    @AutoMap()
    name:string;
    @Field()
    @IsString()
    @AutoMap()
    code:string;
    @Field()
    @IsString()
    @AutoMap()
    normalizedName:string;
    @Field()
    @IsString()
    @AutoMap()
    description:string;




}