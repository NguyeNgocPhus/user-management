export abstract class ILoggerService {
    abstract error(message: string, meta: any): Promise<boolean>;

    abstract warn(message: string, meta: any): Promise<boolean>;

    abstract info(message: string, meta: any): Promise<boolean>;

    abstract debug(message: string, meta: any): Promise<boolean>;
}