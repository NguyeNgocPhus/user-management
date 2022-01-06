import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType('ac')
@ObjectType('dasd')
export class LoginRequest {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsString()
  password: string;
}
