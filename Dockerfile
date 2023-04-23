FROM node:18.15-alpine AS builder

WORKDIR /app

COPY ./package* .
CMD npm install

COPY . .

CMD npm run build

FROM node:18.15-alpine AS prod

USER node:node

COPY --from=builder --chown=node:node app/node_modules app/node_modules
COPY --from=builder --chown=node:node app/dist app/dist

WORKDIR /app

ENTRYPOINT ["node", "dist/src/main"]