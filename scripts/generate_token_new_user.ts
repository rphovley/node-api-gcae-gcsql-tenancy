/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { initializeFirebase, admin } from '../server/src/utils/firebase_config'
import { getConfigs } from '../server/src/utils/tenant_db_config'

import faker = require('faker')
import rp = require('request-promise')
import Knex = require('knex')

initializeFirebase()
getFirebaseToken()

async function getFirebaseToken(): Promise<void> {
  const configs = getArrConfigs(await getConfigs())
  const { id, config } = configs[0] // use the first tenant db by default
  const knexInstance = Knex(config)
  const uid = faker.random.uuid()
  await knexInstance.destroy()
  console.log(`Generating token for user with uid: ${uid}`)
  console.log(`tenantId: ${id}`)
  admin.auth().createCustomToken(uid)
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


// 'customToken' comes from FirebaseAdmin.auth().createCustomToken(uid)
function getIdTokenFromCustomToken(customToken): Promise<string> {
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

function getArrConfigs(configs: Map<string, Knex.Config>): {id: string, config: Knex.Config}[] {
  const arr = []
  configs.forEach((config, key) => {
    arr.push({ id: key, config })
  })
  return arr
}
