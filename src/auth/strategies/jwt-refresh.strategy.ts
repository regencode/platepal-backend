import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";

const cookieOrBearerExtractor = (req: Request): string | null => {
    let token: string | null = null;
    // 1️⃣ Try cookie first
    if (req.cookies?.refreshToken) {
        token = req.cookies.refreshToken;
    }
    const authHeader = req.headers.authorization;
    if (!token && authHeader?.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }
    if (token) {
        (req as any).refreshToken = token;
    }
    return token;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                cookieOrBearerExtractor,
            ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET!,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        console.log("Refresh token validated for user:", payload.sub);
        return {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
            refreshToken: (req as any).refreshToken      // attach raw token
        };
    }
}
