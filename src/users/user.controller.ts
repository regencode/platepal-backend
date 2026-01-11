import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ProfileEntity } from './entities/profile.entity';
import type { ReqUser } from 'src/types/ReqUser';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async findProfile(@CurrentUser() user: ReqUser) {
        const resolvedUser : any = await this.userService.findOne(user.sub); 
        return new ProfileEntity(resolvedUser!);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    async updateProfile(@CurrentUser() user: {sub: number , email: string}, @Body() dto: UpdateUserDto) {
        return this.userService.update(user.sub, dto);
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
