/* eslint-disable import/no-extraneous-dependencies */
import { initializeFirebase, admin } from '../server/src/utils/firebase_config'
import { getConfigs } from '../server/src/utils/tenant_db_config'

import Knex = require('knex')

initializeFirebase()
const getFirebaseToken = async (): Promise<void> => {
  const dbConfig = (await getConfigs()).entries().next().value[1] // use the first tenant db by default
  const knexInstance = Knex(dbConfig)
  const user = (await knexInstance.select('firebase_uid').from('app_user'))[0] // use the first user by default
  await knexInstance.destroy()
  console.log(`Generating token for user with uid: ${user.firebase_uid}`)
  admin.auth().createCustomToken(user.firebase_uid)
    .then((customToken) => {
      // Send token back to client
      return getIdTokenFromCustomToken(customToken)
    }).then((idToken) => {
      console.log(idToken)
    })
    .catch((error) => {
      console.log('Error creating custom token:', error)
    })
}
getFirebaseToken()

import rp = require('request-promise')

// 'customToken' comes from FirebaseAdmin.auth().createCustomToken(uid)
function getIdTokenFromCustomToken(customToken) {
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.web_api_key}`
  const data = {
    token: customToken,
    returnSecureToken: true,
  }

  const options = {
    method: 'POST',
    uri: url,
    body: data,
    json: true, // Automatically stringifies the body to JSON
  }

  return rp(options)
  // idToken is the firebase id token that can be used with verifyIdToken
    .then(parsedBody => parsedBody.idToken)
}
