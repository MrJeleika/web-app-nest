import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { Body, Controller, Get, Param,Post,Delete } from '@nestjs/common';

@Controller('teachers')
export class TeacherController {
  constructor(private teacherService:TeacherService){}

  @Get()
  async teachers(){
    return await this.teacherService.findAll()
  }

  @Get(':id')
  async teacher(@Param('id') id:string){
    return await this.teacherService.findOneById(id)
  }

  @Post()
  async addTeacher(@Body() body:CreateTeacherDto){
    return await this.teacherService.createOne(body)
  }
  
  @Delete(':id')
  async deleteTeacher(@Param('id') id:string){
    return await this.teacherService.deleteOne(id)
  }
}
