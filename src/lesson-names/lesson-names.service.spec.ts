import { Test, TestingModule } from '@nestjs/testing';
import { LessonNamesService } from './lesson-names.service';

describe('LessonNamesService', () => {
  let service: LessonNamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonNamesService],
    }).compile();

    service = module.get<LessonNamesService>(LessonNamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
