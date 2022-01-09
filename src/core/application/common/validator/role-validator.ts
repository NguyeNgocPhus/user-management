import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {RoleRepository} from "../../../../infrastructure/repositories/role.repository";
import {Injectable} from "@nestjs/common";



@ValidatorConstraint({async: true})
@Injectable()
export class IsValidRolesConstraint implements ValidatorConstraintInterface {
    constructor(private roleRepository: RoleRepository) {
    }

    async validate(role: string[], args: ValidationArguments) {
       // console.log(this.roleRepository)
        const Exist_roles = await this.roleRepository.getRoleByIds(role);
        if(Exist_roles.length !== role.length){
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

export function IsValidRoles(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidRole',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsValidRolesConstraint
        });
    };
}