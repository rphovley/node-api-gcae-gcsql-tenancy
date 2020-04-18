import * as dotenv from 'dotenv'

const env = process.env.NODE_ENV ? `${process.env.NODE_ENV}` : ''
if (env === '') {
  dotenv.config({
    path: `${__dirname}/../../bin/env/.firebase.env`,
  })
  dotenv.config({
    path: `${__dirname}/../../bin/env/.global.db.env`,
  })
  dotenv.config({
    path: `${__dirname}/../../bin/env/.log.env`,
  })
}
