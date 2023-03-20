import { connection } from '../db/connection.js'

export const deleteException = (req, res) => {
  connection.query(
    `DELETE FROM schedule WHERE exception_id = ${+req.query.lesson_id}`,
    (err, result) => {
      if (err) res.status(403).json(err)
    }
  )
  connection.query(
    `DELETE FROM exceptions WHERE id = ${+req.query.lesson_id}`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      res.status(200).json(result)
    }
  )
}

export const updateException = (req, res) => {
  const { lesson_name_id, teacher_id, group, time, type, date } = req.body
  connection.query(
    `UPDATE lessons SET ` +
      '`group`' +
      ` = ${group}, lesson_name_id = ${lesson_name_id}, teacher_id = ${teacher_id}, time = '${time}', type = '${type}', date = '${date}' where id = ${lesson_id}`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)

      res.status(200).json(result)
    }
  )
}
