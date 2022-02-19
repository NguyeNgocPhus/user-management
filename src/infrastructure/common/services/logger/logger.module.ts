import {Module} from "@nestjs/common";
import {ILoggerService} from "../../../../core/application/common/service/logger.interface";
import {LoggerService} from "./logger.service";
import * as winston from "winston";
import {utilities as nestWinstonModuleUtilities, WinstonModule} from "nest-winston";
import {ConfigServiceModule} from "../config/config.module";
import {IConfigService} from "../../../../core/application/common/service/config.interface";
import {DataTimeHelper} from "../../helper";

@Module({

    imports: [
        WinstonModule.forRootAsync({
            imports:[ConfigServiceModule],
            inject:[IConfigService],
            useFactory:async (configService:IConfigService) => ({
                level: 'silly',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    winston.format.prettyPrint({
                        colorize: true
                    }),
                ),
                transports:[
                    new winston.transports.Console({
                        format:winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.ms(),
                            nestWinstonModuleUtilities.format.nestLike('phu-Vjp',{
                                prettyPrint:true
                            })
                        )
                    }),
                    new winston.transports.File({
                        filename: `${configService.get('LOG_DIR')}/${configService.get('LOG_ERROR_FILE_NAME')}`,
                        level: 'error',
                        // maxFiles: Number(configService.get('LOG_MAX_FILE') || 10),
                        // maxsize: Number(configService.get('LOG_MAX_SIZE') || 10485760),
                        // rotationFormat: DataTimeHelper.rotation,
                    }),
                    new winston.transports.File({
                        level: 'silly',
                        filename: `${configService.get('LOG_DIR')}/${configService.get('LOG_ALL_FILE_NAME')}`,
                        // maxFiles: Number(configService.get('LOG_MAX_FILE') || 10),
                        // maxsize: Number(configService.get('LOG_MAX_SIZE') || 10485760),
                        // rotationFormat: DataTimeHelper.rotation,
                    }),
                    new winston.transports.File({
                        level: 'debug',
                        filename: `${configService.get('LOG_DIR')}/${configService.get('LOG_DEBUG_FILE_NAME')}`,
                        // maxFiles: Number(configService.get('LOG_MAX_FILE') || 10),
                        // maxsize: Number(configService.get('LOG_MAX_SIZE') || 10485760),
                        // rotationFormat: DataTimeHelper.rotation,
                    }),
                ]
            })
        })
    ],
    providers: [{
        provide: ILoggerService,
        useClass: LoggerService
    }],
    exports: [ILoggerService]


})
export class LoggerModule {
};
