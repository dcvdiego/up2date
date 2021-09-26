import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewTutorialInput } from './dto/new-tutorial.input';
import { Tutorial } from './entities/tutorial';

@Injectable()
export class TutorialsService {
  constructor(
    @InjectRepository(Tutorial)
    private tutorialRepository: Repository<Tutorial>,
  ) {}

  public async getAllTutorials(): Promise<Tutorial[]> {
    return await this.tutorialRepository.find({}).catch((err) => {
      throw new InternalServerErrorException();
    });
  }

  public async addTutorial(
    newTutorialData: NewTutorialInput,
  ): Promise<Tutorial> {
    const newTutorial = this.tutorialRepository.create(newTutorialData);
    await this.tutorialRepository.save(newTutorial).catch((err) => {
      new InternalServerErrorException();
    });
    return newTutorial;
  }
}
