import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewTutorialInput } from './dto/new-tutorial.input';
import { Tutorial } from './entities/tutorial';
import { TutorialsService } from './tutorials.service';

@Resolver()
export class TutorialResolver {
  constructor(private tutorialsService: TutorialsService) {}

  @Query((returns) => [Tutorial])
  public async tutorials(): Promise<Tutorial[]> {
    return await this.tutorialsService.getAllTutorials().catch((err) => {
      throw err;
    });
  }

  @Mutation((returns) => Tutorial)
  public async addNewTutorial(
    @Args('newTutorialData') newTutorialData: NewTutorialInput,
  ): Promise<Tutorial> {
    return await this.tutorialsService
      .addTutorial(newTutorialData)
      .catch((err) => {
        throw err;
      });
  }
}
