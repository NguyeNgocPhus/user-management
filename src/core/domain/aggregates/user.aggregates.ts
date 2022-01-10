import {BaseAggregates} from "../common/event-store/aggregates/base.aggregates";
import {UuidHelper} from "../../../infrastructure/common/helper";
import {UserStatus} from "../common/enum/user.status";
import {ChangePasswordFirstLoginEvent, InitializeUserEvent, updateAccessFailedCountEvent, updateLockoutEndEvent, UpdatePasswordEvent} from "../../application/events/user.event";
import {BaseEvent} from "../common/event-store/event/base.event";


export class UserAggregatesRoot extends BaseAggregates {
    private _name: string;
    private _normalizedName: string;
    private _email: string;
    private _phoneNumber: string;
    private _status: string;
    private _roles: string[];
    private _passwordChangeRequired: boolean;
    private _passwordValidUntilDate: Date;
    private _passwordHash: string;
    private _lockoutEnd: Date;
    private _passwordHashTemporary: string;
    private _lockoutEnabled: boolean;
    private _accessFailCount: number;

    constructor(id: string) {
        super();
        this.id = id;
        this.domainEvents = [];
        this.streamName = `User-${id}`;
    }

    applyDomainEvent(event: BaseEvent) {
        switch (event.eventName) {
            case InitializeUserEvent.name:
                const initializeUserEvent = event as InitializeUserEvent;
                this.id = initializeUserEvent.id;
                this._name = initializeUserEvent.name;
                this._normalizedName = initializeUserEvent.normalizedName;
                this._status = initializeUserEvent.status;
                this._phoneNumber = initializeUserEvent.phoneNumber;
                this._email = initializeUserEvent.email;
                this._status = UserStatus.Active;
                this.modifiedDate = initializeUserEvent.modifiedDate;
                this.modifiedById = initializeUserEvent.modifiedById;
                this.modifiedByName = initializeUserEvent.modifiedByName;
                this.createdDate = initializeUserEvent.createdDate;
                this.createdByName = initializeUserEvent.createdByName;
                this.createdById = initializeUserEvent.createdById;
                this._roles = initializeUserEvent.roles;
                this._passwordChangeRequired = initializeUserEvent.passwordChangeRequired;
                this._passwordValidUntilDate = initializeUserEvent.passwordValidUntilDate;
                this._passwordHash = initializeUserEvent.passwordHash;
                this._lockoutEnd = initializeUserEvent.lockoutEnd;
                this._passwordHashTemporary = initializeUserEvent.passwordHashTemporary;
                this._lockoutEnabled = initializeUserEvent.lockoutEnabled;
                this._accessFailCount = initializeUserEvent.accessFailCount;
                break;
            case ChangePasswordFirstLoginEvent.name:
                const changePasswordFirstLoginEvent = event as ChangePasswordFirstLoginEvent;
                this.id = changePasswordFirstLoginEvent.id;
                this.modifiedDate = changePasswordFirstLoginEvent.modifiedDate;
                this.modifiedById = changePasswordFirstLoginEvent.modifiedById;
                this.modifiedByName = changePasswordFirstLoginEvent.modifiedByName;
                this._passwordChangeRequired = changePasswordFirstLoginEvent.passwordChangeRequired;
                this._passwordValidUntilDate = changePasswordFirstLoginEvent.passwordValidUntilDate;
                this._passwordHash = changePasswordFirstLoginEvent.passwordHash;
             //   this._lockoutEnd = changePasswordFirstLoginEvent.lockoutEnd;
                this._passwordHashTemporary = changePasswordFirstLoginEvent.passwordHashTemporary;
                break;
            case updateAccessFailedCountEvent.name:
                const updateAccessFailedCount= event as updateAccessFailedCountEvent;
                this.id = updateAccessFailedCount.id;
                this.modifiedDate = updateAccessFailedCount.modifiedDate;
                this.modifiedById = updateAccessFailedCount.modifiedById;
                this.modifiedByName = updateAccessFailedCount.modifiedByName;
                this._accessFailCount = updateAccessFailedCount.accessFailCount;
                break;
            case updateLockoutEndEvent.name:
                const updateLockoutEnd= event as updateLockoutEndEvent;
                this.id = updateLockoutEnd.id;
                this.modifiedDate = updateLockoutEnd.modifiedDate;
                this.modifiedById = updateLockoutEnd.modifiedById;
                this.modifiedByName = updateLockoutEnd.modifiedByName;
                this._lockoutEnd = updateLockoutEnd.lockoutEnd;
                break;
            case UpdatePasswordEvent.name:
                const updatePasswordEvent= event as UpdatePasswordEvent;
                this.id = updatePasswordEvent.id;
                this.modifiedDate = updatePasswordEvent.modifiedDate;
                this.modifiedById = updatePasswordEvent.modifiedById;
                this.modifiedByName = updatePasswordEvent.modifiedByName;
                this._passwordHash = updatePasswordEvent.passwordHash;
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
               roles:string[],
               avatarPhoto:string,
               passwordChangeRequired:boolean,
               passwordValidUntilDate:Date,
               passwordHash:string,
               lockoutEnd:Date,
               passwordHashTemporary:string,
               lockoutEnabled:boolean,
               accessFailCount:number
               ) {
        const event = new InitializeUserEvent(id, name,status, email, phoneNumber, normalizedName, modifiedById, modifiedByName, modifiedDate,
            createdById, createdByName, createdDate,transactionId,roles, avatarPhoto,
            passwordChangeRequired,
            passwordValidUntilDate,
            passwordHash,
            lockoutEnd,
            passwordHashTemporary,
            lockoutEnabled,
            accessFailCount);

        this.addToDomainEvent(event);
        this.applyDomainEvent(event);
    }

    updateUserFirstLogin(id: string, transactionId: string, passwordHash: string, passwordHashTemporary: string
        , passwordChangeRequired: boolean, passwordValidUntilDate: Date, modifiedByName: string,
                         modifiedById: string,
                         modifiedDate: number){
        const event = new ChangePasswordFirstLoginEvent(id,transactionId,passwordHash,passwordHashTemporary,
            passwordChangeRequired,passwordValidUntilDate,modifiedByName,modifiedById,modifiedDate
            )
        this.applyDomainEvent(event);
        this.addToDomainEvent(event);
    }
    updateAccessFailedCount(id:string,transactionId:string,accessFailCount:number, modifiedByName: string,
                            modifiedById: string,
                            modifiedDate: number){
        const event = new updateAccessFailedCountEvent(id,transactionId,accessFailCount, modifiedByName,
            modifiedById,
            modifiedDate)
        this.applyDomainEvent(event);
        this.addToDomainEvent(event);
    }
    updateLockoutEnd(id:string,transactionId:string,lockoutEnd:Date, modifiedByName: string,
                            modifiedById: string,
                            modifiedDate: number){
        const event = new updateLockoutEndEvent(id,transactionId,lockoutEnd, modifiedByName,
            modifiedById,
            modifiedDate)
        this.applyDomainEvent(event);
        this.addToDomainEvent(event);
    }
    updatePassword(id:string,transactionId:string,passwordHash:string, modifiedByName: string,
                     modifiedById: string,
                     modifiedDate: number){
        const event = new UpdatePasswordEvent(id,transactionId,passwordHash, modifiedByName,
            modifiedById,
            modifiedDate)
        this.applyDomainEvent(event);
        this.addToDomainEvent(event);
    }

    get name() {
        return this._name;
    }

    get normalizedName() {
        return this._normalizedName;
    }

    get email() {
        return this._email;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    get status() {
        return this._status;
    }

    get passwordHashTemporary() {
        return this._passwordHashTemporary;
    }
    get passwordHash(){
        return this._passwordHash;
    }
    get passwordChangeRequired() {
        return this._passwordChangeRequired;
    }

    get passwordValidUntilDate() {
        return this._passwordValidUntilDate;
    }
    get lockOutEnable(){
        return this._lockoutEnabled;
    }
    get accessFailedCount(){
        return this._accessFailCount;
    }
    get lockoutEnd(){
        return this._lockoutEnd;
    }


}