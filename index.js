import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

import * as lessonNamesController from './controllers/lessonNamesController.js'
import * as teachersController from './controllers/teachersController.js'
import * as weekScheduleController from './controllers/weekScheduleController.js'
import * as dayScheduleController from './controllers/dayScheduleController.js'
import * as exceptionsController from './controllers/exceptionsController.js'
import { handleDisconnect } from './db/connection.js'

// Reconnect on disconnect
handleDisconnect()

app.get('/teachers', teachersController.getTeachers)
app.post('/teacher', teachersController.addTeacher)
app.delete('/teacher', teachersController.deleteTeacher)

app.get('/lessonNames', lessonNamesController.getAllLessonNames)
app.post('/lessonName', lessonNamesController.addLessonName)
app.delete('/lessonName', lessonNamesController.deleteLessonName)

app.get('/weekLessons', weekScheduleController.getWeekSchedule)
app.post('/weekLesson', weekScheduleController.addWeekLesson)
app.delete('/weekLesson', weekScheduleController.deleteWeekLesson)
app.patch('/weekLesson', weekScheduleController.updateWeekLesson)

app.get('/dayLessons', dayScheduleController.getDaySchedule)
app.post('/dayLesson', dayScheduleController.addDayLesson)
app.patch('/dayLesson', dayScheduleController.updateDayLesson)
app.delete('/dayLesson', dayScheduleController.deleteDayLesson)

app.delete('/exception', exceptionsController.deleteException)
app.patch('/exception', exceptionsController.updateException)

app.listen(process.env.PORT || 3001, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server started')
})
