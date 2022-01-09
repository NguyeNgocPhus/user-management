import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {IPasswordGeneratorService} from "../../../../core/application/common/service/password.interface";

@Injectable()
export class PasswordGeneratorService implements IPasswordGeneratorService{

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async verifyPassword(hashPassword: string, password: string) {
        return await bcrypt.compare(password, hashPassword);
    }


    generateRandomPassword() {
        return Math.random().toString(36).slice(-8);
        // How does it work?
        // Math.random()                        // Generate random number, eg: 0.123456
        // .toString(36)                    // Convert  to base-36 : "0.4fzyo82mvyr"
        // .slice(-8);                  // Cut off last 8 characters : "yo82mvyr"
    }
}