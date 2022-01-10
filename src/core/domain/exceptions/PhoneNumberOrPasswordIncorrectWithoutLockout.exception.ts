import {BaseException} from "./Base.exception";


export class PhoneNumberOrPasswordIncorrectWithoutLockoutException extends BaseException{
    constructor(messsage : any) {
        super(messsage.message || "password or email incorrect",PhoneNumberOrPasswordIncorrectWithoutLockoutException.name,messsage.data||{},messsage.status||400);
    }
}