FROM node:latest
WORKDIR /app

COPY ./package.json ./package.json
RUN npm install
COPY ./src src
COPY ./index.js index.js
COPY ./tsconfig.json tsconfig.json
COPY ./webpack.config.js webpack.config.js

RUN npm run build

EXPOSE 3000
CMD node index.js 