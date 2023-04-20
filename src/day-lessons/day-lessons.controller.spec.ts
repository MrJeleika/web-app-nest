import { Test, TestingModule } from '@nestjs/testing';
import { DayLessonsController } from './day-lessons.controller';

describe('DayLessonsController', () => {
  let controller: DayLessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayLessonsController],
    }).compile();

    controller = module.get<DayLessonsController>(DayLessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

