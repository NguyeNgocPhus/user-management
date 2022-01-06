import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ObjectType({ description: 'user data' })
export class UserDto {
  @Field({ description: 'id user' })
  id: string;

  @Field({ description: 'user name' })
  name: string;
  @Field({ description: 'user normalized Name ' })
  normalizedName: string;
  @Field({ description: 'user email' })
  email: string;
  @Field({ description: 'user password' })
  password: string;

  @Field({ description: 'user modified by name' })
  public modifiedByName: string;

  @Field({ description: 'user modified by id' })
  public modifiedById: string;

  @Field({ description: 'user modified date' })
  public modifiedDate: number;

  @Field({ description: 'user created by name' })
  public createdByName: string;

  @Field({ description: 'user created by id' })
  public createdById: string;

  @Field({ description: 'user created date' })
  public createdDate: number;
}
