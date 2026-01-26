import { Role } from "generated/prisma/enums";

export interface ReqUser {
    sub: number,
    email: string,
    role: Role,
    refreshToken?: string,
}
