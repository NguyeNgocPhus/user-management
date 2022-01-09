import { AutoMap } from "@automapper/classes";
import {AggregateRoot} from "@nestjs/cqrs";
import {BaseEvent} from "../event/base.event";


export class BaseAggregates extends  AggregateRoot{
    constructor() {
        super();
    }
    public id:string;
    public domainEvents: BaseEvent[];

    @AutoMap()
    public modifiedByName: string;
    @AutoMap()
    public modifiedById: string;
    @AutoMap()
    public modifiedDate: number;
    @AutoMap()
    public createdByName: string;
    @AutoMap()
    public createdById: string;
    @AutoMap()
    public createdDate: number;

    addToDomainEvent(event: BaseEvent): void {
        //console.log(event)
        this.domainEvents.push(event);
    }
}