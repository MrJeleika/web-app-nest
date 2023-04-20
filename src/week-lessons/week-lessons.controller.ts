import { UpdateWeekLessonDto } from './dto/update-lesson.dto';
import { WeekLessonsService } from './week-lessons.service';
import { Controller, Param,Body, Post, Get, Delete, Patch } from '@nestjs/common';
import { CreateWeekLessonDto } from './dto/create-lesson.dto';

@Controller('week-lessons')
export class WeekLessonsController {
  constructor(private lessonsService:WeekLessonsService){}

  @Get('/:week/:day')
  async getWeekLessons(@Param('week') week: string, @Param('day') day: string,){
    return await this.lessonsService.findWeekLessons(+week, +day)
  }

  @Post('/:week/:day')
  async createWeekLesson(@Body() lesson: CreateWeekLessonDto, @Param('day') day: string, @Param('week') week: string){
    return await this.lessonsService.createWeekLesson(lesson, +day, +week)
  }

  @Delete('/:id')
  async deleteWeekLesson(@Param('id') id: string){
    return await this.lessonsService.deleteWeekLesson(id)
  }

  @Patch()
  async updateWeekLesson(@Body() lesson: UpdateWeekLessonDto){
    return await this.lessonsService.updateWeekLesson(lesson)
  }
}
