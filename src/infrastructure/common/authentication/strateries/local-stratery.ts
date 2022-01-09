import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super();
  }
  async validate(email: string, password: string) {

  }
}
