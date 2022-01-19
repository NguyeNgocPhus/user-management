import {BaseException} from "./Base.exception";


export class WrongTypeFileException extends BaseException{
    constructor(messsage : any) {
        super(messsage.message || "wrong type file",WrongTypeFileException.name,messsage.data||{},messsage.status||400);
    }
}