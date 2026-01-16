import { Controller, Post, Get, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { ReqUser } from 'src/types/ReqUser';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }
    @Post("login")
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const { accessToken, refreshToken } = await this.authService.login(dto)
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // only on prod
            sameSite: 'strict',
            path: '/auth/refresh',
        });
        return { accessToken, refreshToken };
    }
    @Post("logout")
    @UseGuards(JwtRefreshGuard)
    async logout(@CurrentUser() user: ReqUser) {
        return this.authService.logout(user);
    }

    @Post("refresh")
    @UseGuards(JwtRefreshGuard)
    checkRefresh(@CurrentUser() user: ReqUser){
        // todo: refresh access token
        return this.authService.refresh(user);
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user: ReqUser){
        return user;
    }
}
