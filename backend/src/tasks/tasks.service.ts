import { Injectable } from '@nestjs/common';
// import { DataBaseService } from 'src/database/db.service';
import { CreateTask } from './dto/create.task.dto';
import { db } from '../mock.db';

@Injectable()
export class TasksService {
  // constructor(private readonly prisma: DataBaseService) {}

  async createTask(data: CreateTask) {
    // return this.prisma.tasks.create({
    //   data: {
    //     title: data.title,
    //     description: data.description,
    //     priority: data.priority,
    //     user_id: data.user_id,
    //   },
    // });

    const allTasks = db.users.flatMap((user) => user.tasks);
    const maxId = allTasks.length > 0 ? Math.max(...allTasks.map((task) => task.id)) : 0;

    const newTask = {
      id: maxId + 1,
      title: data.title,
      description: data.description || null,
      priority: data.priority,
      user_id: data.user_id,
    };

    return newTask;
  }

  async deleteTask(taskIds: number[]) {
    // return this.prisma.tasks.deleteMany({
    //   where: {
    //     id: { in: taskIds },
    //   },
    // });

    const filteredTasks = db.users.flatMap((user) => {
      const filtered = user.tasks.filter((task) => !taskIds.includes(task.id));
      user.tasks = filtered;
      return filtered;
    });

    return filteredTasks;
  }

  async getTasks(userId: number) {
    // return this.prisma.tasks.findMany({
    //   where: {
    //     user_id: userId,
    //   },
    // });

    // Find user and return their tasks
    const user = db.users.find((u) => u.id === userId);
    return user ? user.tasks : [];
  }
}
