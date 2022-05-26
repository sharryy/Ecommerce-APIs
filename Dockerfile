FROM node:14

LABEL maintainer="Shehryar Amin"

RUN mkdir -p /src
WORKDIR /src
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
