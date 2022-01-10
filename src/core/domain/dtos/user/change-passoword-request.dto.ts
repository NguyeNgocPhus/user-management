import {Field, InputType} from "@nestjs/graphql";
import {IsEqualTo} from "../../../application/common/validator/is-equal-to-validator";
import {IsNotEmpty, IsString} from "class-validator";


@InputType({description:"avc"})
export class ChangePasswordRequestDto{
    @Field()
    @IsString()
    @IsNotEmpty()
    phoneNumber:string;

    @Field()
    @IsString()
    @IsNotEmpty()
    currentPassword:string;

    @Field()
    @IsString()
    @IsNotEmpty()
    newPassword:string;

    @Field()
    @IsEqualTo()
    @IsString()
    @IsNotEmpty()
    confirmPassword:string;

}