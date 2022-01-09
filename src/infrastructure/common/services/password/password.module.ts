import {Module} from "@nestjs/common";
import {PasswordGeneratorService} from "./password.service";
import {IPasswordGeneratorService} from "../../../../core/application/common/service/password.interface";


@Module({

    imports:[],
    providers:[{
        provide:IPasswordGeneratorService,
        useClass:PasswordGeneratorService,
    }],
    exports:[IPasswordGeneratorService]
})
export class PasswordModule{}