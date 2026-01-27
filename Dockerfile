FROM node:lts-bullseye-slim

ENV NODE_ENV=production
ENV server.port=8080
ENV server.ssl=false
ENV server.hostname=localhost
ENV logger.transports.console.enabled=true
ENV logger.transports.console.level=info

RUN apt-get update
RUN apt-get install -y --no-install-recommends dumb-init

EXPOSE 8080

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install --omit=dev

USER node

HEALTHCHECK CMD curl http://localhost:8080/health || exit 1

ENTRYPOINT ["dumb-init", "node", "server.js"]