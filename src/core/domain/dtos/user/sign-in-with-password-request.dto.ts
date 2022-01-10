import {Field, InputType} from "@nestjs/graphql";
import {IsNotEmpty, IsString} from "class-validator";
import {IsVietnamesePhoneNumber} from "../../../application/common/validator/phone-number-validator";


@InputType({description:"sign with password"})
export class SignInWithPasswordDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    @IsVietnamesePhoneNumber()
    phoneNumber:string;


    @Field()
    @IsString()
    @IsNotEmpty()
    password:string;
}