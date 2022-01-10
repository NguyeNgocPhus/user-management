import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEqualTo( validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isVietnamesePhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                   const newPassword =  args.object["newPassword"];
                   return newPassword === value;

                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${propertyName} must match ${relatedPropertyName} exactly`;
                },
            },
        });
    };
}