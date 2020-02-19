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

## Jokes
- What did Neil Armstrong say when no one laughed at his moon jokes?  
“I guess you had to be there.”  
- Testing



<!-- TODO: add Lead, EventUser models to Multi-tenant, and then TenantUsers to Global db -->