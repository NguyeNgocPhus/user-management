import {Field, InputType} from "@nestjs/graphql";
import {IsVietnamesePhoneNumber} from "../../../application/common/validator/phone-number-validator";
import {IsNotEmpty, IsString} from "class-validator";
import {IsEqualTo} from "../../../application/common/validator/is-equal-to-validator";


@InputType()
export class ChangePasswordFirstLoginRequestDto{
    @Field()
    @IsVietnamesePhoneNumber()
    @IsNotEmpty()
    phoneNumber:string;

    @Field()
    @IsNotEmpty()
    @IsString()
    currentPassword:string;

    @Field()
    @IsNotEmpty()
    @IsString()
    newPassword:string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @IsEqualTo()
    confirmPassword:string;

}