import {UserStatus} from "../../domain/common/enum/user.status";
import {BaseEvent} from "../../domain/common/event-store/event/base.event";


export class InitializeUserEvent extends BaseEvent{

    public name: string;
    public normalizedName: string;
    public phoneNumber: string;
    public email: string;
    public status: UserStatus;
    public roles : string[];
    public modifiedByName: string;
    public modifiedById: string;
    public modifiedDate: number;
    public createdByName: string;
    public createdById: string;
    public createdDate: number;

    constructor(id: string, name: string, status:UserStatus,email: string, phoneNumber: string, normalizedName: string, modifiedById: string, modifiedByName: string, modifiedDate: number
        , createdById: string, createdByName: string, createdDate: number,transactionId:string,roles:string[]
    ) {
        super();
        this.id = id;
        this.status = status;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.normalizedName = normalizedName;
        this.modifiedById = modifiedById;
        this.modifiedDate = modifiedDate;
        this.modifiedByName = modifiedByName;
        this.createdById = createdById;
        this.createdByName = createdByName;
        this.createdDate = createdDate;
        this.transactionId = transactionId;
        this.eventName = InitializeUserEvent.name;
        this.roles = roles;
    }
}