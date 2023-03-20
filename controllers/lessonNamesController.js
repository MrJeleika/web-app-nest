import { connection } from '../db/connection.js'

export const getAllLessonNames = async (req, res) => {
  connection.query(`SELECT * FROM lesson_names`, (err, result, fields) => {
    if (err) res.status(403).json(err)
    res.status(200).json(result)
  })
}

export const addLessonName = async (req, res) => {
  connection.query(
    `INSERT INTO lesson_names (name) values ("${req.body.name}")`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      res.status(200).json(result)
    }
  )
}

export const deleteLessonName = async (req, res) => {
  connection.query(
    `DELETE FROM lesson_names WHERE id = ${+req.query.id}`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      res.status(200).json(result)
    }
  )
}
