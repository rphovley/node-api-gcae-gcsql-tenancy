import admin from 'firebase-admin'

const env = process.env.NODE_ENV ? `${process.env.NODE_ENV}` : ''
require('dotenv').config({
  path: `${__dirname}/../../bin/.firebase.env${env}`,
})

const initializeFirebase = (): void => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serviceAccount: any = { // need any because typings for this are broken
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key.replace(/\\n/g, '\n'),
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  }

  if ((process.env.NODE_ENV || 'development') === 'development') { admin.database.enableLogging(true) }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
  })
  admin.auth()
}

export { initializeFirebase, admin }
