import {EntityRepository, Repository} from "typeorm";
import {RoleReadModel} from "../../core/domain/entities/role.entity";
import {Injectable} from "@nestjs/common";


@Injectable()
@EntityRepository(RoleReadModel)
export class RoleRepository extends  Repository<RoleReadModel>{

    async addRoleAsync(role:RoleReadModel){
        return await this.save(role);
    }
    async getRoleByIds(ids:string[]){
        return await  this.findByIds(ids);
    }
    async getRoleByCodeOrName(name:string,code:string){
        return await  this.findOne({where:[{name},{code}]});
    }
}