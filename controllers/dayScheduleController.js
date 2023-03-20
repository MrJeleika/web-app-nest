import { connection } from '../db/connection.js'

export const addDayLesson = (req, res) => {
  const { lesson_name_id, teacher_id, group, time, type, day, week, date } =
    req.body
  connection.query(
    'INSERT INTO exceptions (lesson_name_id, teacher_id, `group`, time, type, `date`) values ' +
      `(${lesson_name_id}, ${teacher_id}, ${group}, "${time}" , "${type}", "${date}")`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      connection.query(
        `INSERT INTO schedule (exception_id, day, week) values (${result.insertId}, ${day}, ${week})`,
        (err, result, fields) => {
          if (err) res.status(403).json(err)
          res.status(200).json(result)
        }
      )
    }
  )
}

export const deleteDayLesson = (req, res) => {
  const { lesson_id, date } = req.body

  connection.query(
    `SELECT * FROM schedule WHERE lesson_id = ${lesson_id}`,
    (err, result) => {
      if (err) res.status(403).json(err)
      let day = result[0].day
      let week = result[0].week
      // Select to get week and day of lesson

      connection.query(
        `SELECT * FROM lessons WHERE id = ${lesson_id}`,
        (err, result) => {
          const { lesson_name_id, teacher_id, group, type } = result[0]
          // Select to get lesson info

          if (err) res.status(403).json(err)
          connection.query(
            'INSERT INTO exceptions (lesson_name_id, teacher_id, `group`, `date`, `type`) VALUES' +
              `(${lesson_name_id}, ${teacher_id}, ${group}, '${date}', '${type}')`,
            // Insert into exceptions

            (err, result) => {
              if (err) res.status(403).json(err)
              connection.query(
                `INSERT INTO schedule (exception_id, day, week) VALUES (${result.insertId}, ${day}, ${week})`,
                (err, result) => {
                  if (err) res.status(403).json(err)
                  res.status(200).json(result)
                }
              )
            }
          )
        }
      )
    }
  )
}

export const updateDayLesson = (req, res) => {
  const { lesson_id, day, week, date } = req.body

  connection.query(
    `SELECT * FROM lessons WHERE id = ${lesson_id}`,
    (err, result) => {
      const { lesson_name_id, teacher_id, group, time, type } = result
      if (err) res.status(403).json(err)
      connection.query(
        'INSERT INTO exceptions (lesson_name_id, teacher_id, `group`, `time`, `date`, `type`) VALUES' +
          `(${lesson_name_id}, ${teacher_id}, ${group}, "${time}", "${date}" ,"${type}",`,
        (err, result) => {
          if (err) res.status(403).json(err)
          connection.query(
            `INSERT INTO schedule (exception_id, day, week) VALUES (${result.insertId}, ${day}, ${week})`,
            (err, result) => {
              if (err) res.status(403).json(err)
              res.status(200).json(result)
            }
          )
        }
      )
    }
  )
}

export const getDaySchedule = (req, res) => {
  connection.query(
    `SELECT l.id, s.day, s.week, n.name as lesson, t.name as teacher, l.time, l.group, l.type FROM schedule s
    join lessons l on l.id = s.lesson_id
    join teachers t on t.id = l.teacher_id
    join lesson_names n on n.id = l.lesson_name_id
    WHERE week = ${+req.query.week} and day = ${+req.query.day}`,
    (err, lessons) => {
      if (err) res.status(404).json(err)
      connection.query(
        `SELECT e.id, s.day, s.week,n.name as lesson, t.name as teacher, e.time, e.group, e.type, e.date FROM schedule s
        join exceptions e on e.id = s.exception_id
        join teachers t on t.id = e.teacher_id
        join lesson_names n on n.id = e.lesson_name_id
        WHERE week = ${+req.query.week} and day = ${+req.query.day}`,
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
