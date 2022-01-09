import { Field, InputType } from '@nestjs/graphql';
import {} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {UserStatus} from "../../common/enum/user.status";
import {IsVietnamesePhoneNumber} from "../../../application/common/validator/phone-number-validator";
import {IsValidRoles} from "../../../application/common/validator/role-validator";

@InputType({ description: 'input user data' })
export class CreateUserRequestDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  normalizedName: string;
  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Field()
  @IsNotEmpty()

  @IsVietnamesePhoneNumber({message:"The phone number is not in the form of Vietnamese number. Please try again!"})
  phoneNumber: string;

  @Field(type => [String])
  @IsValidRoles()
  roles:string[];





}
