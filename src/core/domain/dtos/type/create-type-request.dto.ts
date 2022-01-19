import {Field, InputType} from "@nestjs/graphql";
import {Column} from "typeorm";
import {AutoMap} from "@automapper/classes";
import {TypeEnum} from "../../common/enum/type.status";
import {IsEnum, IsNotEmpty, IsString} from "class-validator";


@InputType({description:"create type request"})
export class CreateTypeRequestDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsNotEmpty()
    normalizeName: string;

    @Field()
    @IsNotEmpty()
    description: string;

    @Field()
    @IsEnum(TypeEnum)
    @IsString()
    type:string;

}