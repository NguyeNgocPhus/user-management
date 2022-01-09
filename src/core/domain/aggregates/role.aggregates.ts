import {BaseAggregates} from "../common/event-store/aggregates/base.aggregates";
import {RoleStatus} from "../common/enum/role.status";
import { InitializeRoleEvent } from "src/core/application/events/role.event";
import {BaseEvent} from "../common/event-store/event/base.event";


export class RoleAggregatesRoot extends BaseAggregates{
    private _name:string;
    private _code:string;
    private _normalizedName:string;
    private _description:string;
    private _status:RoleStatus;
    constructor(id:string) {
        super();
        this.id =  id ;
        this.domainEvents=[];

    }
    applyDomainEvent(event:BaseEvent){
        switch (event.eventName) {
            case InitializeRoleEvent.name:
                const initializeRoleEvent =  event as InitializeRoleEvent;
                this.id = initializeRoleEvent.id;
                this._code = initializeRoleEvent.code;
                this._name = initializeRoleEvent.name;
                this._description = initializeRoleEvent.description;
                this._normalizedName = initializeRoleEvent.normalizedName;
                this._status = initializeRoleEvent.status;
                this.modifiedById = initializeRoleEvent.modifiedById;
                this.modifiedDate = initializeRoleEvent.modifiedDate;
                this.modifiedByName = initializeRoleEvent.modifiedByName;
                this.createdById = initializeRoleEvent.createdById;
                this.createdByName = initializeRoleEvent.createdByName;
                this.createdDate = initializeRoleEvent.createdDate;
                break;
        }
    }
    initialize(id:string,transactionId:string,name:string,code:string,normalizedName:string,description:string,status:RoleStatus,
        modifiedByName: string,
        modifiedById: string,
        modifiedDate: number,
        createdById: string,
        createdByName: string,
        createdDate: number,
    ){
        const event  = new InitializeRoleEvent(id,transactionId,name,code,normalizedName,description,status,
            modifiedByName,
            modifiedById,
            modifiedDate,
            createdById,
            createdByName,
            createdDate);
        this.addToDomainEvent(event);
        this.applyDomainEvent(event);
    }
    get name(){
        return this._name;
    }
    get code(){
        return this._code;
    }
    get normalizedName(){
        return this._normalizedName;
    }
    get description(){
        return this._description;
    }
    get status(){
        return this._status;
    }
}