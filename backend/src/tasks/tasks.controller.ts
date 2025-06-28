import { Body, Controller, Delete, Get, ParseArrayPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask } from './dto/create.task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() data: CreateTask) {}

  @Delete()
  async deleteTask(@Query('task_ids', ParseArrayPipe) task_ids: number) {}

  @Get()
  async getTasks(@Query('user_id', ParseIntPipe) user_id: number) {}
}
