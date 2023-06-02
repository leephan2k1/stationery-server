import * as connectMongoDBSession from 'connect-mongodb-session';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const MongoDBStore = connectMongoDBSession(session);

const sessionsStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
});

async function bootstrap() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001;

  const app = await NestFactory.create(AppModule);

  //should be call before SwaggerModule setup
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
      store: sessionsStore,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Stationery server')
    .setDescription('Stationery Apis')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true, // transform object to DTO class
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () => {
    console.log(`server is listening at PORT: ${PORT}`);
  });
}
bootstrap();
