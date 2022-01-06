import { IConfigService } from 'src/core/application/common/service/config.interface';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [
    {
      provide: IConfigService,
      useClass: ConfigService,
    },
  ],
  exports: [IConfigService],
})
export class ConfigServiceModule {}
