import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { ReqCreateUserInput } from './dto/req';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  /**
   * 회원가입을 합니다.
   * @param payload 회원가입 정보
   * @throws ConflictException 이메일이 중복되는 경우
   * @throws BadRequestException 이메일이 인증되지 않은 경우
   * @returns 생성된 회원 정보
   */
  async createUser(payload: ReqCreateUserInput): Promise<User> {
    const { email, name, password } = payload;

    // 신규 사용자 정보 검증
    await this.validateNewUser(payload);

    // 비밀번호 생성
    const hashPassword = this.generateHashPassword(password);

    return await this.repo.createUser({
      email,
      name,
      password: hashPassword,
    });
  }

  /**
   * 신규 사용자 정보를 검증합니다.
   * @param payload 신규 사용자 정보
   * @throws ConflictException 이메일이 중복되는 경우
   * @throws BadRequestException 이메일이 인증되지 않은 경우
   */
  private async validateNewUser(payload: ReqCreateUserInput): Promise<void> {
    const { email } = payload;

    // 중복 이메일 확인
    const existedEmail = await this.repo.findByEmail(email);
    if (existedEmail) {
      throw new ConflictException('email already exists');
    }

    // 인증완료 확인
    const auth = await this.repo.findAuthByEmail(email);
    if (!auth) {
      throw new BadRequestException('email is not confirmed');
    }
  }

  /**
   * 비밀번호를 암호화하여 반환합니다.
   * @param password 비밀번호
   * @returns 암호화된 비밀번호
   */
  private generateHashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}
