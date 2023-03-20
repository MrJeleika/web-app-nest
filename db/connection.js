import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export const connection = mysql.createPool({
  connectionLimit: 100,
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: 'heroku_20d890f743d82c5',
})

export function handleDisconnect() {
  connection.getConnection(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000) // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
    console.log('Connected!')
  }) // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect() // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err // server variable configures this)
    }
  })
}
