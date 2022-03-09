FROM node:latest
WORKDIR /var/www

# COPY package*.json ./
# RUN npm i
# COPY . .
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./index.js ./index.js
RUN npm install --only=prod && npm run build

EXPOSE 3000
CMD node index.js 