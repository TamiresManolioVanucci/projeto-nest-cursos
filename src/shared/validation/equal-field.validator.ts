import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: false })
export class EqualFieldValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedField] = args.constraints;
    const relatedFieldValue = (args.object as any)[relatedField];

    return value === relatedFieldValue;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be equal to ${args.constraints[0]}`;
  }
}

export const EqualField = (
  relatedField: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [relatedField],
      validator: EqualFieldValidator,
    });
  };
};
