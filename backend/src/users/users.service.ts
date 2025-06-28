import { HttpException, Injectable } from '@nestjs/common';
// import { DataBaseService } from 'src/database/db.service';
import * as bcrypt from 'bcrypt';
import { db } from '../mock.db';
import { CreateUserDTO } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  // constructor(private readonly prismaService: DataBaseService) {}

  async create(body: CreateUserDTO) {
    try {
      console.log(body);
      const { password, email } = body;

      const cryptedPassword = await this.hashPassword(password);

      // return await this.prismaService.user.create({
      //   data: {
      //     email,
      //     password: cryptedPassword,
      //   },
      // });
      const existingUser = db.users.find((user) => user.email === email);
      if (existingUser) {
        throw new HttpException('Email already exists', 400);
      }

      const maxId = db.users.length > 0 ? Math.max(...db.users.map((user) => user.id)) : 0;

      const newUser = {
        id: maxId + 1,
        email,
        password: cryptedPassword,
        create_at: new Date().toISOString(),
        tasks: [],
      };

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async login(body: CreateUserDTO) {
    // const user = this.prismaService.user.findFirst({
    //   where: { email: body.email },
    // });

    // if (await bcrypt.compare(body.password, user.password)) {
    //   return user;
    // }
    const user = db.users.find((user) => user.email === body.email);

    if (!user) throw new HttpException('Not Found', 404);
    if (body.password === user.password) {
      return user;
    }

    throw new HttpException('Invalid credentials', 401);
  }

  async hashPassword(password: string) {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  async getSession(user_id: number) {
    // const user = this.prismaService.user.findFirst({
    //   where: { id: user_id },
    // });

    const user = db.users.find((user) => user.id === user_id);

    if (!user) throw new HttpException('Not Found', 404);

    return user;
  }
}
