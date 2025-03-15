import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
    });
    return await this.usersRepository.save(newUser);
  }

  async findById(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.usersRepository.update(userId, { refreshToken });
  }

  async removeRefreshToken(userId: string) {
    await this.usersRepository.update(userId, { refreshToken: '' });
  }
}
