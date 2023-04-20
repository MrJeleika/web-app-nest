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
    return await this.dbservice.lesson_names.delete({where: {id: id}});
  }
}
