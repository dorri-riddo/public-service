import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';

import { Auth } from './auth.model';
import { AuthRepository } from './auth.repository';
import { ReqConfirmAuth, ReqLoginInput, ReqValidateInput } from './dto/req';
import { ResLogin } from './dto/resp';
import { privateKey, privateRefreshKey } from './dto/dto';

const THREE_MINUTES = 1000 * 60 * 3;

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly repo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 회원가입 인증 코드를 이메일로 전송
   * @param email 이메일 주소
   * @returns Promise<void>
   * @description
   * 6자리 인증번호를 생성하여 이를 이메일에 전송
   */
  async sendAuthCodeEmail(email: string): Promise<void> {
    const authCode = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      '0',
    );

    // 인증번호 저장
    await this.createAuth(email, authCode);

    // 메일 전송
    const mailOptions = {
      from: '-',
      to: email,
      subject: '회원가입 인증 코드',
      text: `회원가입 인증 코드: ${authCode}`,
    };

    await this.mailerService.sendMail(mailOptions);
  }

  /**
   * 이메일과 인증번호를 저장
   * @param email 이메일 주소
   * @param authCode 6자리 인증번호
   * @returns 저장된 Auth 엔티티
   * @description
   * 이메일과 인증번호를 TypeORM을 사용하여 저장
   */
  private async createAuth(email: string, authCode: string): Promise<Auth> {
    return await this.repo.createAuth({ email, authCode });
  }

  /**
   * 인증번호 확인
   * @param payload 이메일과 인증번호
   * @returns 인증 성공 여부
   * @description
   * 이메일과 인증번호를 확인하여 3분 이내에 일치하면 true, 그렇지 않으면 false 반환
   */
  async confirmAuthCode(payload: ReqConfirmAuth): Promise<boolean> {
    const { email, authCode } = payload;
    const auth = await this.repo.findByEmail(email);

    this.validateAuthCode(auth, authCode);

    await this.repo.updateAuth(auth.id, { isConfirmed: true });
    return true;
  }

  /**
   * 로그인을 합니다.
   * @param payload 로그인 정보
   * @throws BadRequestException 이메일이 잘못된 경우
   * @throws BadRequestException 비밀번호가 잘못된 경우
   * @returns 성공 여부
   */
  async logIn(payload: ReqLoginInput): Promise<ResLogin> {
    const { email, password } = payload;
    const user = await this.repo.findUserByEmail(email);

    // 로그인 정보 검증
    await this.validateLoginUser({ user, password });

    // 토큰 발급
    const accessToken = await this.createAccessToken(user.id);
    const refreshToken = await this.createRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  /**
   * 로그인 정보를 검증합니다.
   * @param payload 로그인 정보
   * @throws BadRequestException 이메일이 잘못된 경우
   * @throws BadRequestException 비밀번호가 잘못된 경우
   */
  private async validateLoginUser(payload: ReqValidateInput): Promise<void> {
    const { user, password: plainPassword } = payload;

    // 이메일로 회원가입하였는지 확인
    if (!user) {
      throw new BadRequestException('invalid email');
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('invalid password');
    }
  }

  /**
   * AccessToken을 생성하여 반환합니다.
   * @param userId 회원 ID
   * @returns AccessToken
   * @description
   * 1시간 동안 유효한 AccessToken을 생성하여 반환
   */
  private async createAccessToken(userId: number): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        algorithm: 'RS256',
        expiresIn: '1h',
        privateKey: privateKey,
      },
    );
    return accessToken;
  }

  /**
   * RefreshToken을 생성하여 반환합니다.
   * @param userId 회원 ID
   * @returns RefreshToken
   * @description
   * 1일 동안 유효한 RefreshToken을 생성하여 반환
   */
  private async createRefreshToken(userId: number): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        algorithm: 'RS256',
        expiresIn: '1day',
        privateKey: privateRefreshKey,
      },
    );
    return refreshToken;
  }

  /**
   * 인증코드를 검증한다
   * @param auth
   * @param authCode
   * @returns
   */
  private validateAuthCode(auth: Auth | null, authCode: string): boolean {
    if (!auth) {
      throw new BadRequestException('invalid auth code');
    }

    const timeDiff = Math.abs(dayjs().diff(auth.createdAt));
    if (timeDiff > THREE_MINUTES) {
      throw new BadRequestException('invalid auth code');
    }

    if (auth.authCode !== authCode) {
      throw new BadRequestException('invalid auth code');
    }

    return true;
  }
}
