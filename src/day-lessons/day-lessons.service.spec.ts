import { Test, TestingModule } from '@nestjs/testing';
import { DayLessonsService } from './day-lessons.service';

describe('DayLessonsService', () => {
  let service: DayLessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayLessonsService],
    }).compile();

    service = module.get<DayLessonsService>(DayLessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
