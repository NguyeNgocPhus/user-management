import {BaseException} from "./Base.exception";


export class ExpiredUserPasswordException extends BaseException{
    constructor(messsage : any) {
        super(messsage.message || "password expired",ExpiredUserPasswordException.name,messsage.data||{},messsage.status||400);
    }
}