
// // Setting up the database connection
import { Model } from 'objection'
import Knex = require('knex')

export const initConnection = (): void=>{
  const config : Knex.Config = {
    client: 'postgres',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      charset  : 'utf8'
    }
  }  
  const knex : Knex = Knex(config)
  Model.knex(knex)
}



// export const bookshelf = /require('bookshelf')(knex)

// export default class Database {

//   private static _instance : Database = new Database()

//   protected _knex:any = null

//   protected _bookshelf : any = null

//   constructor() {
//     if(Database._instance){
//       throw new Error("Error: Instantiation failed: Use Database.getInstance() instead of new.")
//     }

//     //@todo pull config info from knexfile.js!!
//     this._knex = knex({
//       client: 'pg',
//       connection: 
//     })

//     this._bookshelf = bookshelf(this._knex)
//     // this._bookshelf.model('Test', {
//     //   tableName: 'tests'
//     // })
//     Database._instance = this
//   }

//   public static getInstance():Database {
//     return Database._instance
//   }

//   public getKnex(): any {
//     return this._knex
//   }

//   public getBookshelf(): Bookshelf {
//     return this._bookshelf
//   }
// }