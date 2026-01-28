import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto, CreateMembershipWithUserDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { ReqUser } from 'src/types/ReqUser';

@Controller('me/membership')
export class MeMembershipController {
  constructor(private readonly service: MembershipService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: ReqUser, @Body() dto: CreateMembershipDto) {
    return this.service.createForUser(user, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  find(@CurrentUser() user: ReqUser) {
    return this.service.findUser(user);
  }

}

@Controller('/membership')
export class MembershipController {
  constructor(private readonly service: MembershipService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body dto: CreateMembershipWithUserDto) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMembershipDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
