import {BaseAggregates} from "../common/event-store/aggregates/base.aggregates";
import {BaseEvent} from "../common/event-store/event/base.event";
import {TypeEnum} from "../common/enum/type.status";
import {InitializeTypeEvent} from "../../application/events/type.event";
import {ProductStatus} from "../common/enum/product.status";


export class ProductAggregates extends BaseAggregates{
    private _name:string;
    private _normalizedName:string;
    private _description:string;
    private _price: number;
    private _quantity: number;
    private _size: string[];
    private _color : string;
    private _image : string;
    private _sellNumber: number;
    private _sale: number;
    private _status: ProductStatus;

    constructor(id:string) {
        super();
        this.id =  id ;
        this.domainEvents=[];
        this.streamName = `Product-${id}`;
    }
    applyDomainEvent(event:BaseEvent){
        switch (event.eventName) {

        }
    }
    initialize(id:string,transactionId:string,name:string,normalizedName:string,description:string,status:TypeEnum,
               modifiedByName: string,
               modifiedById: string,
               modifiedDate: number,
               createdById: string,
               createdByName: string,
               createdDate: number,
    ){
        const event  = new InitializeTypeEvent(id,transactionId,name,normalizedName,description,status,
            modifiedByName,
            modifiedById,
            modifiedDate,
            createdById,
            createdByName,
            createdDate);
        this.addToDomainEvent(event);
        this.applyDomainEvent(event);
    }
    get name(){
        return this._name;
    }
    get normalizedName(){
        return this._normalizedName;
    }
    get description(){
        return this._description;
    }

}