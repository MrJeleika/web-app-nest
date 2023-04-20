import { CreateLessonNameDto } from './dto/create-lesson-name.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LessonNamesService {
  constructor(private dbservice: PrismaService){

  }

  async findAll(){
    return await this.dbservice.lesson_names.findMany();
  }
  async findOneById(id: string){
    return await this.dbservice.lesson_names.findFirst({where: {id: id}});
  }
  async createOne(data: CreateLessonNameDto){
    return await this.dbservice.lesson_names.create({data});
  }
  async deleteOne(id: string){
    console.log(id);
    
    // Delete all lessons that have this lesson name
    const lessons = await this.dbservice.lessons.findMany({
      where:{
        lesson_name_id: id,
      }
    })
    await lessons.forEach(async(lesson) =>  {
      const {id} = await this.dbservice.schedule.findFirst({
        where:{
          lesson_id: lesson.id,
        }
      })
      await this.dbservice.schedule.delete({
        where:{
          id
        }
      })
    })
    await this.dbservice.lessons.deleteMany({
      where: {
        lesson_name_id: id
      }
    })

    // Delete all exceptions that have this lesson name
    const exceptions = await this.dbservice.exceptions.findMany({
      where:{
        lesson_name_id: id,
      }
    })
    await exceptions.forEach(async(exception) =>  {
      const {id} = await this.dbservice.schedule.findFirst({
        where:{
          exception_id: exception.id,
        }
      })
      await this.dbservice.schedule.delete({
        where:{
          id
        }
      })
    })
    await this.dbservice.exceptions.deleteMany({
      where: {
        lesson_name_id: id
      }
    })

    return await this.dbservice.lesson_names.delete({where: {id: id}});
  }
}
