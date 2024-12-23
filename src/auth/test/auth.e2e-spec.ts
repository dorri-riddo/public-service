import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import request from 'supertest';
import * as pactum from 'pactum';

import { AppModule } from '../../app.module';

describe('인증 E2E', () => {
  let app: INestApplication;
  let url: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0);
    url = await app.getUrl();
    pactum.request.setBaseUrl(url.replace('[::1]', 'localhost'));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('이메일 인증코드 발송 E2E', () => {
    it('/graphql', () => {
      return pactum
        .spec()
        .post('/graphql')
        .withGraphQLQuery(
          `
          mutation {
            confirmAuthCode(payload: { email: "test@test.com", authCode: "000000" })
          }
        `,
        )
        .expectStatus(200);
    });
  });

  describe('로그인 E2E', () => {
    it('/graphql', () => {
      return pactum
        .spec()
        .post('/graphql')
        .withGraphQLQuery(
          `
          mutation {
            logIn(payload: { email: "test@test.com", password: "test" }) {
              accessToken
              refreshToken
            }
          }
        `,
        )
        .expectStatus(200);
    });
  });
});
