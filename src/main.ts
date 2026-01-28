import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    const allowedOrigins = [
        "https://platepal-admin-panel.vercel.app",
        process.env.FRONTEND_URL,
    ];
    app.enableCors({
        origin: (origin, callback) => {
            // origin can be undefined in mobile apps or Postman
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
    console.log('CORS enabled for origin:', process.env.FRONTEND_URL);
    await app.listen(process.env.PORT ?? 5050);
}
bootstrap();
