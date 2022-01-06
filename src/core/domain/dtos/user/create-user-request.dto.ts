import { Field, InputType } from '@nestjs/graphql';
import {} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  password: string;
}
