import { IEvent } from "@nestjs/cqrs";
import {AutoMap} from "@automapper/classes";


export class BaseEvent implements IEvent{
    @AutoMap()
    id: string;
    @AutoMap()
    eventName: string;
    @AutoMap()
    transactionId: string;
}