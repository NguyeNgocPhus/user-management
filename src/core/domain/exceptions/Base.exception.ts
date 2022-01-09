export class BaseException extends Error{
    public data:any;
    public status:any;

    constructor(message : string,name:string,data:any,status:any) {
        super();
        this.message = message;
        this.data = data;
        this.name = name;
        this.status = status;
    }
}