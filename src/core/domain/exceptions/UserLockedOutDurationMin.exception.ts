import {BaseException} from "./Base.exception";


export class UserLockedOutDurationMinException extends BaseException{
    constructor(messsage : any) {
        super(messsage.message || "",UserLockedOutDurationMinException.name,messsage.data||{},messsage.status||400);
    }
}