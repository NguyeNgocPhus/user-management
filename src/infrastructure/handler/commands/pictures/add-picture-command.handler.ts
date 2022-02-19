
import {CommandHandler, ICommandHandler, QueryBus} from "@nestjs/cqrs";
import {TypeRepository} from "../../../repositories/type.repository";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";

import {CreatePictureCommand} from "../../../../core/application/commands/pictures/create-picture.command";
import {DataTimeHelper, fileUploadHelper} from "../../../common/helper";
import * as fs from "fs";
import {rejects} from "assert";
import {PictureRepository} from "../../../repositories/picture.repository";
import {ProductRepository} from "../../../repositories/product.repo";
import {GetProductByIdQuery} from "../../../../core/application/queries/product/get-product-by-id.query";
import {NotFoundException} from "@nestjs/common";
import {ProductRealModel} from "../../../../core/domain/entities/product.entity";



@CommandHandler(CreatePictureCommand)
export class AddPictureCommandHandler implements ICommandHandler<CreatePictureCommand>{
    constructor(private queryBus : QueryBus,
                @InjectMapper() private mapper : Mapper,
                private pictureRepository:PictureRepository,
                private productRepository:ProductRepository

    ) {
    }
    async execute(command: CreatePictureCommand): Promise<any> {

        const query = new GetProductByIdQuery(command.productId);
        const existProduct: ProductRealModel = await this.queryBus.execute(query);
        if (!existProduct) {
            throw new NotFoundException('product id not exist');
        }

        const pictures = command.pictures.map(file => {
            fileUploadHelper.upLoadFile(file);
            return this.pictureRepository.create({
                productId: command.productId,
                name: file.filename,
                mimetype: file.mimetype,
                createdById: command.claim.id,
                createdDate: DataTimeHelper.getNowUnix(),
                createdByName: command.claim.name,
                modifiedDate: DataTimeHelper.getNowUnix(),
                modifiedByName:command.claim.name,
                modifiedById:command.claim.id
            })
        })

        await this.pictureRepository.addPicturesAsync(pictures);

        return pictures;

    }
}