import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { IConfigService } from 'src/core/application/common/service/config.interface';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService implements IConfigService {
  constructor() {
    if (process.env.NODE_ENV !== 'production') {
      let path = join(`.env.${process.env.NODE_ENV}`);

      dotenv.config({ path });
    }
  }

  get(key: string): string {
    return process.env[key];
  }
}
