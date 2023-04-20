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
    return await this.dbservice.teachers.delete({where: {id: id}});
  }
  async update(id: string){
  }
}