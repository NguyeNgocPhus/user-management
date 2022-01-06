import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ObjectType({ description: 'product data' })
export class ProductDto {
  @Field({ description: 'id product' })
  id: string;

  @Field({ description: 'product name' })
  name: string;
  @Field({ description: 'product normalized Name ' })
  normalizedName: string;
  @Field({ description: 'product price' })
  price: number;
  @Field({ description: 'product quantity' })
  quantity: number;

  @Field({ description: 'product modified by name' })
  public modifiedByName: string;

  @Field({ description: 'product modified by id' })
  public modifiedById: string;

  @Field({ description: 'product modified date' })
  public modifiedDate: number;

  @Field({ description: 'product created by name' })
  public createdByName: string;

  @Field({ description: 'product created by id' })
  public createdById: string;

  @Field({ description: 'product created date' })
  public createdDate: number;
}
