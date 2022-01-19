import {Claims} from "../../../../infrastructure/common/authentication/claims/claims";
import {CreateProductRequestDto} from "../../../domain/dtos/product/create-product-request.dto";

export class CreateProductCommand{
    constructor(public readonly payload:CreateProductRequestDto,public readonly claim:Claims) {
    }
}