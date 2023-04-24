import { UpdateDayLessonDto } from './dto/update-lesson.dto';
import { DeleteDayLessonDto } from './dto/delete-lesson.dto';
import { CreateDayLessonDto } from './dto/create-lesson.dto';

import { DayLessonsService } from './day-lessons.service';
import { Body, Controller, Delete, Get, Header, Param, Patch, Post } from '@nestjs/common';

@Controller('day-lessons')
export class DayLessonsController {
  constructor(private lessonsService: DayLessonsService){}

  @Get('/:date')
  @Header('Access-Control-Allow-Origin', '*')
  async getDayLesson(@Param('date') date: string){
    return await this.lessonsService.findDayLesson(date)
  }

  @Post('/:week/:day')
  async createDayLesson(@Body() lesson: CreateDayLessonDto, @Param('week') week: string, @Param('day') day: string){
    return await this.lessonsService.createDayLesson(lesson, +week, +day)
  }

  @Delete()
  async deleteDayLesson(@Body() lesson: DeleteDayLessonDto){
    return await this.lessonsService.deleteDayLesson(lesson)
  }

  @Patch('/:week/:day')
  async updateDayLesson(@Body() lesson: UpdateDayLessonDto, @Param('week') week: string, @Param('day') day: string){
    return await this.lessonsService.updateDayLesson(lesson, +week, +day)
  }
}
