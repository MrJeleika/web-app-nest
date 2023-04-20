import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(private dbservice:PrismaService){}

  async findAll(){
    return await this.dbservice.links.findMany()
  }
  async deleteOne(id:string){
   // Delete all lessons that have this link
    const lessons = await this.dbservice.lessons.findMany({
      where:{
        link_id: id,
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
        link_id: id
      }
    })

    // Delete all exceptions that have this link
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
        link_id: id
      }
    })


    return await this.dbservice.links.delete({where: {id}})
  }
  async createOne(data: CreateLinkDto){
    return await this.dbservice.links.create({data})
  }
}
