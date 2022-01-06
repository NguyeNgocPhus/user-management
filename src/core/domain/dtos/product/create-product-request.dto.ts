import { Field, InputType } from '@nestjs/graphql';
import {} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @Field()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
