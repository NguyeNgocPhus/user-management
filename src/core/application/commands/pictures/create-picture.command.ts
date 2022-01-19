import { FileUpload } from 'graphql-upload';
import {Claims} from "../../../../infrastructure/common/authentication/claims/claims";

export class CreatePictureCommand{
    constructor(public readonly productId:string,public readonly pictures:FileUpload[],public  readonly claim:Claims) {
    }
}