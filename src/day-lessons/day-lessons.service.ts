import { UpdateDayLessonDto } from './dto/update-lesson.dto';
import { DeleteDayLessonDto } from './dto/delete-lesson.dto';
import { CreateDayLessonDto } from './dto/create-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IException, ILesson } from './interface';
import { formatDate } from 'src/utils';

@Injectable()
export class DayLessonsService {
  constructor(private dbservice: PrismaService){}

  async findDayLesson(queryDate: string){
    
    const date = new Date(queryDate).addHours(3)
    console.log(date);
    
    const day = date.getWeekDay()
    const week = date.getWeek()
    
    
    const res = await this.dbservice.schedule.findMany({
      where:{
        day,
        week
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
            links:{
              select:{
                link: true,
              }
            },
            teachers:{
              select:{
                name: true,
              }
            },
            lesson_names:{
              select:{
                name: true,
              }
            }
          }
        },
        exceptions: {
          select:{
            id: true,
            time: true,
            type: true,
            group: true,
            date: true,
            ref: true,
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
        }
      }
    })

    const lessons: ILesson[] = []
    const exceptions: IException[] = []
    console.log(res);
    
    res.forEach((lesson) => {
      if(lesson.lessons){
        const {day, week, lessons:{id, group, type, time, lesson_names:{name: lessonName}, teachers:{name: teacher}}} = lesson
        // Check if link exists
        let link:string = ''
        if(lesson.lessons.links) link = lesson.lessons.links.link
        lessons.push({day, week, id, group, type, time, lessonName, teacher, link})
      }
      if(lesson.exceptions){
        const {day, week, exceptions:{id, group, ref, type, time, date, lesson_names:{name: lessonName}, teachers:{name: teacher}}} = lesson
        // Check if link exists
        let link:string = ''
        if(lesson.exceptions.links)  link = lesson.exceptions.links.link
        exceptions.push({day, week, id, group, type, time, lessonName, teacher, date, ref, link})
      }
    })
    console.log(lessons);
    console.log(formatDate(exceptions[0].date));
    console.log(formatDate(date));
    console.log(formatDate(exceptions[0].date) === formatDate(date));
    
    let dayLessons = lessons.map((lesson)=> {

      // find the exception in schedule
      let dayException = exceptions.find((exception) => (lesson.time === exception.time || lesson.id === exception.ref) && formatDate(exception.date) === formatDate(date))      
      // if exception exists, return it
      return dayException ? dayException : lesson
    }).filter((lesson) => {
      if(!lesson.date) return lesson
      if(lesson.date === formatDate(date)) return lesson
      if(lesson.time) return lesson
      return null
    })

    dayLessons = [...dayLessons, ...exceptions.filter(exception => !dayLessons.includes(exception) && formatDate(exception.date) === formatDate(date))]
    
    return {lessons, dayLessons}
  }

  async createDayLesson(data: CreateDayLessonDto, week: number, day: number){

    
    const { id } = await this.dbservice.exceptions.create({
      data
    })
    return await this.dbservice.schedule.create({
      data:{
        week,
        day,
        exception_id: id
      }
    })
  }

  async deleteDayLesson(data: DeleteDayLessonDto){ 
    const {day, week} = await this.dbservice.schedule.findFirst({
      where:{
        lesson_id: data.lesson_id
      }
    }) 
    const {lesson_name_id, teacher_id, type, group, link_id} = await this.dbservice.lessons.findFirst({
      where:{
        id: data.lesson_id
      }
    })
    const res = await this.dbservice.exceptions.create({
      data:{
        lesson_name_id, teacher_id, type, link_id, date: data.date, group, time: '', ref: data.lesson_id
      }, select: {
        id: true
      }
    })

    
    return this.dbservice.schedule.create({
      data:{
        exception_id: res.id,
        week,
        day
      }
    })
  }

  async updateDayLesson(data:UpdateDayLessonDto, week: number, day: number ){
    
    const {lesson_id, link_id, ...body } = data

    const { id } = await this.dbservice.exceptions.create({
      data: {
        // Remove link if no link provided
        link_id: link_id ? link_id : null,
        ...body,
        ref: lesson_id
      }
    })
    return await this.dbservice.schedule.create({
      data:{
        exception_id: id,
        week,
        day
      }
    })
  }
  
}

