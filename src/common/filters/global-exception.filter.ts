import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseError, ForeignKeyConstraintError } from 'sequelize';

@Catch(BaseError)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.errors) {
      response.status(400).send({
        statusCode: 400,
        errors: exception.errors.map((e) => {
          return { error: e.type, message: e.message };
        }),
      });
    } else {
      let message = exception.message;
      if (exception instanceof ForeignKeyConstraintError) {
        console.log(exception.fields);
        message = `The selected ${exception.fields[0]} is invalid`;
      }
      response.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message,
      });
    }
  }
}
