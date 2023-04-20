import { UpdateExceptionDto } from './dto/update-exception.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionsService {
  constructor(private dbservice: PrismaService){}


  async deleteException(lesson_id: string){

    const { id } = await this.dbservice.schedule.findFirst({
      where:{
        exception_id: lesson_id
      }
    })

    await this.dbservice.schedule.delete({
      where:{ id }
    })
    return await this.dbservice.exceptions.delete({
      where:{
        id: lesson_id
      }
    })
  }

  async updateException(data: UpdateExceptionDto, lesson_id: string) {
    const {link_id, ...body} = data
    return this.dbservice.exceptions.update({
      data:{
        // Remove link if no link provided
        link_id: link_id ? link_id : null,
        ...body,
      },
      where:{
        id: lesson_id
      }
    })
  }
}
