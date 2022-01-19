import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10    }));
  await app.listen(3000,()=>{
    console.log("connect port 3000")
  });
}
bootstrap();
