import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { DataBaseService } from 'src/database/db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
