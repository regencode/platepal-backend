import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcrypt";
import { UserRepository } from 'src/users/user.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import type { ReqUser } from 'src/types/ReqUser';

@Injectable()
export class AuthService {
    constructor(private readonly repo: UserRepository, 
                private readonly jwtService: JwtService) {}

    saltRounds = 10;

    async signTokens(userId: number, email: string) {
        const payload : ReqUser = { sub: userId, email };

        const accessToken = await this.jwtService.signAsync(payload, {
              secret: process.env.JWT_ACCESS_SECRET,
              expiresIn: '60m',
            });

        const refreshToken = await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        });
        return { accessToken, refreshToken }
    }

    async register(dto: RegisterDto) {
        const userExists = await this.repo.findOneWithEmail(dto.email)
        if(userExists) throw new UnauthorizedException("User with same email already exist!");

        const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);
        const newDto : CreateUserDto = {
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            refreshToken: undefined,
            role: dto.role ?? undefined
        }

        return this.repo.create(newDto);
    }

    async login(dto: LoginDto) {
        const matchedUser = await this.repo.findOneWithEmail(dto.email)
        if(!matchedUser) throw new UnauthorizedException("User does not exist!");
        const id = matchedUser.id;
        const passwordsMatch = await bcrypt.compare(
            dto.password, 
            matchedUser.password
        ) 
        if(!passwordsMatch) throw new UnauthorizedException("Incorrect password!");

        const { accessToken, refreshToken } = await this.signTokens(matchedUser.id, dto.email)

        const refreshTokenHash = await bcrypt.hash(refreshToken, this.saltRounds);

        const newDto : UpdateUserDto = {
            refreshToken: refreshTokenHash,
        }
        this.repo.update(id, newDto);
        return {
            accessToken,
            refreshToken
        }
    }
}
