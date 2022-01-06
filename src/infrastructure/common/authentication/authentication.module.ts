import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strateries/local-stratery';
import { Repository } from 'src/infrastructure/repositories';
import { JwtStratery } from './strateries/jwt-stratery';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature(Repository)],
  providers: [LocalStrategy, JwtStratery],
})
export class AuthenticationModule {}
