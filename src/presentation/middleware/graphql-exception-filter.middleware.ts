import {ArgumentsHost, Catch, HttpStatus} from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { ApolloError } from "apollo-server-errors";
import NotFoundError from "../../domain/errors/not-found-error";

@Catch()
export default class GraphqlExceptionFilterMiddleware implements GqlExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.constructor) {
            case NotFoundError:
                statusCode = HttpStatus.NOT_FOUND
        }

        return new ApolloError(exception.message, HttpStatus[statusCode], { statusCode: statusCode });
    }
}