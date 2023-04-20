import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(private dbservise:PrismaService){}

  async findAll(){
    return await this.dbservise.links.findMany()
  }
  async deleteOne(id:string){
    return await this.dbservise.links.delete({where: {id}})
  }
  async createOne(data: CreateLinkDto){
    return await this.dbservise.links.create({data})
  }
}
