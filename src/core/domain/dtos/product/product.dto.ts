import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {} from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {AutoMap} from "@automapper/classes";

@ObjectType({ description: 'product data' })
export class ProductDto {
  @Field({ description: 'id product' })
  @AutoMap()
  id: string;

  @Field({ description: 'product name' })
  @AutoMap()
  name: string;
  @Field({ description: 'product normalized Name ' })
  @AutoMap()
  normalizedName: string;
  @Field({ description: 'product price' })
  @AutoMap()
  price: number;
  @Field({ description: 'product quantity' })
  @AutoMap()
  quantity: number
  @Field()
  @AutoMap()
  color:string;
  @Field()
  @AutoMap()
  image:string;
  @Field()
  @AutoMap()
  status:string;
  @Field()
  @AutoMap()
  sale:number;
  @Field()
  @AutoMap()
  sellNumber:number;

  @Field({ description: 'product modified by name' })
  @AutoMap()
  public modifiedByName: string;

  @Field({ description: 'product modified by id' })
  @AutoMap()
  public modifiedById: string;

  @Field({ description: 'product modified date' })
  @AutoMap()
  public modifiedDate: number;

  @Field({ description: 'product created by name' })
  @AutoMap()
  public createdByName: string;

  @Field({ description: 'product created by id' })
  @AutoMap()
  public createdById: string;

  @Field({ description: 'product created date' })
  @AutoMap()
  public createdDate: number;
}
