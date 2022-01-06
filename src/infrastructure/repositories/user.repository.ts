import { CreateUserRequestDto } from './../../core/domain/dtos/user/create-user-request.dto';
import { UserReadModel } from './../../core/domain/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(UserReadModel)
export class UserReposiroty extends Repository<UserReadModel> {
  constructor() {
    super();
  }
  async createUserAsync(userData: any) {
    console.log(userData);

    return await this.save(userData);
  }
  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne(email);
    if (!user) {
      throw new NotFoundException('deo, tim thay');
    }
    if (user.password !== password) {
      throw new NotFoundException('sai mk');
    }
    return user;
  }
}
