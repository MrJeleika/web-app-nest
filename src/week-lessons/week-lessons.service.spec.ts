import { WeekLessonsService } from './week-lessons.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('LessonsService', () => {
  let service: WeekLessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeekLessonsService],
    }).compile();

    service = module.get<WeekLessonsService>(WeekLessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
