import {Client} from "@eventstore/db-client/dist/Client";
import {Direction, EventStoreDBClient, jsonEvent, ReadRevision} from "@eventstore/db-client";
import {IConfigService} from "../../../../core/application/common/service/config.interface";
import {Injectable} from "@nestjs/common";
import {IEventStoreService} from "../../../../core/application/common/service/event-store.interface";
import {BaseAggregates} from "../../../../core/domain/common/event-store/aggregates/base.aggregates";
import {EventBus} from "@nestjs/cqrs";
import {BaseEvent} from "../../../../core/domain/common/event-store/event/base.event";
import {UuidHelper} from "../../helper";

@Injectable()
export class EventStoreService implements  IEventStoreService{
    private client : Client;
    constructor(private configService:IConfigService,private eventBus:EventBus) {
        this.client =EventStoreDBClient.connectionString(
            configService.get("ESDB_CONNECTION")
        )
    }
    async appendStreamAsync(
        streamName: string,
        aggregate: BaseAggregates
    ): Promise<any> {
        try {
         //   console.log(streamName);

            if (aggregate.domainEvents.length == 0) {
                return null;
            }
            // Append to stream
            const result = await this.client.appendToStream(
                streamName,
                aggregate.domainEvents.map((event) =>
                    jsonEvent({
                        type: event.constructor.name,
                        id: UuidHelper.newUuid(),
                        metadata: {},
                        data: { ...event },
                    })
                ),
                {
                    expectedRevision: "stream_exists",
                }
            );
            // Merge context to enable dispatching abilit
            // Dispatch events
            for (const event of aggregate.domainEvents) {
                this.eventBus.publish(event);
            }
           // aggregate.clearDomainEvent();
            return result;
        } catch (e) {

            throw e;
        }
    }
    async aggregateStreamAsync(
        streamName: string,
        aggregate: BaseAggregates,
        direction: Direction,
        expectedRevision: ReadRevision
    ): Promise<BaseAggregates> {
        try {
            const events = await this.client.readStream(streamName, {
                direction: direction,
                fromRevision: expectedRevision,
            });
            for await (const resolvedEvent of events) {
                let event = {} as BaseEvent;
                Object.assign(event, resolvedEvent?.event.data);
               // console.log(event)
                // Don't need to add events to domain to prevent reapply those events
                //aggregate.addToDomainEvent(event);
                aggregate.applyDomainEvent(event);
            }
           // console.log(aggregate)
            return aggregate;
        } catch (e) {
            throw new e
        }
    }
    async startStreamAsync(streamName:string, aggregate:BaseAggregates):Promise<any>{
        if(aggregate.domainEvents ==  null){
            return null;
        }
        const result = await this.client.appendToStream(
            streamName,
            aggregate.domainEvents.map((event) =>
                jsonEvent({
                    type: event.constructor.name,
                    id: event.id,
                    metadata: {},
                    data: { ...event },
                })
            ),
            {
                expectedRevision: "no_stream",
            }
        );
        for(let event of aggregate.domainEvents){
            this.eventBus.publish(event);
        }

        return result;


    }


}