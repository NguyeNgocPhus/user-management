import { CreateUserRequestDto } from './../../core/domain/dtos/user/create-user-request.dto';
import { UserReadModel } from './../../core/domain/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {Injectable, NotFoundException} from '@nestjs/common';


@EntityRepository(UserReadModel)
export class UserRepository extends Repository<UserReadModel> {
  constructor() {
    super();
  }
  async createUserAsync(userData: UserReadModel) {
    return await this.save(userData);
  }
  async getUserByEmailOrPhoneNumber(email:string,phoneNumber:string){
    return await this.findOne({where:[{email},{phoneNumber}]});
  }
}
