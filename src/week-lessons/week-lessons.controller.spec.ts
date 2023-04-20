import { Test, TestingModule } from '@nestjs/testing';
import { WeekLessonsController } from './week-lessons.controller';

describe('LessonsController', () => {
  let controller: WeekLessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeekLessonsController],
    }).compile();

    controller = module.get<WeekLessonsController>(WeekLessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
