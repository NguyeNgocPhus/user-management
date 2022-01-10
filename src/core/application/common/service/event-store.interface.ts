import {BaseAggregates} from "../../../domain/common/event-store/aggregates/base.aggregates";
import {Direction, ReadRevision} from "@eventstore/db-client";

export abstract class IEventStoreService {
    abstract startStreamAsync(steamName: string, aggregate: BaseAggregates): Promise<any>

    abstract aggregateStreamAsync(streamName: string,
                                  aggregate: BaseAggregates,
                                  direction: Direction,
                                  expectedRevision: ReadRevision): Promise<BaseAggregates>
    abstract  appendStreamAsync(streamName: string,
                                aggregate: BaseAggregates)
}