# FundZero DataLake API


## Prequisites
All of these were noted from my machine at the time and may not be the lower limits of dependencies' versions
- Node >= 8 (with npm and npx)
- Docker >= 19.03.1
- Docker Compose >= 1.24.1
- AWS CLI

- ESLint (optional)

## Image Repository Access
You will need access to our Google Cloud Registry

## Quick Start
- Run `yarn` to install dependencies
- Run `yarn start` to start containers with server listening on port 3030 (note: this runs `docker-compose up -d` in the background and then runs `docker-compose logs` so you will need to stop it gracefully with ...)
- ... `yarn stop` to cleanly shut down containers.

Note: the reason for not just running `docker-compose up` to view the logs is because of a known bug with docker-compose in that sometimes a `^C` or SIGINT to the process won't actually stop the containers. 

For ESLint to work properly in your editor, you may have to tell it to parse Typescript files. In VSCode, add the following line to the settings.json:
```json
"eslint.validate": ["typescript"]
```

## Other Scripts
- `yarn compile` : compiles .ts to .js. Lints in the process
- `yarn build-image` : builds docker image 
- `yarn deploy`: builds docker image and deploys to AWS. Tags image by current commit hash.
- `yarn lint`: lints src directory with gulp and eslint
- `yarn logs`: view logs of running dev containers

## Testing
Mocha JS
- Using Mocha JS for bare bones unit testing for now (model CRUD, endpoint responses)
- To run tests use

```bash
yarn test:setup # starts test containers
yarn test # run tests
yarn test:stop # stops test containers
```

## Development

### Notes
- You'll need to rebuild the docker image when modifying dependencies and possibly when making changes to root configuration files, including package.json. You may do so with `yarn build-image`
- The entry point file is at `server/bin/www`, which bootstraps the server and starts listening. 

### Adding a Route / Controller
- Take a look at `test.route.ts` and `test.controller.ts` for examples.
- Make sure to export any new routers in `routes/index.ts`

### Docker containers
- This project uses docker-compose to orchestrate the server and postgres containers (development)
- In the production environment, the postgres container is replaced by usage of postgres as a service- as it's bad practice to host the database on the same machine as the server (risk of data corruption)

