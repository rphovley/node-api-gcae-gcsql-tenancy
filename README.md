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
- Run `yarn start` to start the api. This will also compile typescript into javascript and watch for any changes. 

## Linting 

## Testing
- See`Jokes` section

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