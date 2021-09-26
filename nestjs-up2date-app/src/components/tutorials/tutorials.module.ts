import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutorial } from './entities/tutorial';
import { TutorialResolver } from './tutorials.resolver';
import { TutorialsService } from './tutorials.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tutorial])],
  providers: [TutorialsService, TutorialResolver],
  exports: [TutorialsService],
})
export class TutorialsModule {}
