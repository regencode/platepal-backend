import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ReqUser } from 'src/types/ReqUser';
import { MembershipRepository } from './membership.repository';

@Injectable()
export class MembershipService {
    constructor(private readonly repo: MembershipRepository) {}
    createForUser(user: ReqUser, dto: CreateMembershipDto) {
        return this.repo.create(user.sub, dto);
    }

    findUser(user: ReqUser) {
        return this.repo.find(user.sub);
    }

    findOne(id: number) {
        return this.repo.find(id);
    }
        
    update(id: number, dto: UpdateMembershipDto) {
        return this.repo.update(id, dto);
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
