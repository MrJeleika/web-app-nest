export interface ILesson {
  day: number;
  week: number;
  id: string;
  group: number;
  type: string;
  time: string;
  lessonName: string
  teacher: string;
  date?: string
  ref?: string;
  link: string;
}
export interface IException {
  day: number;
  week: number;
  id: string;
  group: number;
  type: string;
  time: string;
  lessonName: string
  teacher: string;
  date: string
  link: string;
  ref: string;
}
