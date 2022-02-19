import {ConfigServiceModule} from './infrastructure/common/services/config/config.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {IConfigService} from './core/application/common/service/config.interface';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {Resolvers} from './infrastructure/graphql';
import {Repository} from './infrastructure/repositories';
import {CqrsModule} from '@nestjs/cqrs';
import {CommandHandler} from './infrastructure/handler/commands';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {AuthenticationModule} from './infrastructure/common/authentication/authentication.module';
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from '@automapper/classes';
import {Profiles} from "./infrastructure/profile";
import {QueryHandler} from "./infrastructure/handler/queries";
import {EventHandler} from "./infrastructure/handler/events";
import {UserReadModel} from "./core/domain/entities/user.entity";
import {ProductRealModel} from "./core/domain/entities/product.entity";
import {RoleReadModel} from "./core/domain/entities/role.entity";
import {IsValidRolesConstraint} from "./core/application/common/validator/role-validator";
import {Validator} from "./core/application/common/validator";
import { PasswordGeneratorService } from './infrastructure/common/services/password/password.service';
import {PasswordModule} from "./infrastructure/common/services/password/password.module";
import {EventStoreModule} from "./infrastructure/common/services/event-store/event-store.module";
import {UntilModule} from "./infrastructure/common/services/until/until.module";
import {IsValidTypeConstraint} from "./core/application/common/validator/type-validator";
import { ServeStaticModule } from '@nestjs/serve-static';
import {ProductRepository} from "./infrastructure/repositories/product.repo";
import {LoggerModule} from "./infrastructure/common/services/logger/logger.module";
import {TypeOrmLoggerService} from "./infrastructure/common/services/logger/typeorm-logger.service";
import {ILoggerService} from "./core/application/common/service/logger.interface";


@Module({
    imports: [

        //{"query":"mutation AddProfile($picture:[Upload!]!){\n  addProfilePicture(picture1:$picture,params:{\n    productId:\"123123\"\n  })\n}"}
        //         // ServeStaticModule.forRoot({
        //         //     rootPath: join(__dirname,'infrastructure','images'),   // <-- path to the static files
        //         // }),
        PasswordModule,
        AutomapperModule.forRoot({
            options: [{name: "APP_MAPPER", pluginInitializer: classes}],
            singular: true
        }),
        EventStoreModule,
        UntilModule,
        AuthenticationModule,
        ConfigServiceModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigServiceModule,LoggerModule],
            inject: [IConfigService,ILoggerService],
            useFactory: async (configService: IConfigService,loggerService:ILoggerService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: Number(configService.get('DB_PORT')),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: ['dist/core/domain/entities/**/*.entity.{ts,js,d.ts}'],
                migrations: ['dist/database/*.js'],
                cli: {
                    migrationsDir: 'dist/database/migrations',
                },
                autoLoadEntities: true,
                migrationsTableName: 'phu-migration',
                logging: "all",
                logger:new TypeOrmLoggerService(loggerService)
            }),
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        LoggerModule,
        PassportModule.register({defaultStrategy: 'local'}),
        TypeOrmModule.forFeature([...Repository]),
        TypeOrmModule.forFeature([UserReadModel,ProductRealModel,RoleReadModel,ProductRealModel]),
        CqrsModule,
        JwtModule.registerAsync({
            imports: [ConfigServiceModule],
            inject: [IConfigService],
            useFactory: async (configService: IConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
            }),
        }),
    ],
    controllers: [],
    providers: [...Resolvers, ...CommandHandler, ...QueryHandler, ...EventHandler, ...Profiles,IsValidRolesConstraint,IsValidTypeConstraint],
})
export class AppModule {

}
