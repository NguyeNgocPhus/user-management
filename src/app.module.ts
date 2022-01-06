import { AppResolver } from './app.resolver';
import { ConfigServiceModule } from './infrastructure/common/services/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IConfigService } from './core/application/common/service/config.interface';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Resolvers } from './infrastructure/graphql';
import { Repository } from './infrastructure/repositories';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandler } from './infrastructure/handler/commands';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from './infrastructure/common/authentication/authentication.module';

// PORT = 3000;
// DB_TYPE = 'postgres';
// DB_HOST = 'localhost';
// DB_USERNAME = 'postgres';
// (DB_PASSWORD = 'phu'), (DATABASE = 'typeorm');
@Module({
  imports: [
    AuthenticationModule,
    ConfigServiceModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigServiceModule],
      inject: [IConfigService],
      useFactory: async (configService: IConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/src/core/domain/entities/**/*.entity.{ts,js,d.ts}'],
        migrations: ['dist/database/*.js'],
        cli: {
          migrationsDir: 'dist/database/migrations',
        },
        autoLoadEntities: true,
        migrationsTableName: 'phu-migration',
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PassportModule.register({ defaultStrategy: 'local' }),
    TypeOrmModule.forFeature(Repository),
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
  providers: [...Resolvers, ...CommandHandler],
})
export class AppModule {}
