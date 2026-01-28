import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto, CreateMembershipWithUserDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { ReqUser } from 'src/types/ReqUser';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('me/membership')
export class MeMembershipController {
  constructor(private readonly service: MembershipService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: ReqUser, @Body() dto: CreateMembershipDto) {
    return this.service.create(user.sub, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  find(@CurrentUser() user: ReqUser) {
    return this.service.findUser(user.sub);
  }

}

@Controller('/membership')
export class MembershipController {
  constructor(private readonly service: MembershipService) {}

  @Get(':id')
  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateMembershipWithUserDto) {
    return this.service.create(dto.userId, dto);
  }

  @Patch(':id')
  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: number, @Body() dto: UpdateMembershipDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles("ADMIN")
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
