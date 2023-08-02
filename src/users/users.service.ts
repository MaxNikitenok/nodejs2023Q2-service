import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid4 } from 'uuid';
import { isString } from 'class-validator';
import { Database } from 'src/db/db';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    if (!isString(createUserDto.login) || !isString(createUserDto.password)) {
      throw new HttpException(
        'Login and password must be strings',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser: User = {
      ...createUserDto,
      id: uuid4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    Database.users.push(newUser);
    return newUser;
  }

  findAll() {
    return Database.users;
  }

  findOne(id: string): User | undefined {
    return Database.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto.oldPassword || !updateUserDto.newPassword) {
      throw new BadRequestException(
        'Request body must contain required fields',
      );
    }
    if (!isString(updateUserDto.newPassword)) {
      throw new BadRequestException('Invalid dto');
    }
    const user = Database.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password === updateUserDto.oldPassword) {
      user.password = updateUserDto.newPassword;
      user.version++;
      user.updatedAt = Date.now();
      return user;
    } else {
      throw new ForbiddenException('Password is wrong');
    }
  }

  delete(id: string) {
    const user = Database.users.find((user) => user.id === id);
    const userIndex = Database.users.findIndex((user) => user.id === id);
    if (user) {
      Database.users.splice(userIndex, 1);
    }
  }
}
