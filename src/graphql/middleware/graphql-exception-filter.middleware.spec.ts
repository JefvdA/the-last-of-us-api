import GraphqlExceptionFilterMiddleware from './graphql-exception-filter.middleware';
import { HttpStatus } from '@nestjs/common';
import NotFoundError from '../../domain/errors/not-found-error';
import ValueObjectValidationError from '../../domain/errors/value-object-validation-error';
import { QueryFailedError } from 'typeorm';

describe(GraphqlExceptionFilterMiddleware.name, () => {
  let exceptionFilter: GraphqlExceptionFilterMiddleware;

  beforeAll(() => {
    exceptionFilter = new GraphqlExceptionFilterMiddleware();
  });

  describe('catch', () => {
    it('should return the same message as the original exception', () => {
      const originalMessage = 'This is the original message!';
      const apolloError = exceptionFilter.catch(new Error(originalMessage));

      expect(apolloError.message).toBe(originalMessage);
    });

    it('should return INTERNAL_SERVER_ERROR by default', () => {
      const apolloError = exceptionFilter.catch(new Error());
      const extensions = apolloError.extensions;

      expect(extensions.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(extensions.code).toBe(
        HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
      );
    });

    it('should return NOT_FOUND if a NotFoundError is caught', () => {
      const apolloError = exceptionFilter.catch(new NotFoundError(''));
      const extensions = apolloError.extensions;

      expect(extensions.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(extensions.code).toBe(HttpStatus[HttpStatus.NOT_FOUND]);
    });

    it('should return BAD_REQUEST if a ValueObjectValidationError is caught', () => {
      const apolloError = exceptionFilter.catch(
        new ValueObjectValidationError('', ''),
      );
      const extensions = apolloError.extensions;

      expect(extensions.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(extensions.code).toBe(HttpStatus[HttpStatus.BAD_REQUEST]);
    });

    it('should return CONFLICT if a QueryFailedError is caught', () => {
      const apolloError = exceptionFilter.catch(
        new QueryFailedError('', [], ''),
      );
      const extensions = apolloError.extensions;

      expect(extensions.statusCode).toBe(HttpStatus.CONFLICT);
      expect(extensions.code).toBe(HttpStatus[HttpStatus.CONFLICT]);
    });
  });
});
