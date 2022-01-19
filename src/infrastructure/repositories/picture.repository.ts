import { ProductRealModel } from './../../core/domain/entities/product.entity';
import { Entity, EntityRepository, Repository } from 'typeorm';
import {Injectable} from "@nestjs/common";
import {PictureReadModel} from "../../core/domain/entities/picture.entity";


@Injectable()
@EntityRepository(PictureReadModel)
export class PictureRepository extends Repository<PictureReadModel> {
    constructor() {
        super();
    }

    async addPicturesAsync(pictures: PictureReadModel[]){
        return this.save(pictures);
    }

}
