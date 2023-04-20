import { CreateLessonNameDto } from './dto/create-lesson-name.dto';
import { LessonNamesService } from './lesson-names.service';
import { Controller, Get, Param, Post,Body, Delete } from '@nestjs/common';

@Controller('lesson-names')
export class LessonNamesController {
  constructor(private lessonNamesService: LessonNamesService) {}

  @Get()
  async getLessonNames(){
   return await this.lessonNamesService.findAll();
  }

  @Get(':id')
  async getLessonNameById(@Param ('id') id: string){
    return await this.lessonNamesService.findOneById(id)
  }

  @Post()
  async addLessonName(@Body() body:CreateLessonNameDto){
    return await this.lessonNamesService.createOne(body)
  }

  @Delete(':id')
  async deleteLessonName(@Param ('id') id: string){
    return await this.lessonNamesService.deleteOne(id)
  }

}
