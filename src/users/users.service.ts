import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRespository.find();
  }

  async signIn(
    userName: string,
    password: string,
  ): Promise<{
    token: string;
    user: User;
  }> {
    const user = await this.userRespository.findOne({ where: { userName } });
    if (!user || user.password !== password) {
      throw new NotFoundException('Invalid Credentials');
    }

    const token = sign({ ...user }, 'secret');
    return { token, user };
  }

  async signUp(user: Partial<User>): Promise<User> {
    const created_user = this.userRespository.create(user);
    return this.userRespository.save(created_user);
  }
}
