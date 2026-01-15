import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UpdateMembershipDto } from "./dto/update-membership.dto";

@Injectable()
export class MembershipRepository {
    constructor(private readonly prisma: PrismaService) {}
    create(userId: number, dto: CreateMembershipDto) {
        return this.prisma.membership.create({
            data: { userId, ...dto }
        })
    }
    find(userId: number){
        return this.prisma.membership.findUnique({
            where: { userId }
        })
    }
    update(id: number, dto: UpdateMembershipDto) {
        return this.prisma.membership.update({
            where: { id },
            data: { ...dto }
        })
    }
    delete(id: number) {
        return this.prisma.membership.delete({
            where: { id }
        })
    }
    deleteExpiredBefore(timestampUTC: string) {
        return this.prisma.membership.deleteMany({
            where: {
                expiresAt: {
                    lt: timestampUTC
                }
            }
        })
    }

}
