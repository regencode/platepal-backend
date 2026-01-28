import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import type { ReqUser } from 'src/types/ReqUser';
import { MembershipRepository } from './membership.repository';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MembershipService {
    constructor(private readonly repo: MembershipRepository) {}

    @Cron("*/2 * * * *")
    async deleteExpired() {
        console.log("[CRON] Deleting expired items...");
        const now = new Date().toISOString()
        try {
            await this.repo.deleteExpiredBefore(now);
            console.log('[CRON] Done deleting expired items');
        } catch (err) {
            console.error('[CRON] Failed:', err);
        }
    }

    create(userId: number, dto: CreateMembershipDto) {
        const exist = this.repo.findByUser(userId);
        if(!exist) return this.repo.create(userId, dto);
        throw new ConflictException("user already has a membership!");
    }

    findUser(userId: number) {
        return this.repo.findByUser(userId);
    }

    findOne(id: number) {
        return this.repo.findOne(id);
    }
        
    update(id: number, dto: UpdateMembershipDto) {
        return this.repo.update(id, dto);
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
