import { Test, TestingModule } from '@nestjs/testing';
import { LessonNamesController } from './lesson-names.controller';

describe('LessonNamesController', () => {
  let controller: LessonNamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonNamesController],
    }).compile();

    controller = module.get<LessonNamesController>(LessonNamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
