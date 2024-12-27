## Description

공공데이터를 활용하여 공공서비스 목록 및 상세 서비스를 활용할 수 있는 앱
An app that utilizes public data to access a list of public services and detailed service information

## Database Schema

프로젝트의 데이터베이스 구조를 쉽게 파악할 수 있도록 DDL(Data Definition Language) 스크립트를 정리해두었습니다.
테이블 구조와 관계를 확인하시려면 `sql` 폴더를 참고해 주세요.
We've organized the Data Definition Language (DDL) scripts so that you can easily understand the database structure of your project.
Please refer to the `sql` folder to see the table structure and relationships.

## Tech Stack

- MySQL
- TypeScript
- NestJS
- Graphql

## Installation

```bash
$ npm install
```

## Running the app

env 파일이 필요합니다
You need an env file

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e
```

## Author

- [dorri-riddo](https://github.com/dorri-riddo/public-service)
