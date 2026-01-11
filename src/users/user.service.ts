import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly repo: UserRepository) {}
    create(dto: CreateUserDto) {
        return this.repo.create(dto)
    }

    findAll() {
        return this.repo.findAll();
    }

    findOne(id: number) {
        return this.repo.findOne(id);
    }

    update(id: number, dto: UpdateUserDto) {
        return this.repo.update(id, dto);
    }

    remove(id: number) {
        return this.repo.remove(id);
    }
}
