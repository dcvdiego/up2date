import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tutorials' })
@ObjectType()
export class Tutorial {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  language: string;

  @Column()
  @Field()
  uploadDate: string;

  @Column()
  @Field()
  lastUpdated: string;

  @Column()
  @Field()
  thumbnailSrc: string;
}
