export abstract class IPasswordGeneratorService {
    abstract hashPassword(password:string) : Promise<any>;
    abstract verifyPassword(hashPassword:string,password:string) : Promise<any>;
    abstract generateRandomPassword():string;
}