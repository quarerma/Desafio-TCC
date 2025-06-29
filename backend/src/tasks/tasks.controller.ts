import { Body, Controller, Delete, Get, ParseArrayPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask } from './dto/create.task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() data: CreateTask) {
    return this.tasksService.createTask(data);
  }

  @Delete()
  async deleteTask(@Query('task_ids') task_ids: number[]) {
    console.log(task_ids);
    if (typeof task_ids === 'number') {
      return this.tasksService.deleteTask([task_ids]);
    } else {
      return this.tasksService.deleteTask(task_ids);
    }
  }

  @Get()
  async getTasks(@Query('user_id', ParseIntPipe) user_id: number) {
    try {
      return this.tasksService.getTasks(user_id);
    } catch (error) {
      throw error;
    }
  }
}
