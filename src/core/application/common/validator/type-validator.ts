import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {RoleRepository} from "../../../../infrastructure/repositories/role.repository";
import {Injectable} from "@nestjs/common";
import {TypeRepository} from "../../../../infrastructure/repositories/type.repository";



@ValidatorConstraint({async: true})
@Injectable()
export class IsValidTypeConstraint implements ValidatorConstraintInterface {
    constructor(private typeRepository: TypeRepository) {
    }

    async validate(id: string, args: ValidationArguments) {
        // console.log(this.roleRepository)
        const Exist_Type = await this.typeRepository.getTypeByIdAsync(id);
        if(!Exist_Type){
            return false;
        }else {
            return true
        }

    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'role not found';
    }
}

export function IsValidType(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidRole',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsValidTypeConstraint
        });
    };
}