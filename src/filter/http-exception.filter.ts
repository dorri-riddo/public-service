import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
@Catch()
export class GqlHttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown, _host: ArgumentsHost) {
    // 예외가 HttpException인 경우
    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      const status = exception.getStatus();
      const errorMessage =
        typeof responseBody === 'string'
          ? responseBody
          : (responseBody as any).message;

      return new GraphQLError(errorMessage, {
        extensions: {
          code: status,
          message: errorMessage,
        },
      });
    }

    // 기타 예외 처리
    return new GraphQLError('Internal server error', {
      extensions: {
        code: 500,
        message: (exception as any).message,
      },
    });
  }
}
