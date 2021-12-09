import { registerDecorator, ValidationArguments, ValidationOptions, matches } from 'class-validator';

export function IsChatId(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsChatId',
      target: object.constructor,
      propertyName,
      options: {
        message: `Wrong chatId format. Please use "phone parameter" or chatId from message history. chatId has format 79680123456@c.us or 79680123456-1471234567@g.us`,
        ...validationOptions,
      },
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && matches(value, /^(?<id>\d+|\d+-\d+)@(?<type>[a-z]\.[a-z]{2})$/);
        },
      },
    });
  };
}
