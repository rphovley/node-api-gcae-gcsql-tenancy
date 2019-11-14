// Setting up the database connection
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    charset  : 'utf8'
  }
})

export const bookshelf = require('bookshelf')(knex)