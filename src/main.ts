import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { GlobalExceptionFilter } from '@common/filters/global-exception.filter';
import fmp from 'fastify-multipart';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { fastifyHelmet } from 'fastify-helmet';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({ logger: true });
  fastifyAdapter.register(fmp, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 1000000, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 100, // For multipart forms, the max file size
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder().setTitle('Iweb').setDescription('Iweb system').setVersion('1.0').addTag('Iweb').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();

  await app.listen(process.env.SERVER_PORT, '0.0.0.0');
}
bootstrap();
