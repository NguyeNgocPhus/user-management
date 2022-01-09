import {BaseAggregates} from "../common/event-store/aggregates/base.aggregates";
import {UuidHelper} from "../../../infrastructure/common/helper";
import {UserStatus} from "../common/enum/user.status";
import {InitializeUserEvent} from "../../application/events/user.event";
import {BaseEvent} from "../common/event-store/event/base.event";


export class UserAggregatesRoot extends BaseAggregates {
    private _name: string;
    private _normalizedName: string;
    private _email: string;
    private _phoneNumber: string;
    private _status: string;
    private _roles: string[];

    constructor(id: string) {
        super();
        this.id = id;
        this.domainEvents = [];
    }
    applyDomainEvent(event : BaseEvent){
        switch (event.eventName){
            case InitializeUserEvent.name:
                const initializeUserEvent = event as InitializeUserEvent;
                this.id = initializeUserEvent.id;
                this._name = initializeUserEvent.name;
                this._normalizedName = initializeUserEvent.normalizedName;
                this._status = initializeUserEvent.status;
                this._phoneNumber = initializeUserEvent.phoneNumber;
                this._email =  initializeUserEvent.email;
                this._status = UserStatus.Active;
                this.modifiedDate = initializeUserEvent.modifiedDate;
                this.modifiedById = initializeUserEvent.modifiedById;
                this.modifiedByName = initializeUserEvent.modifiedByName;
                this.createdDate = initializeUserEvent.createdDate;
                this.createdByName = initializeUserEvent.createdByName;
                this.createdById = initializeUserEvent.createdById;
                break;
        }
    }
    initialize(id: string, name: string, normalizedName: string, email: string, phoneNumber: string,
               status: UserStatus,
               modifiedByName: string,
               modifiedById: string,
               modifiedDate: number,
               createdById: string,
               createdByName: string,
               createdDate: number,
               transactionId:string,
               roles:string[]) {
        const event = new InitializeUserEvent(id, name,status, email, phoneNumber, normalizedName, modifiedById, modifiedByName, modifiedDate,
            createdById, createdByName, createdDate,transactionId,roles);

        this.addToDomainEvent(event);
        this.applyDomainEvent(event);
    }
    get name(){
        return this._name;
    }
    get normalizedName(){
        return this._normalizedName;
    }
    get email(){
        return this._email;
    }
    get phoneNumber(){
        return this._phoneNumber;
    }
    get status(){
        return this._status;
    }


}