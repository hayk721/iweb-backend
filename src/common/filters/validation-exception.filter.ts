import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'sequelize';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(400).send({
      statusCode: 400,
      errors: exception.errors.map((e) => {
        return { error: e.type, message: e.message };
      }),
    });
  }
}
