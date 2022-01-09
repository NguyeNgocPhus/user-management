import {BaseException} from "./Base.exception";


export class DuplicatedItemException extends BaseException{
    constructor(messsage : any) {
        super(messsage.message || "duplicate item",DuplicatedItemException.name,messsage.data||{},messsage.status||400);
    }
}