import {Module} from "@nestjs/common";
import {UntilService} from "./until.service";


@Module({
    imports:[],
    providers:[UntilService],
    exports:[UntilService]
})
export class UntilModule{}