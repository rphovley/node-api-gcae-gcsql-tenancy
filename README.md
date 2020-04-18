# Red Panda Events API

## Prequisites

All of these were noted from my machine at the time and may not be the lower limits of dependencies' versions

- Node >= 12 (with npm and npx)
- Docker >= 19.03.1
- Docker Compose >= 1.24.1
- ESLint. Install dbaeumer.vscode-eslint AND esbenp.prettier-vscode extensions to vscode

## Quick Start

- Run `yarn` to install dependencies
- Run `yarn start-db` to the postgres db container
- Run `yarn migrate` to run migrations and seeds for the dataset.
- Run `yarn migrate-global`, `yarn seed-global`, `yarn migrate-tenant`, and `yarn seed-tenant` to run migrations or seeds independently
- Run `yarn start` to start the api. This will also compile typescript into javascript and watch for any changes.

## Linting

- Uses the .eslintrc.js file at the root of the project to configure different rules for the project.
- Install dbaeumer.vscode-eslint AND esbenp.prettier-vscode extensions to vscode

## Logger

- We are using `@google-cloud/logging-bunyan` for our logging. In order for it to send it to google cloud you'll need to setup google cloud on your machine. visit [google documentation](https://cloud.google.com/logging/docs/setup/nodejs) for details

## Testing

- See [Jokes](#jokes) section
- The `test` directory contains helper factory functions to create objects. A lowercase `car` returns an object, while uppercase `Car` inserts a `car` object into the database and returns an Objection Model. All factories are patterned after this.

## Knex | Objection

- This project makes use of Knex and Objection for its relational db needs. Objection is built on top of Knex. We utilize Knex for migrations and db connections and then Objection for Object modeling.
- Uses [JSONSchema](http://json-schema.org/) for validation
- To create a migration, go to to the `global` directory or the `multi-tenant` directory (depending on which db you want the migration for), and run the command `knex migrate:make {migration_name}`. This requires that you have installed the knex-cli to your machine

## Notes

- The entry point file is at `server/bin/www`, which bootstraps the server and starts listening.
- environment variables are located in `server/bin`

## Directory Structure

- `knex`: directory for seeds and migrations for our database
- `scripts`: various development scripts for the project. Could contain automations for starting, building, deployment, etc...
- `server`: the application lives here.
  - `bin`: entry point for the application and environment variables
  - `dist`: directory the typescript is transpiled into
  - `src`: typescript directory for the application. Only used in development. This directory is transpiled into the `dist` directory which is used to run the app in production
    - `controllers`: Houses logic for handling requests from the client
    - `middleware`: Custom Express middleware for our application
    - `models`: Objection models to model our database data with
    - `routes`: Routes for our api
    - `utils`: Other helpers for running our application
- `test`: where any tests will go. Also contains factories that are utilized also by the knex seed files

## Adding a Route / Controller

- Take a look at `app_user.route.ts` and `app_user.controller.ts` for examples.
- Make sure to export any new routes in `routes/index.ts`

## Docker containers

- This project uses docker-compose to orchestrate the postgres containers (development)
- In the production environment, the postgres container is replaced by usage of postgres as a service- as it's bad practice to host the database on the same machine as the server (risk of data corruption)

## CI/CD

- Uses gitlabs ci/cd with `.gitlab-ci.yml` file

  - Code
  - Environment variables: This project relies on Gitlab's [Environment Variables](https://gitlab.com/rphovley-templates/node-api-express-objection-postgres/-/settings/ci_cd) to store sensitive data.
    - Database: Relies on Google Cloud's SQL DaaS (for this project using Postgres)
    - Other service connections: This project uses Google Cloud's Logging services
  - Google Cloud
    - Project per environment (protects environments from accessing each other)

- Stages

  - Dependencies
  - Lint
  - Build
  - Test
  - Deploy
    - new code
    - any additional migrations
    - rollback

- Environments
  - development
  - staging
  - production

## CI/CD Implementation Quickstart

- Create a project per environment you will be using
- Create a postgres db per environment
- Obtain credentials required for accessing environment resources/services
  - https://cloud.google.com/sql/docs/postgres/connect-app-engine
    - [Enable SQL Admin API](https://console.cloud.google.com/flows/enableapi?apiid=sqladmin&redirect=https://console.cloud.google.com&_ga=2.176934949.1273786701.1586983355-851683026.1585882442&_gac=1.253357691.1585961713.CjwKCAjwvZv0BRA8EiwAD9T2VauvWkIDPVhAtCgPVXn7z7lh_L8WbV33wg7Psd1xdjLYse-v--bmvRoC830QAvD_BwE)
    - [Enable App Engine API](https://console.developers.google.com/apis/api/appengine.googleapis.com/overview?project=1082351058220)
    - Give Google App Engine Service Account Access to Google Cloud SQL for the project [IAM](https://console.cloud.google.com/iam-admin) (maybe?)
    -
- Put those credentials into gitlab environment variables
  - the app.yaml template requires any variables that are used there to be prefeixed by `APP_`
- Deployment

  - Requires a "deploy" server and not a gitlab shared runner. The reason for this is the deployment script runs migrations against the Google Cloud Databases. Connections to those databases require that they come from a known location. Shared runners don't work for this situation.

    - Gitlab Runner Installation/Registration
      - Install Gitlab Runner: [Install Instructions](https://docs.gitlab.com/runner/install/linux-manually.html)
      - Register Runner: [Register Instructions](https://docs.gitlab.com/runner/register/)
        - Note: Make sure to use `sudo` for the gitlab commands. Required on linux distributions.
      - Verify Runner: `sudo gitlab-runner verify`
        - This is required to connect the runner to gitlab for jobs. Isn't in the registration or install instructions
    - Git access for deploy server (to pull project)
      - On the machine run: `sudo ssh-keygen -t ed25519 -C "deployer server"`
      - Take the public key generated from that command and go to `Settings` -> `CI/CD` -> `Deploy Keys` and add that public key.
      - On CentOS Servers, [update git](https://medium.com/better-programming/install-git-v2-on-centos-7-49448deede19) to version 2 (gitlab uses commands version 1 does not include)
    - Install node / yarn on deploy server (be sure to install from root): [CentOS Installation Instructions](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server)
    - Google Cloud SDK Installation
      - CentOS installation: [Install Instructions](https://cloud.google.com/sdk/docs/downloads-yum)
      - Create IAM service account user for deploy server: [IAM](https://console.cloud.google.com/iam-admin/serviceaccounts)
        - Give service account `App Engine Deployer` permissions and `Cloud SQL Editor` permissions
        - Create and Download the service key
        - Add the key as an environment variable in Gitlab (in our case SERVICE_ACCOUNT)
    - Create Cloud SQL Database [Cloud SQL](https://console.cloud.google.com/sql)
      - Create a user account and password
      - Save the user account and password in the environment variables for gitlab
    - Environment Variables
      - SERVICE_ACCOUNT (download from iam service account)
      - PROJECT_ID (Google Cloud Project ID)
      - Firebase
        - FIREBASE_PROJECT_ID
        - FIREBASE_PRIVATE_KEY
        - FIREBASE_CLIENT_EMAIL
      - Database
        - APP_DB_HOST
        - APP_DB_PASSWORD
        - APP_DB_USER
        - APP_DB_NAME
        - APP_DB_PORT

  - Dockerfile
    - Base image google cloud
    - install node/yarn

## Jokes

- What did Neil Armstrong say when no one laughed at his moon jokes?  
  “I guess you had to be there.”
- Testing
