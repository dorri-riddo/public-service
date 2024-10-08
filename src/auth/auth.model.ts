import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('Auth')
export class Auth {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ comment: '이메일' })
  email: string;

  @Field({ nullable: false })
  @Column({ comment: '인증 코드' })
  authCode: string;

  @Field({ nullable: false, defaultValue: false })
  @Column({ comment: '인증 여부', default: false })
  isConfirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

@InputType()
export class CreateAuthInput {
  @Field(() => String, { description: '이메일' })
  email: string;

  @Field(() => String, { description: '인증코드' })
  authCode: string;
}
