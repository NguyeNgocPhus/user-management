import {BaseEvent} from "../../domain/common/event-store/event/base.event";
import {RoleStatus} from "../../domain/common/enum/role.status";
import {TypeEnum} from "../../domain/common/enum/type.status";


export class InitializeTypeEvent extends BaseEvent{
    public name:string;
    public normalizedName:string;
    public description:string;
    public status:TypeEnum;
    public modifiedByName: string;

    public modifiedById: string;

    public modifiedDate: number;

    public createdByName: string;

    public createdById: string;

    public createdDate: number;
    constructor(id:string,transactionId:string,name:string,normalizedName:string,description:string,status:TypeEnum,
                modifiedByName: string,
                modifiedById: string,
                modifiedDate: number,
                createdById: string,
                createdByName: string,
                createdDate: number,
    ) {
        super();
        this.eventName = InitializeTypeEvent.name;
        this.id =  id ;
        this.transactionId = transactionId;
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