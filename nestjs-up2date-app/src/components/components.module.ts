import { Module } from '@nestjs/common';
import { TutorialsModule } from './tutorials/tutorials.module';

@Module({
  imports: [TutorialsModule],
})
export class ComponentsModule {}
