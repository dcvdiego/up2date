import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTutorialInput {
  @Field()
  name: string;

  @Field()
  language: string;

  @Field()
  uploadDate: string;

  @Field()
  lastUpdated: string;

  @Field()
  thumbnailSrc: string;
}
//you can add decorators using class validator and class transformer to make sure they only input dates or something
