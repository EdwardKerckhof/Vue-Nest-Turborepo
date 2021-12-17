import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const {httpAdapter} = app.get(HttpAdapterHost)
  app.useGlobalFilters((new PrismaClientExceptionFilter(httpAdapter)))

  const config = new DocumentBuilder()
    .setTitle('NestJS Template')
    .setDescription('API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
