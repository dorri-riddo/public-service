import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResPublicSvcDetail } from './dto/resp';

@ObjectType()
@Entity('Services')
export class Service {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ comment: '외부 서비스 id' })
  externalId: string;

  @Field({ nullable: false })
  @Column({ comment: '서비스 상세 정보', type: 'json' })
  item: ResPublicSvcDetail;

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
