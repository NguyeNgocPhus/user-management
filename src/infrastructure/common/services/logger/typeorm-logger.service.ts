import { Inject } from "@nestjs/common";
import {Logger} from "typeorm";
import {QueryRunner} from "typeorm/query-runner/QueryRunner";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {ILoggerService} from "../../../../core/application/common/service/logger.interface";


export class TypeOrmLoggerService implements  Logger {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILoggerService,
    ) {
    }

    async log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): Promise<any>{
        switch (level) {
            case "log":
                await this.logger.debug(`TypeORM Debug: ${message}`, null);
                break;

            case "info":
                await this.logger.debug(`TypeORM Info: ${message}`, null);
            case "warn":
                await this.logger.warn(`TypeORM Debug: ${message}`, null);
                break;
        }
        return true;
    };
    async logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): Promise<any>{
        const sql = query + (parameters && parameters.length ? " -- PARAMETERS: " + this.stringifyParams(parameters) : "");
        await this.logger.info(`TypeORM Query: ${sql}`, null)
    };
    /**
     * Logs query that is failed.
     */
    async logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): Promise<any>{
        const sql = query + (parameters && parameters.length ? " -- PARAMETERS: " + this.stringifyParams(parameters) : "");
        await this.logger.error(`TypeORM Query: ${sql}`, null);
        await this.logger.error(`TypeORM Error: ${error}`, null);
    };
    /**
     * Logs query that is slow.
     */
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any{

    };
    /**
     * Logs events from the schema build process.
     */
    async logSchemaBuild(message: string, queryRunner?: QueryRunner): Promise<any>{
        await this.logger.info(`TypeORM Scheme Build: ${message}`, null)
    };
    /**
     * Logs events from the migrations run process.
     */
    async logMigration(message: string, queryRunner?: QueryRunner): Promise<any>{
        await this.logger.info(`TypeORM Migration: ${message}`, null)
    };
    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    protected stringifyParams(parameters: any[]) {
        try {
            return JSON.stringify(parameters);

        } catch (error) { // most probably circular objects in parameters
            return parameters;
        }
    }


}