# Red Ride 3 API

## Prequisites
All of these were noted from my machine at the time and may not be the lower limits of dependencies' versions
- Node >= 12 (with npm and npx)
- Docker >= 19.03.1
- Docker Compose >= 1.24.1
- AWS CLI

- ESLint. Install dbaeumer.vscode-eslint AND esbenp.prettier-vscode extensions to vscode

## Quick Start
- Run `yarn` to install dependencies
- Run `yarn start-db` to the postgres db container
- Go to the `knex` directory and run `knex migrate:latest` to run db migrations.
- From the `knex` directory run `knex seed:run` to run seeds for basic data.
- Run `yarn start` to start the api. This will also compile typescript into javascript and watch for any changes. 

## Linting 
- Uses the .eslintrc.js file at the root of the project to configure different rules for the project. 
- Install dbaeumer.vscode-eslint AND esbenp.prettier-vscode extensions to vscode

## Testing
- See [Jokes](#jokes) section
- The `test` directory contains helper factory functions to create objects. A lowercase `car` returns an object, while uppercase `Car` inserts a `car` object into the database and returns an Objection Model. All factories are patterned after this.

## Knex | Objection
- This project makes use of Knex and Objection for it's relation db needs. Objection is built on top of Knex. We utilize Knex for migrations and db connections and then Objection for Object modeling.

### Notes
- The entry point file is at `server/bin/www`, which bootstraps the server and starts listening. 

### Adding a Route / Controller
- Take a look at `test.route.ts` and `test.controller.ts` for examples.
- Make sure to export any new routers in `routes/index.ts`

### Docker containers
- This project uses docker-compose to orchestrate the postgres containers (development)
- In the production environment, the postgres container is replaced by usage of postgres as a service- as it's bad practice to host the database on the same machine as the server (risk of data corruption)

## Jokes
- What did Neil Armstrong say when no one laughed at his moon jokes?  
“I guess you had to be there.”  
- Testing


TODO: Add validations for models
TODO: Implement Auth/Login
TODO: Add logic for reservation system
TODO: Make Postman Documentation Examples
TODO: Basic testing implemented