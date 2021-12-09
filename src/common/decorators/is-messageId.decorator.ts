import { registerDecorator, ValidationArguments, ValidationOptions, matches } from 'class-validator';

export function IsMessageId(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsMessageId',
      target: object.constructor,
      propertyName,
      options: {
        message: `Wrong ${propertyName} format. ${propertyName} has format false_17472822486@c.us_DF38E6A25B42CC8CCE57EC40F`,
        ...validationOptions,
      },
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && matches(value, /^(true|false)_(?<id>\d+|\d+-\d+)@(?<type>[a-z]\.[a-z]{2})_(\w+)$/);
        },
      },
    });
  };
}
