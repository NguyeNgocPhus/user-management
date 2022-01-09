import {BaseEvent} from "../../domain/common/event-store/event/base.event";
import {RoleStatus} from "../../domain/common/enum/role.status";


export class InitializeRoleEvent extends BaseEvent{
    public code :string;
    public name:string;
    public normalizedName:string;
    public description:string;
    public status:RoleStatus;
    public modifiedByName: string;

    public modifiedById: string;

    public modifiedDate: number;

    public createdByName: string;

    public createdById: string;

    public createdDate: number;
    constructor(id:string,transactionId:string,code:string,name:string,normalizedName:string,description:string,status:RoleStatus,
                modifiedByName: string,
                modifiedById: string,
                modifiedDate: number,
                createdById: string,
                createdByName: string,
                createdDate: number,
                ) {
        super();
        this.eventName = InitializeRoleEvent.name;
        this.id =  id ;
        this.transactionId = transactionId;
        this.code = code ;
        this.name = name;
        this.normalizedName = normalizedName;
        this.description = description;
        this.status = status;
        this.modifiedById = modifiedById;
        this.modifiedByName = modifiedByName;
        this.modifiedDate = modifiedDate;
        this.createdById = createdById;
        this.createdByName = createdByName;
        this.createdDate =createdDate;
    }
}