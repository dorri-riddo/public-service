import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.model';
import { Auth } from '../auth/auth.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async findAuthByEmail(email: string): Promise<Auth | null> {
    return await this.authRepo.findOne({ where: { email, isConfirmed: true } });
  }

  async createUser(payload: DeepPartial<User>): Promise<User> {
    return await this.repo.save(payload);
  }
}
