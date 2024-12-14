import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { AuthService } from '../auth.service';
import { AuthRepository } from '../auth.repository';
import { Auth } from '../auth.model';
import { User } from '../../user/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let repo: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthRepository,
        JwtService,
        {
          provide: MailerService,
          useValue: {},
        },
        {
          provide: DataSource,
          useFactory: () => ({}),
        },
        {
          provide: getRepositoryToken(Auth),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get<AuthRepository>(AuthRepository);
  });

  describe('confirmAuthCode', () => {
    it('인증코드를 받은 적이 없으면 400 에러가 뜬다', async () => {
      const payload = { email: 'test@test-mail', authCode: '123456' };
      jest.spyOn(repo, 'findByEmail').mockResolvedValueOnce(null);

      await expect(service.confirmAuthCode(payload)).rejects.toThrowError(
        new BadRequestException('invalid auth code'),
      );
    });

    it('인증코드를 받은지 3분이 지나고 인증하면 400 에러가 뜬다', async () => {
      const payload = { email: 'test@test-mail', authCode: '123456' };
      jest.spyOn(repo, 'findByEmail').mockResolvedValueOnce({
        id: 1,
        email: 'test@test-mail',
        authCode: '123456',
        isConfirmed: false,
        createdAt: new Date('2024-12-01T00:00:00.000Z'),
      });

      await expect(service.confirmAuthCode(payload)).rejects.toThrowError(
        new BadRequestException('invalid auth code'),
      );
    });

    it('인증코드를 받은지 3분이 지나지 않았으나 인증코드가 맞지 않으면 400 에러가 뜬다', async () => {
      const payload = { email: 'test@test-mail', authCode: '123456' };
      jest.spyOn(repo, 'findByEmail').mockResolvedValueOnce({
        id: 1,
        email: 'test@test-mail',
        authCode: '000000',
        isConfirmed: false,
        createdAt: new Date(),
      });

      await expect(service.confirmAuthCode(payload)).rejects.toThrowError(
        new BadRequestException('invalid auth code'),
      );
    });

    it('올바른 인증코드를 제시간에 인증하면 true 를 응답한다', async () => {
      const payload = { email: 'test@test-mail', authCode: '123456' };
      const updateOn = jest.spyOn(repo, 'updateAuth');
      jest.spyOn(repo, 'findByEmail').mockResolvedValueOnce({
        id: 1,
        email: 'test@test-mail',
        authCode: '123456',
        isConfirmed: false,
        createdAt: new Date(),
      });

      const result = await service.confirmAuthCode(payload);

      expect(result).toBeTruthy();
      expect(updateOn.mock.calls[0][1]).toMatchObject({ isConfirmed: true });
    });
  });
});
