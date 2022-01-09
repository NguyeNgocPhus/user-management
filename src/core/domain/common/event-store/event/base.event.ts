import { IEvent } from "@nestjs/cqrs";


export class BaseEvent implements IEvent{

    id: string;

    eventName: string;

    transactionId: string;
}