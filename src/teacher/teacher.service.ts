import { CreateTeacherDto } from './dto/create-teacher.dto';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private dbservice: PrismaService){

  }

  async findAll(){
    return await this.dbservice.teachers.findMany();
  }
  async findOneById(id: string){
    return await this.dbservice.teachers.findFirst({where: {id: id}});
  }
  async createOne(data: CreateTeacherDto){
    return await this.dbservice.teachers.create({data});
  }
  async deleteOne(id: string){
    
    // Delete all lessons that have this teacher
    const lessons = await this.dbservice.lessons.findMany({
      where:{
        teacher_id: id,
      }
    })
    lessons.forEach(async(lesson) =>  {
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
        teacher_id: id
      }
    })

    // Delete all exceptions that have this teacher
    const exceptions = await this.dbservice.exceptions.findMany({
      where:{
        teacher_id: id,
      }
    })
    exceptions.forEach(async(exception) =>  {
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
        teacher_id: id
      }
    })

    return await this.dbservice.teachers.delete({where: {id: id}});
  }
  async update(id: string){
  }
}