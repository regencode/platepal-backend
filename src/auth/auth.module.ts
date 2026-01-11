import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'prisma/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/users/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
          secret: env("JWT_SECRET"),
          signOptions: { expiresIn: '15m' }, // access token
        }),
        UserModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtModule]
})
export class AuthModule {}
