import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsVietnamesePhoneNumber( validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isVietnamesePhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const regexp = new RegExp("^(\\+84|0)(3|5|7|8|9)[0-9]\\d{7}$", "m");

                    return typeof value === 'string' && regexp.test(value);

                },
            },
        });
    };
}