# The last of us API

## Description
The last of us API is a GraphQL API based on the game and television show 'the last of us'.

## Makefile
In the root of this project, there's a `makefile` which provides commonly used commands to make it easier to work on this project.
For a list of all commands run `make help`, or just `make`.

## Running the app

### Docker
This project has docker support, and thus provides a development environment in docker.
In total there are four docker services in the `docker-compose.yaml`:
- **node-sidecar**: runs as root, responsible for installing node_modules and giving them the right permissions
- **node-dev**: the actual dev container which runs the API
- **db**: a mysql database
- **adminer**: a tool to view / update the database (will be available at `localhost:8080`)

If you want to start up the docker containers, run following command: <br>
`docker-compose up -d` <br>
or <br>
`make start`

On the first run, the node container will probably fail, as there were no `node_modules` yet. 
But because the sidecar created them, starting the containers for a second time will fix the issue.

Now, the api will be available on your localhost port 3000, as it's mapped in the `docker-compose.yaml`.

## Project structure

To keep the README clean, the documentation about the project structure can be found [here]()

## Support

The last of us API is an MIT-licensed open source project.

## Stay in touch

- LinkedIn - [LinkedIn](https://www.linkedin.com/in/jefvda/)

## License

Nest is [MIT licensed](LICENSE).
