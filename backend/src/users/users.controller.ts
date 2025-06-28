import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    try {
      return this.usersService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() data: CreateUserDTO) {
    try {
      return this.usersService.login(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getSession(@Query('user_id', ParseIntPipe) id: number) {
    try {
      return this.usersService.getSession(id);
    } catch (error) {
      throw error;
    }
  }
}
