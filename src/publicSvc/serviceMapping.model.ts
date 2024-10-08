import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('ServiceMappings')
export class ServiceMapping {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ comment: '서비스 id' })
  serviceId: number;

  @Field({ nullable: false })
  @Column({ comment: '사용자 id' })
  userId: number;

  @Field({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
