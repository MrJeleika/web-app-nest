import { UpdateWeekLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateWeekLessonDto } from './dto/create-lesson.dto';
import { IException, ILesson } from './interface';

@Injectable()
export class WeekLessonsService {
  constructor(private dbservice: PrismaService){}

  async findAll(){
    return await this.dbservice.lessons.findMany()
  }
  
  async findWeekLessons(weekNum: number, dayNum: number){
   const res = await this.dbservice.schedule.findMany({
      where:{
        week: weekNum,
        day: dayNum
      },
      select:{
        day: true,
        week: true,
        lessons: {
          select:{
            id: true,
            time: true,
            type: true,
            group: true,
            teachers:{
              select:{
                name: true,
              }
            },
            links:{
              select:{
                link: true,
              }
            },
            lesson_names:{
              select:{
                name: true,
              }
            }
          }
        },

        
      }
    })
    
    
    const lessons: ILesson[] = []
    
    res.forEach((lesson) => {
        const {day, week, lessons:{id, group, type, time, lesson_names:{name: lessonName}, teachers:{name: teacher}}} = lesson
        let link: string = ''
        if(lesson.lessons.links) link = lesson.lessons.links.link
        lessons.push({day, week, id, group, type, time, lessonName, teacher, link})
      
    })

    
    return lessons || []
  //  const resMapped = res.map((lesson) => {
  //     if(lesson.lessons){
  //       const {day, week, lessons:{id, group, type, time, lesson_names:{name: lessonName}, teachers:{name: teacher}}} = lesson
  //       return {day, week, id, group, type, time, lessonName, teacher}
  //     }
  //     if(lesson.exceptions){
  //       const {day, week, exceptions:{id, group, type, time, date, lesson_names:{name: lessonName}, teachers:{name: teacher}}} = lesson
  //       return {day, week, id, group, type, time, lessonName, teacher, date}
  //     }
  //   })
  //   return resMapped
  }

  async createWeekLesson(data: CreateWeekLessonDto, day:number, week: number){
    const lesson = await this.dbservice.lessons.create({data})
    return await this.dbservice.schedule.create({data:{lesson_id: lesson.id, day, week}})
  }

  async updateWeekLesson(data: UpdateWeekLessonDto){
    const {lesson_id, link_id, ...body} = data
    return await this.dbservice.lessons.update({where:{id: lesson_id}, data:{
      // Remove link if no link provided
      link_id: link_id ? link_id : null,
      ...body
    }})
  }

  async deleteWeekLesson(lesson_id: string){
    const {id} = await this.dbservice.schedule.findFirst({where: {lesson_id}})
    await this.dbservice.schedule.delete({where:{id}})
    return await this.dbservice.lessons.delete({where:{id: lesson_id}})
  }
}

