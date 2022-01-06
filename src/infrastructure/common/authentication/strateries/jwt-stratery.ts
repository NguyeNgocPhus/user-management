import { configService } from './../../../../ormconfig';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IConfigService } from 'src/core/application/common/service/config.interface';

@Injectable()
export class JwtStratery extends PassportStrategy(Strategy) {
  constructor(private configService: IConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      ignoreExpiration: true,
    });
  }
  async validate(claim: any) {
    return claim;
  }
}
