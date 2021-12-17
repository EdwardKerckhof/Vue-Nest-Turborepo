import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const message = exception.message.replace(/\n/g, '')
    let httpStatus = HttpStatus.BAD_REQUEST

    // error codes: https://www.prisma.io/docs/reference/api-reference/error-reference
    switch (exception.code) {
      case 'P2000':
        // column name too long
        httpStatus = HttpStatus.BAD_GATEWAY
        break
      case 'P2002':
        // unique constraint
        httpStatus = HttpStatus.CONFLICT
        break
      case 'P2025':
        // not found
        httpStatus = HttpStatus.NOT_FOUND
        break
      default:
        // default 500 error
        super.catch(exception, host)
        break
    }

    response.status(httpStatus).json({
      statusCode: httpStatus,
      message
    })
  }
}
