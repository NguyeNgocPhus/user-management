import { Field, InputType } from '@nestjs/graphql';
import {} from 'class-transformer';
import {IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {IsValidType} from "../../../application/common/validator/type-validator";

@InputType({ description: 'input product data' })
export class CreateProductRequestDto {
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
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @Field()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @Field(() => [String], { description: "Permission list" })
  @IsArray()
  size:string[]

  @Field()
  @IsString()
  @IsNotEmpty()
  color:string;

  @Field()
  @IsString()
  @IsNotEmpty()
  image:string;

  @Field()
  @IsString()
  @IsValidType()
  type: string;

}
