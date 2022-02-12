
import {Resolver, Query, Mutation, Args, Context} from '@nestjs/graphql';

import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {CommandBus} from "@nestjs/cqrs";
import {CreatePictureRequestDto} from "../../core/domain/dtos/picture/create-picture-request.dto";
import {CreatePictureCommand} from "../../core/application/commands/pictures/create-picture.command";
import fs from "fs";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../common/authentication/guards/jwt-auth.guard";
import {PermissionGuards} from "../common/authorization/guards/permission.guards";
import {Permissions} from "../common/authorization/decorator/permission.decorator";
import {PermConst} from "../../core/application/common/constants/perm.constants";
@Resolver()
export class PictureResolver {
    constructor(@InjectMapper() private mapper: Mapper, private commandBus: CommandBus) {
    }

    //{"query":"mutation addPicture($picture:[Upload!]!){\n  addPictures(params:{\n    productId:\"44419852-9115-4121-8ca1-88d6dbaa1f8d\",\n    pictures:$picture\n  })\n}"}
    @Mutation(() => Boolean)
    @UseGuards(JwtAuthGuard, PermissionGuards)
    @Permissions(PermConst.ADMIN)
    async addPictures(
        @Args("params") data: CreatePictureRequestDto,@Context() context
    ){
        try {
            const pictures = await  Promise.all(data.pictures);
            console.log(pictures)
            const command = new CreatePictureCommand(data.productId,pictures,context?.req?.user);
            const result = await  this.commandBus.execute(command);


            return true;
        }catch (e) {
            throw new Error(e.message);
        }


    }
}
// '{"query":"mutation UploadAvatar($picture:any){\n  uploadAvatar(file:$picture)\n}"}'
// '{"query":"mutation AddProfilePicture($picture:Upload!){\n  addProfilePicture(picture:$picture)\n}"}'