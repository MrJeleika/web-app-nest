import { UpdateExceptionDto } from './dto/update-exception.dto';
import { ExceptionsService } from './exceptions.service';
import { Controller, Param,Delete, Patch, Body } from '@nestjs/common';

@Controller('exceptions')
export class ExceptionsController {
  constructor(private exceptionsService: ExceptionsService){}

  @Delete(':id')
  async deleteException(@Param('id') lesson_id:string){
    return await this.exceptionsService.deleteException(lesson_id)
  }

  @Patch(':id')
  async updateException(@Body() lesson: UpdateExceptionDto, @Param('id') lesson_id:string){
    return await this.exceptionsService.updateException(lesson, lesson_id)
  }
}

