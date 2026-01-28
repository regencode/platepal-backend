import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET!,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const refreshToken =
            req.headers.authorization?.replace('Bearer ', '');
        return {
            ...payload,        // usually { sub, email }
            refreshToken: refreshToken      // attach raw token
        };
    }
}
