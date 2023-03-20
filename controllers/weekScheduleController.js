import { connection } from '../db/connection.js'

export const addWeekLesson = (req, res) => {
  const { lesson_name_id, teacher_id, group, time, type, day, week } = req.body
  connection.query(
    'INSERT INTO lessons (lesson_name_id, teacher_id, `group`, time, type) values ' +
      `(${lesson_name_id}, ${teacher_id}, ${group}, "${time}" , "${type}")`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      connection.query(
        `INSERT INTO schedule (lesson_id, day, week) values (${result.insertId}, ${day}, ${week})`,
        (err, result, fields) => {
          if (err) res.status(403).json(err)
          res.status(200).json(result)
        }
      )
    }
  )
}

export const deleteWeekLesson = (req, res) => {
  connection.query(
    `DELETE FROM schedule WHERE lesson_id = ${+req.query.lesson_id}`,
    (err, result) => {
      if (err) res.status(403).json(err)
    }
  )
  connection.query(
    `DELETE FROM lessons WHERE id = ${+req.query.lesson_id}`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      res.status(200).json(result)
    }
  )
}

export const updateWeekLesson = (req, res) => {
  const { lesson_id, lesson_name_id, teacher_id, group, time, type } = req.body
  connection.query(
    `UPDATE lessons SET ` +
      '`group`' +
      ` = ${group}, lesson_name_id = ${lesson_name_id}, teacher_id = ${teacher_id}, time = '${time}', type = '${type}' where id = ${lesson_id}`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      res.status(200).json(result)
    }
  )
}

export const getWeekSchedule = (req, res) => {
  connection.query(
    `SELECT l.id, s.day, s.week, n.name, l.time, l.group, l.type FROM schedule s
    join lessons l on l.id = s.lesson_id
    join teachers t on t.id = l.teacher_id
    join lesson_names n on n.id = l.lesson_name_id
    WHERE week = ${+req.query.week} and day = ${+req.query.day}`,
    (err, lessons) => {
      if (err) res.status(404).json(err)
      connection.query(
        `SELECT e.id, s.day, s.week, n.name, e.time, e.group, e.type, e.date FROM schedule s
        join exceptions e on e.id = s.exception_id
        join teachers t on t.id = e.teacher_id
        join lesson_names n on n.id = e.lesson_name_id
        WHERE week = ${+req.query.week}`,
        (err, exceptions) => {
          if (err) res.status(404).json(err)
          res.status(200).json({
            lessons,
            exceptions,
          })
        }
      )
    }
  )
}
