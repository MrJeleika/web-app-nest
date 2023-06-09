import moment from "moment"

declare global {
  interface Date {
    getWeekDay(): number
    getWeek(): number
    timeNow(): string
    addHours(h: number): any
  }
}


// format date to remove timezone 
export const formatDate = (date: Date | string): string => {

  let index = String(date).indexOf(' G')
  if (String(date).includes(' G')) return String(date).substring(0, index)
  return String(date)
}

Date.prototype.getWeekDay = function () {
  return (this.getDay() === 0 ? 6 : this.getDay() - 1) + 1
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

Date.prototype.getWeek = function (): number {
  const onejan: any = new Date(this.getFullYear(), 0, 1)
  const today: any = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate()
  )
  const dayOfYear = (today - onejan + 86400000) / 86400000
  // Week from start of the year
  const lessonsStartWeek = 5
  if ((Math.ceil(dayOfYear / 7) - lessonsStartWeek) % 2 === 0) {
    return 1
  }
  return 2
}
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
}




export const daysOfWeek = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П`ятниця',
  'Субота',
  'Неділя',
]