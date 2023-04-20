
// import { PrismaService } from 'src/prisma/prisma.service';
// import { Injectable } from '@nestjs/common';
// import { CreateLessonDto } from './dto/create-lesson.dto';

// @Injectable()
// export class LessonsService {
//   constructor(private dbservice: PrismaService){}

//   async findAll(){
//     return await this.dbservice.lessons.findMany()
//   }
//   async findDayLesson(day: number, week: number){
//   return await this.dbservice.schedule.findMany({
//       where:{
//         day,
//         week
//       },
//       select:{
//         day: true,
//         week: true,
//         lessons: {
//           select:{
//             id: true,
//             time: true,
//             type: true,
//             group: true,
//             teachers:{
//               select:{
//                 name: true,
//               }
//             },
//             lesson_names:{
//               select:{
//                 name: true,
//               }
//             }
//           }
//         },
//         exceptions: {
//           select:{
//             id: true,
//             time: true,
//             type: true,
//             group: true,
//             date: true,
//             teachers:{
//               select:{
//                 name: true,
//               }
//             },
//             lesson_names:{
//               select:{
//                 name: true,
//               }
//             }
//           }
//         }
//       }
//     })
  
//   }

//   async createLesson(data: CreateLessonDto, day:number, week: number){
//     const lesson = await this.dbservice.lessons.create({data})

//     return await this.dbservice.schedule.create({data:{lesson_id: lesson.id, day, week}})
//   }
  
//   async updateLesson(data: UpdateLessonDto){
    
//   }
// }
