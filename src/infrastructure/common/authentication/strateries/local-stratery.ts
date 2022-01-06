import { UserReposiroty } from 'src/infrastructure/repositories/user.repository';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserReposiroty) {
    super();
  }
  async validate(email: string, password: string) {
    const user = await this.userRepository.findByEmailAndPassword(
      email,
      password,
    );

    return user;
  }
}
