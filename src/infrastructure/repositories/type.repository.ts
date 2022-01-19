import {EntityRepository, Repository} from "typeorm";
import {RoleReadModel} from "../../core/domain/entities/role.entity";
import {Injectable} from "@nestjs/common";
import {TypeReadModel} from "../../core/domain/entities/type.entity";


@Injectable()
@EntityRepository(TypeReadModel)
export class TypeRepository extends  Repository<TypeReadModel>{

    async addTypeAsync(type:TypeReadModel){
        return await this.save(type);
    }
    async getTypeByIdAsync(id:string){
        return await  this.findOne({id})
    }

}