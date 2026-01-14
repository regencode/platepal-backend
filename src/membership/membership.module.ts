import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController, MeMembershipController } from './membership.controller';
import { MembershipRepository } from './membership.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [MeMembershipController, MembershipController],
    providers: [MembershipService, MembershipRepository],
})
export class MembershipModule {}
