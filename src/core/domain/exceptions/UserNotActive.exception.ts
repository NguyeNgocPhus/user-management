import {BaseException} from "./Base.exception";


export class UserNotActiveException extends BaseException{
    constructor(messsage : any) {
        super(messsage.message || "user not active",UserNotActiveException.name,messsage.data||{},messsage.status||400);
    }
}