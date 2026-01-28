import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}
    create(dto: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: dto.password,
                role: dto.role!,
                refreshToken: dto.refreshToken ?? undefined,
            }
        });
    }
    findAll() {
        return this.prisma.user.findMany({
            include: {
                membership: true,
                nutritionGoal: true,
            }
        })
    }
    findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                membership: true,
                nutritionGoal: true,
            }
        })
    }
    findOneWithEmail(email: string){
        return this.prisma.user.findUnique({
            where: { email }
        })
    }
    update(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: dto,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({
            where: { id },
        })
    }
    deleteRefreshToken(id: number) {
        return this.prisma.user.update({
            where: { id },
            data:  { refreshToken: null }
        })
    }

}
