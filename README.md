# The last of us API

## Description
The last of us API is a GraphQL API based on the game and television show 'the last of us'

## Running the app

### Docker
This project has docker support, and thus provides a development environment in docker.
In total there are two docker services in the `docker-compose.yaml`:
- **node-sidecar**: runs as root, responsible for installing node_modules and giving them the right permissions
- **node**: the actual dev container which runs the API

If you want to start up the docker containers, run following command: <br>
`docker-compose up -d`

On the first run, the node container will probably fail, as there were no `node_modules` yet. 
But because the sidecar created them, running the `docker-compose up -d` again will fix the issue.

Now, the api will be available on your localhost port 3000, as it's mapped in the `docker-compose.yaml`.

## Support

The last of us API is an MIT-licensed open source project.

## Stay in touch

- LinkedIn - [LinkedIn](https://www.linkedin.com/in/jefvda/)

## License

Nest is [MIT licensed](LICENSE).
