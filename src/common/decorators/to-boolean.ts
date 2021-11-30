import { Transform, TransformFnParams } from 'class-transformer';

export const ToBoolean = (): ((target: any, key: string) => void) => {
  return Transform(
    ({ value }: TransformFnParams) => value === 'true' || value === true || value === 1 || value === '1',
  );
};
