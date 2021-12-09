import { Transform, TransformFnParams } from 'class-transformer';

export const ToReal = (): ((target: any, key: string) => void) => {
  return Transform(({ value }: TransformFnParams) => (Number.isInteger(value) ? value.toFixed(1) : value));
};
