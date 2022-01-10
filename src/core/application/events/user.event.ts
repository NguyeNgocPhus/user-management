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
    public avatarPhoto:string;
    public passwordChangeRequired:boolean;
    public passwordValidUntilDate:Date;
    public passwordHash:string;
    public lockoutEnd:Date;
    public passwordHashTemporary:string;
    public lockoutEnabled:boolean;
    public accessFailCount:number;

    constructor(id: string, name: string, status:UserStatus,email: string, phoneNumber: string, normalizedName: string, modifiedById: string, modifiedByName: string, modifiedDate: number
        , createdById: string, createdByName: string, createdDate: number,transactionId:string,roles:string[],avatarPhoto:string,
                passwordChangeRequired:boolean,
                passwordValidUntilDate:Date,
                passwordHash:string,
                lockoutEnd:Date,
                passwordHashTemporary:string,
                lockoutEnabled:boolean,
                accessFailCount:number
    ) {
        super();
        this.avatarPhoto = avatarPhoto;
        this.passwordChangeRequired = passwordChangeRequired;
        this.passwordValidUntilDate = passwordValidUntilDate;
        this.passwordHash = passwordHash;
        this.lockoutEnd = lockoutEnd;
        this.passwordHashTemporary = passwordHashTemporary;
        this.lockoutEnabled =  lockoutEnabled;
        this.accessFailCount = accessFailCount;
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

export class ChangePasswordFirstLoginEvent extends BaseEvent {
    public id: string;
    public transactionId: string;
    public passwordHash: string;
    public passwordHashTemporary: string;
    public passwordChangeRequired: boolean;
    public passwordValidUntilDate: Date;
    public modifiedByName: string;
    public modifiedById: string;
    public modifiedDate: number;

    constructor(id: string, transactionId: string, passwordHash: string, passwordHashTemporary: string
        , passwordChangeRequired: boolean, passwordValidUntilDate: Date, modifiedByName: string,
                modifiedById: string,
                modifiedDate: number) {
        super();
        this.id = id;
        this.transactionId = transactionId;
        this.passwordHash = passwordHash;
        this.passwordHashTemporary = passwordHashTemporary;
        this.passwordChangeRequired = passwordChangeRequired;
        this.passwordValidUntilDate = passwordValidUntilDate;
        this.modifiedByName = modifiedByName;
        this.modifiedById = modifiedById;
        this.modifiedDate = modifiedDate;
        this.eventName = ChangePasswordFirstLoginEvent.name;
        //   this.transactionId =transactionId;


    }
}