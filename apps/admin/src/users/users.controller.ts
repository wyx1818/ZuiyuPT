import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[] | null> {
    return await this.usersService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }
}
