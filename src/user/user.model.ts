import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('Users')
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ comment: '이름' })
  name: string;

  @Field({ nullable: false })
  @Column({ comment: '이메일', unique: true })
  email: string;

  @Field({ nullable: false })
  @Column({ comment: '패스워드' })
  password: string;

  @Field({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
