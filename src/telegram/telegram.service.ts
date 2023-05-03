import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { DayLessonsService } from 'src/day-lessons/day-lessons.service';
import * as moment from 'moment';
import { ILesson } from 'src/week-lessons/interface';
import { daysOfWeek, formatDate } from 'src/utils';
const TGB = require('node-telegram-bot-api');

const token = process.env.TOKEN

@Injectable()
export class TelegramService {
  private readonly bot: TelegramBot
  private chatId: number

  constructor(private dayLessonsService: DayLessonsService) {
    this.bot = new TGB(token, { polling: true });
    moment.locale('uk')
    this.bot.onText(/^\/schedule$/, async (msg) => {
      this.chatId = msg.chat.id;
      const { dayLessons } = await this.dayLessonsService.findDayLesson(formatDate(new Date(new Date().setHours(0, 0, 0, 0))))

      this.sendSchedule(dayLessons)
    })
    this.bot.onText(/^\/start$/, async (msg) => {
      this.chatId = msg.chat.id;
      this.sendStartInfo()
      setInterval(() => this.sendScheduleOnTime(), 60 * 1000)
    })
  }

  async sendScheduleOnTime () {
    const sendTime: string = '4:30'
    const { dayLessons } = await this.dayLessonsService.findDayLesson(formatDate(new Date(new Date().setHours(0, 0, 0, 0))))
    if (moment().format('LT') === sendTime) {
      this.sendSchedule(dayLessons)
    }
  }

  sendSchedule(dayLessons: ILesson[]) {
    let firstGroupMessage: string = ''
    let secondGroupMessage: string = ''

    const makeStringMessage = (group: number, dayLesson: ILesson) => {
      let scheduleString: string = ''
      if (dayLesson.group === group && dayLesson.time) {

        scheduleString += dayLesson.time + ' - '
        scheduleString += `${moment(dayLesson.time, 'HH:mm').add(95, 'minutes').hours()}:${moment(dayLesson.time, 'HH:mm').add(95, 'minutes').minutes()} | `
        scheduleString += dayLesson.lessonName + ' | '
        scheduleString += dayLesson.type + ' | '
        if (dayLesson.link) {
          scheduleString += dayLesson.teacher + ' | '
          scheduleString += '<a href="' + dayLesson.link + '">Посилання</a>' + '\n'
        } else {
          scheduleString += dayLesson.teacher + '\n'
        }
      }
      return scheduleString
    }

    // Making a string message
    dayLessons.sort((a, b) => a.time > b.time ? 1 : -1).forEach(dayLesson => {
      firstGroupMessage += makeStringMessage(1, dayLesson)
      secondGroupMessage += makeStringMessage(2, dayLesson)
    })
    if(!firstGroupMessage) firstGroupMessage = 'Пар немає'
    if(!secondGroupMessage) secondGroupMessage = 'Пар немає'
    this.bot.sendMessage(this.chatId, '<b>Пари на ' + moment().format('L') + ` ${daysOfWeek[new Date(new Date().setHours(0, 0, 0, 0)).getWeekDay() - 1]} ${new Date(new Date().setHours(0, 0, 0, 0)).getWeek()}:</b>\n\n`
      + `<b>Перша підгрупа:</b>\n` + firstGroupMessage + '\n'
        + `<b>Друга підгрупа:</b>\n` + secondGroupMessage + '\n',
      { parse_mode: "HTML", disable_web_page_preview: true });
  }
  sendStartInfo(){
    this.bot.sendMessage(this.chatId, 'Привіт 👀\n\n'+
    '📃Щоб отримати розклад на сьогодні - <b>/schedule</b>\n\n'+
    '🗓Змінити постійний розклад - змінити розклад на всі тижні\n\n'+
    '📅Змінити розклад на день - змінити розклад на певну дату\n\n'+
    '🔔Уроки - Додати назву уроку до списку\n\n'+
    '👨‍🏫Вчителі - Додати вчителя до списку\n\n'+
    '🔗Посилання - Додати посилання до списку\n\n'
    , { parse_mode: "HTML", disable_web_page_preview: true })
  }
}

