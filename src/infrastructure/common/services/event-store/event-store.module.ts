import {Module} from "@nestjs/common";
import {IEventStoreService} from "../../../../core/application/common/service/event-store.interface";
import {EventStoreService} from "./event-store.service";
import {CqrsModule} from "@nestjs/cqrs";


@Module({
    imports:[CqrsModule],
    providers:[{
        provide:IEventStoreService,
        useClass:EventStoreService
    }],
    exports:[IEventStoreService]
})
export class EventStoreModule{}