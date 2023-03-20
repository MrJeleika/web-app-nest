import { connection } from '../db/connection.js'

export const getTeachers = (req, res) => {
  connection.query(`SELECT * FROM teachers`, (err, result, fields) => {
    if (err) res.status(403).json(err)
    res.status(200).json(result)
  })
}

export const addTeacher = (req, res) => {
  connection.query(
    `INSERT INTO teachers (name) values ("${req.body.name}")`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      res.status(200).json(result)
    }
  )
}

export const deleteTeacher = (req, res) => {
  connection.query(
    `DELETE FROM teachers WHERE id = ${+req.query.id}`,
    (err, result, fields) => {
      if (err) res.status(403).json(err)
      res.status(200).json(result)
    }
  )
}
