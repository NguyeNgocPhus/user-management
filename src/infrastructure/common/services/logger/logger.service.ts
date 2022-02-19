import {Inject, Injectable} from "@nestjs/common";
import {ILoggerService} from "../../../../core/application/common/service/logger.interface";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import * as fs from "fs";
import {IConfigService} from "../../../../core/application/common/service/config.interface";


@Injectable()
export class LoggerService implements ILoggerService{
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly configService:IConfigService

    ) {
        const logDir = configService.get('LOG_DIR');
        // Create dir if not existed
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
    }

    async info(message:string,meta:any) {
        //console.log(message)
        this.logger.info(message,meta)
        return true ;
    }

     async error(message: string, meta: any): Promise<boolean>{
         this.logger.info(message,meta)
        return true;
     };

     async warn(message: string, meta: any): Promise<boolean>{
         this.logger.info(message,meta)
         return true;
     };


     async debug(message: string, meta: any): Promise<boolean>{
         this.logger.info(message,meta)
         return true;
     };
}



