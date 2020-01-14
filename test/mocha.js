/* eslint-disable import/no-extraneous-dependencies */
import Mocha from 'mocha'

process.env.TS_NODE_PROJECT = './src/tsconfig.json'
require('ts-mocha')

const mocha = new Mocha()
mocha.addFile('./reservation.test.ts')
mocha.run((failures) => {
  process.on('exit', () => {
    process.exit(failures) // exit with non-zero status if there were failures
  })
})
