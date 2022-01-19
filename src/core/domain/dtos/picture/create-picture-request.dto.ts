import {Field, InputType} from "@nestjs/graphql";
import {IsString} from "class-validator";
import { FileUpload, GraphQLUpload } from 'graphql-upload';
@InputType()
export class CreatePictureRequestDto {
    @Field()
    @IsString()
    productId: string;
    //curl //{"query":"mutation AddProfile($picture:[Upload!]!){\n  addProfilePicture(params:{\n    productId:\"123123\",\n    pictures:$picture\n  })\n}"}
    @Field(() => [GraphQLUpload], { nullable: true })
    pictures?:Promise<FileUpload>[];
}