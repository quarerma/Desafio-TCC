import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
// import { DataBaseService } from 'src/database/db.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
