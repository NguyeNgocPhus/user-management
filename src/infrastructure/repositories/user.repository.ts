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
  async getUserByPhoneNumber(phoneNumber:string){
    return await this.findOne({phoneNumber});
  }
  async updatePasswordAtFirstLoginAsync(user: UserReadModel): Promise<any> {
    return await this.update(user.id, {
      passwordHash: user.passwordHash,
      passwordChangeRequired: user.passwordChangeRequired,
      passwordValidUntilDate: user.passwordValidUntilDate,
      passwordHashTemporary: user.passwordHashTemporary,
      modifiedDate: user.modifiedDate,
      modifiedById: user.modifiedById,
      modifiedByName: user.modifiedByName,
    });
  }
}
