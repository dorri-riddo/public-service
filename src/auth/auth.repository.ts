import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.model';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../user/user.model';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth) private readonly repo: Repository<Auth>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createAuth(payload: DeepPartial<Auth>): Promise<Auth> {
    return await this.repo.save(payload);
  }

  async findByEmail(email: string): Promise<Auth | null> {
    return await this.repo.findOne({ where: { email }, order: { id: 'DESC' } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async updateAuth(id: number, payload: DeepPartial<Auth>): Promise<void> {
    await this.repo.update({ id }, payload);
  }
}
